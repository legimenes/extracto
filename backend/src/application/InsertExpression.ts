import { InsertExpressionRequest } from "@shared/contracts/insertExpression/InsertExpressionRequest";
import Expression from "@domain/Expression";
import IStatementDao from "./IStatementDao";

class InsertExpression {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(request: InsertExpressionRequest) {
    const expression: Expression = Expression.create(request.activityId, request.pattern);
    await this.statementDao.insertExpression(expression);
  }

}

export { InsertExpression };