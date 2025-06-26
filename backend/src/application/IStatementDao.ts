import Activity from "@domain/Activity";
import Expression from "@domain/Expression";

export default interface IStatementDao {
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  getExpressions(): Promise<Expression[]>;
}