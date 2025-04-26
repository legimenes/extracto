import Activity from "@domain/Activity";
import Expression from "@domain/Expression";

export default interface IStatementDao {
  getActivities(): Promise<Activity[]>;
  getExpressions(): Promise<Expression[]>;
}