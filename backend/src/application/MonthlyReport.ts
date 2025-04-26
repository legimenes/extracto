import * as path from 'path';
import dotenv from 'dotenv';
import { createObjectCsvWriter } from 'csv-writer';
import BankStatementEntry from '@domain/BankStatementEntry';

export default class MonthlyReport {

  static async generate(entries: BankStatementEntry[]) {
    dotenv.config();
    const filePath = path.join(process.env.FILES_DIR!, "reports", "output.csv");
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'entry', title: 'Lançamento' },
        { id: 'date', title: 'Data' },
        { id: 'value', title: 'Valor' },
        { id: 'activity', title: 'Atividade' },
        { id: 'patterns', title: 'Padrões' }
      ],
      fieldDelimiter: ';'
    });
    const monthlyReport: MonthlyReportDto[] = entries.map(entry => {
      const activities = entry.getActivities();
      const activityNames = activities.map(activity => activity.name).join(", ");
      const patterns = activities.flatMap(activity => activity.getPatterns()).join(", ");
      return {
        entry: entry.memo,
        date: entry.date,
        value: entry.value,
        activity: activityNames,
        patterns: patterns
      };
    });

    await csvWriter.writeRecords(monthlyReport);
  }

}

type MonthlyReportDto = {
  entry: string,
  date: Date,
  value: number,
  activity: string,
  patterns: string
};