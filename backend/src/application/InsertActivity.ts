import { InsertActivityRequest } from "@shared/contracts/insert-activity/InsertActivityRequest";
import Activity from "@domain/Activity";
import IStatementDao from "./IStatementDao";

class InsertActivity {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(request: InsertActivityRequest) {
    const activity: Activity = Activity.create(request.name, request.operation);
    await this.statementDao.insertActivity(activity);
  }

}

export { InsertActivity };