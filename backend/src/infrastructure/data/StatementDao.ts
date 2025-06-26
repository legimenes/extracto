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

  async getActivity(id: number): Promise<Activity | undefined> {
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
      WHERE Activities.Id = $1
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      id
    ];
    const rows = await db.all(query, parameters);
    if (rows.length === 0) {
      return undefined;
    }
    const { Id, Name, Operation } = rows[0];
    const activity = new Activity(Id, Name, Operation);
    for (const row of rows) {
      if (row.Pattern) {
        activity.addPattern(row.Pattern);
      }
    }
    return activity;
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