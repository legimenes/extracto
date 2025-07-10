import { ActivityResponse } from "@shared/contracts/activities/ActivityResponse";
import Activity from "@domain/Activity";
import IStatementDao from "./IStatementDao";

class GetActivities {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(): Promise<ActivityResponse[]> {
    const activities: Activity[] = await this.statementDao.getActivities();
    return activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      operation: activity.operation
    }));
  }
}

export { GetActivities };