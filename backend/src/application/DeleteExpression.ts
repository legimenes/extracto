import IStatementDao from "./IStatementDao";

class DeleteExpression {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(expressionId: number) {
    await this.statementDao.deleteExpression(expressionId);
  }

}

export { DeleteExpression };