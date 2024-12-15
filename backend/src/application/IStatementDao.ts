import Activity from "../models/Activity";
import Expression from "../models/Expression";

export default interface IStatementDao {
  getActivities(): Promise<Activity[]>;
  getExpressions(): Promise<Expression[]>;
}