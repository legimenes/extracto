import { MonthlyBankStatementRequest } from '@shared/contracts/monthly-bank-statement-report/MonthlyBankStatementRequest';
import { MonthlyBankStatementReport, MonthlyBankStatementInput } from './MonthlyBankStatementReport';
import { MonthlyActivitiesReport, MonthlyActivitiesReportInput } from './MonthlyActivitiesReport';

export default class GenerateMonthlyBankStatementReport {

  async execute(input: MonthlyBankStatementRequest[]) {
    const monthlyBankStatementInput: MonthlyBankStatementInput[] = input.map(entry => ({
      activityId: entry.activityId,
      activityName: entry.activityName,
      statementEntry: entry.statementEntry,
      date: entry.date.toString(),
      value: entry.value
    }));
    await MonthlyBankStatementReport.generate(monthlyBankStatementInput);
    const monthlyActivitiesReportInput: MonthlyActivitiesReportInput[] = input.map(entry => ({
      activityId: entry.activityId,
      activityName: entry.activityName,
      value: entry.value
    }));
    await MonthlyActivitiesReport.generate(monthlyActivitiesReportInput);
  }

}