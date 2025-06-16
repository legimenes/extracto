import * as path from 'path';
import dotenv from 'dotenv';
import { format } from 'date-fns';
import { createObjectCsvWriter } from "csv-writer";

class MonthlyBankStatementReport {

  static async generate(input: MonthlyBankStatementInput[]) {
    dotenv.config();
    const filePath = path.join(process.env.FILES_DIR!, "reports", "MonthlyBankStatement.csv");
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'activityName', title: 'Atividade' },
        { id: 'statementEntry', title: 'Lançamento' },
        { id: 'date', title: 'Data' },
        { id: 'value', title: 'Valor' }
      ],
      fieldDelimiter: ';'
    });
    input.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const records = input.map(record => ({
      ...record,
      value: record.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      date: format(new Date(record.date), 'dd/MM/yyyy')
    }));
    await csvWriter.writeRecords(records);
  }

}

type MonthlyBankStatementInput = {
  activityId: number;
  activityName: string;
  statementEntry: string;
  date: string;
  value: number;
};

export {
  MonthlyBankStatementReport,
  MonthlyBankStatementInput
};