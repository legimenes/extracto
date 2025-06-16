import { Ofx } from 'ofx-data-extractor';
import { OfxConfig, STRTTRN } from 'ofx-data-extractor/dist/@types/ofx';
import { LoadBankStatementResponse } from '@shared/contracts/load-bank-statement/LoadBankStatementResponse';
import Activity from '@domain/Activity';
import BankStatement from '@domain/BankStatement';
import BankStatementEntry from '@domain/BankStatementEntry';
import IStatementDao from '@application/IStatementDao';

class LoadBankStatement {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(ofxFileContent: string | undefined): Promise<LoadBankStatementResponse> {
    if (!ofxFileContent) return { entries: [] };
    const ofx: Ofx = this.loadOfx(ofxFileContent);
    const bankTransferList: STRTTRN[] = ofx.getBankTransferList();
    const bankStatementEntries: BankStatementEntry[] = this.mapToBankStatementEntries(bankTransferList);
    const bankStatement: BankStatement = await this.createBankStatement(bankStatementEntries);
    const response: LoadBankStatementResponse = this.assignResponse(bankStatement);
    return response;
  }

  private loadOfx(ofxFileContent: string): Ofx {
    const config: OfxConfig = {
      formatDate: 'yyyy-MM-dd hh:mm:ss'
    };
    const ofx = new Ofx(ofxFileContent, config);
    return ofx;
  }

  private mapToBankStatementEntries(bankTransferList: STRTTRN[]): BankStatementEntry[] {
    return bankTransferList.map(transaction =>
      new BankStatementEntry(
        transaction.MEMO,
        new Date(String(transaction.DTPOSTED)),
        Number(transaction.TRNAMT)
      )
    );
  }

  private async createBankStatement(bankStatementEntries: BankStatementEntry[]): Promise<BankStatement> {
    const activities: Activity[] = await this.statementDao.getActivities();
    const patterns: string[] = this.findPatterns(activities);
    const compiledRegexes: RegExp[] = patterns.map(pattern => new RegExp(pattern, 'i'));
    const defaultExpenseActivity: Activity = activities.find(p => p.id == 9)!;
    const defaultRevenueActivity: Activity = activities.find(p => p.id == 13)!;
    bankStatementEntries.map(entry => {
      const matchingRegexes: RegExp[] = compiledRegexes.filter(regex => regex.test(entry.memo));
      const operation: string = this.assignOperation(entry);
      let matchingActivities: Activity[] = this.findMatchingActivities(matchingRegexes, activities, operation);
      if (matchingActivities.length == 0) {
        matchingActivities = (operation === "D") ? [defaultExpenseActivity] : [defaultRevenueActivity];
      }
      entry.setActivities(matchingActivities);
    });
    return new BankStatement(bankStatementEntries);
  }

  private findPatterns(activities: Activity[]): string[] {
    const patternSet = new Set<string>();
    activities.forEach(activity => {
      activity.getPatterns().forEach(pattern => patternSet.add(pattern));
    });
    return Array.from(patternSet);
  }

  private assignOperation(statementEntry: BankStatementEntry): string {
    return statementEntry.value <= 0 ? "D" : "C";
  }

  private findMatchingActivities(entryRegexes: RegExp[], activities: Activity[], operation: string): Activity[] {
    const regexSources = new Set(entryRegexes.map(regex => regex.source));
    return activities.filter(activity =>
      activity.operation === operation && activity.getPatterns().some(pattern => regexSources.has(pattern))
    );
  }

  private assignResponse(statement: BankStatement): LoadBankStatementResponse {
    const entries = statement.entries.map((entry, index) => ({
      id: index + 1,
      memo: entry.memo,
      date: entry.date,
      value: entry.value,
      activities: entry.getActivities().map(activity => ({
        id: activity.id,
        name: activity.name
      }))
    }));
    return { entries };
  }
}

export { 
  LoadBankStatement
};