import Activity from "@domain/Activity";
import Expression from "@domain/Expression";
import IStatementDao from "@application/IStatementDao";

export default class StatementMemoryDao implements IStatementDao {

  activities: Activity[];
  expressions: Expression[];

  constructor() {
    this.activities = [
      new Activity(1, "Condomínio", "D"),
      new Activity(2, "Aluguel", "D"),
      new Activity(3, "Despesas da casa", "D"),
      new Activity(4, "Claro", "D"),
      new Activity(5, "ENEL", "D"),
      new Activity(6, "Comgas", "D"),
      new Activity(7, "Cartão de crédito", "D"),
      new Activity(8, "GPS Cida", "D"),
      new Activity(9, "Despesas genéricas", "D"),
      new Activity(10, "Salário", "C"),
      new Activity(11, "Benefícios", "C"),
      new Activity(12, "Rendimentos CC Santander", "C")
    ];
    this.expressions  = [
      new Expression(1, 1, "OUTROS BANCOS  LELLO"),
      new Expression(2, 1, "BANCOS  LELLO")
    ];
  }

  getActivities(): Promise<Activity[]> {
    return Promise.resolve(this.activities);
  }

  getExpressions(): Promise<Expression[]> {
    return Promise.resolve(this.expressions);
  }

}