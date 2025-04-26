import Activity from "@domain/Activity";
import Expression from "@domain/Expression";
import IStatementDao from "@application/IStatementDao";
import { DatabaseConnection } from "@infrastructure/data/DatabaseConnection";

export default class StatementDao implements IStatementDao {

  async getActivities(): Promise<Activity[]> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      SELECT
        Activities.Id,
        Activities.Name,
        ActivityTypes.Operation,
        Expressions.Pattern
      FROM Activities
      INNER JOIN ActivityTypes ON ActivityTypes.Id = Activities.ActivityTypeId
      LEFT JOIN Expressions ON Expressions.ActivityId = Activities.Id
      `.replace(/\s+/g, " ").trim();
    const rows = await db.all(query);
    const activityMap = new Map<number, Activity>();
    rows.forEach(row => {
      const activityId = row.Id;
      if (!activityMap.has(activityId)) {
        activityMap.set(activityId, new Activity(row.Id, row.Name, row.Operation));
      }
      const pattern = row.Pattern;
      if (pattern) {
        activityMap.get(activityId)!.addPattern(pattern);
      }
    });
    return Array.from(activityMap.values());
  }

  async getExpressions(): Promise<Expression[]> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      SELECT
        Expressions.Id,
        Expressions.ActivityId,
        Expressions.Pattern
      FROM Expressions
      `.replace(/\s+/g, " ").trim();
    const rows = await db.all(query);
    const expressions: Expression[] = rows.map(row => ({
      id: row.Id,
      activityId: row.ActivityId,
      pattern: row.Pattern
    }));
    return expressions;
  }
}