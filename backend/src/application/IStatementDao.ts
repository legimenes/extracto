import Activity from "@domain/Activity";
import Expression from "@domain/Expression";

export default interface IStatementDao {
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  insertActivity(activity: Activity): Promise<void>;
  updateActivity(activity: Activity): Promise<void>;
  deleteActivity(id: number): Promise<void>;
  getExpressions(): Promise<Expression[]>;
  insertExpression(expression: Expression): Promise<void>;
  deleteExpression(expressionId: number): Promise<void>;
}