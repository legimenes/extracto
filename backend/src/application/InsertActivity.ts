import { InsertActivityRequest } from "@shared/contracts/insert-activity/InsertActivityRequest";
import IStatementDao from "./IStatementDao";
import Activity from "@domain/Activity";

class InsertActivity {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(request: InsertActivityRequest) {
    const activity: Activity = Activity.create(request.name, request.operation);
    await this.statementDao.insertActivity(activity);
  }

}

export { InsertActivity };