import IStatementDao from "../../application/IStatementDao";
import Activity from "../../models/Activity";
import Expression from "../../models/Expression";
import { DatabaseConnection } from "./DatabaseConnection";

export default class StatementDao implements IStatementDao {

  async getActivities(): Promise<Activity[]> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      SELECT
        Activities.Id,
        Activities.Name,
        ActivityTypes.Operation      
      FROM Activities
      INNER JOIN ActivityTypes ON ActivityTypes.Id = Activities.ActivityTypeId`
      .replace(/\s+/g, " ").trim();
    const rows = await db.all(query);
    const activities: Activity[] = rows.map(row => ({
      id: row.Id,
      name: row.Name,
      operation: row.Operation
    }));
    return activities;
  }

  async getExpressions(): Promise<Expression[]> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      SELECT
        Expressions.Id,
        Expressions.ActivityId,
        Expressions.Pattern
      FROM Expressions`
      .replace(/\s+/g, " ").trim();
    const rows = await db.all(query);
    const expressions: Expression[] = rows.map(row => ({
      id: row.Id,
      activityId: row.ActivityId,
      pattern: row.Pattern
    }));
    return expressions;
  }

}