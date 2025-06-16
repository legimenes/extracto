import * as path from 'path';
import dotenv from 'dotenv';
import { createObjectCsvWriter } from "csv-writer";

class MonthlyActivitiesReport {

  static async generate(input: MonthlyActivitiesReportInput[]) {
    dotenv.config();
    const filePath = path.join(process.env.FILES_DIR!, "reports", "MonthlyActivities.csv");
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'activityName', title: 'Atividade' },
        { id: 'value', title: 'Valor' }
      ],
      fieldDelimiter: ';'
    });
    const summary: MonthlyActivitiesReportInput[] = Object.values(
      input.reduce((acc, curr) => {
        const { activityId, activityName, value } = curr;
        if (!acc[activityId]) {
          acc[activityId] = {
            activityId: activityId,
            activityName,
            value: 0
          };
        }
        acc[activityId].value += value;
        return acc;
      }, {} as Record<number, MonthlyActivitiesReportInput>)
    );
    const records = summary.map(record =>({
      ...record,
      value: record.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }));
    await csvWriter.writeRecords(records);
  }

}

type MonthlyActivitiesReportInput = {
  activityId: number;
  activityName: string;
  value: number;
};

export {
  MonthlyActivitiesReport,
  MonthlyActivitiesReportInput
};