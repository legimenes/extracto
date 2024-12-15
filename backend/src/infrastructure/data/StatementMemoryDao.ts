import IStatementDao from "../../application/IStatementDao";
import Activity from "../../models/Activity";
import Expression from "../../models/Expression";

export default class StatementMemoryDao implements IStatementDao {

  activities: Activity[];
  expressions: Expression[];

  constructor() {
    this.activities = [
      new Activity(1, "Condomínio", "Despesas", "D"),
      new Activity(2, "Aluguel", "Despesas", "D"),
      new Activity(3, "Despesas da casa", "Despesas", "D"),
      new Activity(4, "Claro", "Despesas", "D"),
      new Activity(5, "ENEL", "Despesas", "D"),
      new Activity(6, "Comgas", "Despesas", "D"),
      new Activity(7, "Cartão de crédito", "Despesas", "D"),
      new Activity(8, "GPS Cida", "Despesas", "D"),
      new Activity(9, "Despesas genéricas", "Despesas", "D"),
      new Activity(10, "Salário", "Receitas", "C"),
      new Activity(11, "Benefícios", "Receitas", "C"),
      new Activity(12, "Rendimentos CC Santander", "Receitas", "C")
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