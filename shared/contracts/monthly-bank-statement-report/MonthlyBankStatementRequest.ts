interface MonthlyBankStatementRequest {
  activityId: number;
  activityName: string;
  statementEntry: string;
  date: Date;
  value: number;
}

export { 
  MonthlyBankStatementRequest
};