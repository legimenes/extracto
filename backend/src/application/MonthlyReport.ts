import * as path from 'path';
import dotenv from 'dotenv';
import { createObjectCsvWriter } from 'csv-writer';
import AccountStatement from "../models/AccountStatement";

export default class MonthlyReport {

  static async generate(accountStatement: AccountStatement[]) {
    dotenv.config();
    const filePath = path.join(process.env.FILES_DIR!, "reports", "output.csv");
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'statementEntry', title: 'Lançamento' },
        { id: 'date', title: 'Data' },
        { id: 'value', title: 'Valor' },
        { id: 'activity', title: 'Atividade' },
        { id: 'patterns', title: 'Padrões' }
      ],
      fieldDelimiter: ';'
    });
    const monthlyReport: MonthlyReportDto[] = [];
    accountStatement.forEach(statement => {
      let activityName: string = "";
      let patterns: string = "";
      statement.activities?.forEach(activity => {
        activityName += activity.activityName + " ";
        patterns = activity.patterns?.join(", ");
      });
      monthlyReport.push({
        statementEntry: statement.statementEntry,
        date: statement.date,
        value: statement.value,
        activity: activityName.trim(),
        patterns: patterns
      });
    });
    await csvWriter.writeRecords(monthlyReport);
  }

}

type MonthlyReportDto = {
  statementEntry: string,
  date: Date,
  value: number,
  activity: string,
  patterns: string
};