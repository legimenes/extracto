import Activity from "@domain/Activity";

export default class BankStatementEntry {
  constructor(
    readonly memo: string,
    readonly date: Date,
    readonly value: number
  ) {
    this.activities = [];
  }
  private activities: Activity[];
  public setActivities(activities: Activity[]): void {
    this.activities = activities;
  }
  public getActivities(): Activity[] {
    return this.activities;
  }  
}