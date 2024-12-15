import Statement from "../models/Statement";
import MonthlyStatementReport from "./MonthlyStatementReport";

class GenerateMonthlyStatementReport {

  constructor() {    
  }

  async execute(input: Input[]) {
    const statement: Statement[] = [];
    input.forEach(item => {
      statement.push(new Statement(
        item.activityId,
        item.activityName,
        item.statementEntry,
        new Date(item.date),
        item.value
      ));
    });
    await MonthlyStatementReport.generate(statement);
  }

}

type Input = {
  activityId: number;
  activityName: string;
  statementEntry: string;
  date: Date;
  value: number;
};

export {
  GenerateMonthlyStatementReport,
  Input
};