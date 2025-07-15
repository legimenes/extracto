import Activity from "@domain/Activity";
import IStatementDao from "./IStatementDao";
import { ActivityResponse } from "@shared/contracts/activity/ActivityResponse";

class GetActivity {

  constructor(readonly statementDao: IStatementDao) {
  }
  
  async execute(id: number): Promise<ActivityResponse | undefined> {
    const activity: Activity | undefined = await this.statementDao.getActivity(id);
    if (activity === undefined)
      return undefined;
    const activityResponse: ActivityResponse = {
      id: activity.id,
      name: activity.name,
      operation: activity.operation,
      expressions: activity.getExpressions().map(expression => ({
        id: expression.id,
        pattern: expression.pattern
      }))
    };
    return activityResponse;
  }
}

export { GetActivity };