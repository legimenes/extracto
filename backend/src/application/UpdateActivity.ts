import { UpdateActivityRequest } from "@shared/contracts/update-activity/UpdateActivityRequest";
import Activity from "@domain/Activity";
import IStatementDao from "./IStatementDao";

class UpdateActivity {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(request: UpdateActivityRequest) {
    const activity: Activity = new Activity(request.id, request.name, request.operation);
    await this.statementDao.updateActivity(activity);
  }
}

export { UpdateActivity };