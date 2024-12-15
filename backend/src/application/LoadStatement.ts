import { Ofx } from 'ofx-data-extractor';
import { OfxConfig, STRTTRN } from 'ofx-data-extractor/dist/@types/ofx';
import AccountStatement from '../models/AccountStatement';
import Activity from '../models/Activity';
import EntryActivity from '../models/EntryActivity';
import Expression from '../models/Expression';
import StatementEntry from '../models/StatementEntry';
import IStatementDao from './IStatementDao';
import MonthlyReport from './MonthlyReport';

class LoadStatement {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(ofxFileContent: string | undefined): Promise<Output[]> {
    if (!ofxFileContent) return [];
    const ofx: Ofx = this.loadOfx(ofxFileContent);
    const bankTransferList: STRTTRN[] = ofx.getBankTransferList();
    const statementEntries: StatementEntry[] = this.convertBankTransferListToStatementEntries(bankTransferList);
    const accountStatement: AccountStatement[] = await this.createAccountStatement(statementEntries);
    const output: Output[] = this.convertToOuput(accountStatement);
    await MonthlyReport.generate(accountStatement);
    return output;
  }

  private loadOfx(ofxFileContent: string): Ofx {
    const config: OfxConfig = {
      formatDate: 'yyyy-MM-dd hh:mm:ss'
    };
    const ofx = new Ofx(ofxFileContent, config);
    return ofx;
  }

  private convertBankTransferListToStatementEntries(bankTransferList: STRTTRN[]): StatementEntry[] {
    const statementEntries: StatementEntry[] = [];
    bankTransferList.forEach(transaction => {
      statementEntries.push(new StatementEntry(transaction.MEMO, new Date(String(transaction.DTPOSTED)), Number(transaction.TRNAMT)));
    });
    return statementEntries;
  }

  private async createAccountStatement(statementEntries: StatementEntry[]): Promise<AccountStatement[]> {
    const activities: Activity[] = await this.statementDao.getActivities();
    const expressions: Expression[] = await this.statementDao.getExpressions();
    const regularExpressions: RegExp[] = expressions.map(expression => new RegExp(expression.pattern));
    const defaultExpenseActivity: Activity = activities.find(p => p.id == 9)!;
    const defaultRevenueActivity: Activity = activities.find(p => p.id == 13)!;
    const accountStatement: AccountStatement[] = [];
    statementEntries.forEach(entry => {
      const entryRegexes: RegExp[] = regularExpressions.filter(regex => regex.test(entry.description));
      const operation: string = this.findOperation(entry);
      const entryExpressions: Expression[] = this.findEntryExpressions(entryRegexes, operation, expressions, activities);
      const entryActivities: EntryActivity[] = this.findEntryActivities(entryExpressions, activities);

      if (entryActivities.length == 0) {
        if (operation == "D")
          entryActivities.push(new EntryActivity(
            defaultExpenseActivity.id,
            defaultExpenseActivity.name,
            defaultExpenseActivity.operation,
            []));          
        else
          entryActivities.push(new EntryActivity(
            defaultRevenueActivity.id,
            defaultRevenueActivity.name,
            defaultRevenueActivity.operation,
            []));
      }

      accountStatement.push(new AccountStatement(
        entryActivities,
        entry.description,
        entry.date,
        entry.value
      ));
    });
    return accountStatement;
  }

  private findOperation(statementEntry: StatementEntry): string {
    return statementEntry.value <= 0 ? "D" : "C";
  }

  private findEntryExpressions(entryRegexes: RegExp[], operation: string, expressions: Expression[], activities: Activity[]): Expression[] {
    const entryExpressions: Expression[] = [];
    entryRegexes.forEach(regex => {
      const filteredExpressions: Expression[] = expressions.filter(p => p.pattern == regex.source
        && activities.some(p2 => p2.id == p.activityId && p2.operation == operation));
      entryExpressions.push(...filteredExpressions);
    });
    return entryExpressions;
  }

  private findEntryActivities(entryExpressions: Expression[], activities: Activity[]): EntryActivity[] {
    const entryActivities: EntryActivity[] = [];
    entryExpressions.forEach(expression =>
    {
      const activity = activities.find(p => p.id == expression.activityId);
      const existingStatementActivity = entryActivities.find(p => p.activityId == activity?.id);
      if (existingStatementActivity === undefined) {
        entryActivities.push(new EntryActivity(
          activity!.id,
          activity!.name,
          activity!.operation,
          [expression.pattern]
        ));
      }
      else {
        existingStatementActivity.patterns.push(expression.pattern);
      }
    });
    return entryActivities;
  }

  private convertToOuput(accountStatement: AccountStatement[]): Output[] {
    const output: Output[] = [];
    accountStatement.forEach(statement => {
      const activities: ActivityOutput[] = [];
      statement.activities!.forEach(activity => {
        activities.push({
          id: activity.activityId,
          name: activity.activityName
        });
      });

      output.push({
        statementEntry: statement.statementEntry,
        date: statement.date,
        value: statement.value,
        activities: activities
      });
    });
    return output;
  }
}

type ActivityOutput = {
  id: number;
  name: string;
};

type Output = {
  activities: ActivityOutput[];
  statementEntry: string;
  date: Date;
  value: number;
};

export { 
  LoadStatement,
  Output
};