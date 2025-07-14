import IStatementDao from "./IStatementDao";

class DeleteActivity {

  constructor(readonly statementDao: IStatementDao) {
  }

  async execute(activityId: number) {
    await this.statementDao.deleteActivity(activityId);
  }

}

export { DeleteActivity };