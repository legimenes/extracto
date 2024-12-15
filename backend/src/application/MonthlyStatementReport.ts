import * as path from 'path';
import dotenv from 'dotenv';
import { createObjectCsvWriter } from "csv-writer";
import Statement from "../models/Statement";

export default class MonthlyStatementReport {
  
  static async generate(statement: Statement[]) {
    dotenv.config();
    const filePath = path.join(process.env.FILES_DIR!, "reports", "monthlyStatement.csv");
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'activity', title: 'Atividade' },
        { id: 'entry', title: 'Lançamento' },
        { id: 'date', title: 'Data' },
        { id: 'value', title: 'Valor' }
      ],
      fieldDelimiter: ';'
    });
    statement.sort((a, b) => a.date.getTime() - b.date.getTime());
    const activityIds: number[] = Array.from(
      new Set(statement.map(statement => statement.activityId))
    );
    const monthlyStatementReport: MonthlyStatementReportDto[] = [];
    activityIds.forEach(activityId => {
      const entries: Statement[] = statement.filter(p => p.activityId == activityId);
      const totalValue = entries.reduce((sum, entry) => sum + entry.value, 0);
      monthlyStatementReport.push({
        activity: entries[0].activityName,
        entry: undefined,
        date: undefined,
        value: totalValue
      });
      entries.map(entry => {
        monthlyStatementReport.push({
          activity: undefined,
          entry: entry.entry,
          date: entry.date,
          value: entry.value
        });
      });
    });
    await csvWriter.writeRecords(monthlyStatementReport);
  }
}

type MonthlyStatementReportDto = {
  activity?: string,
  entry?: string,
  date?: Date,
  value: number
};