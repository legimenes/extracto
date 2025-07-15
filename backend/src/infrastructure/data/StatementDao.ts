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
        Expressions.Id AS 'ExpressionId',
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
      if (row.ExpressionId) {
        activity.addExpression(new Expression(row.ExpressionId, Id, row.Pattern));
      }
    }
    return activity;
  }

  async insertActivity(activity: Activity): Promise<void> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const activityTypeId = await this.getActivityTypeId(activity.operation);
    const query = `
      INSERT INTO Activities (
        ActivityTypeId,
        Name
      ) VALUES (
        $1,
        $2
      )
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      activityTypeId,
      activity.name
    ];
    await db.run(query, parameters);
  }

  async updateActivity(activity: Activity): Promise<void> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const activityTypeId = await this.getActivityTypeId(activity.operation);
    const query = `
      UPDATE Activities SET
        ActivityTypeId = $1,
        Name =  $2
      WHERE Id = $3
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      activityTypeId,
      activity.name,
      activity.id
    ];
    await db.run(query, parameters);
  }

  async deleteActivity(id: number): Promise<void> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const parameters = [
      id
    ];
    const expressionQuery = `
      DELETE FROM Expressions
      WHERE ActivityId = $1
      `.replace(/\s+/g, " ").trim();
    await db.run(expressionQuery, parameters);    
    const activityQuery = `
      DELETE FROM Activities
      WHERE Id = $1
      `.replace(/\s+/g, " ").trim();
    await db.run(activityQuery, parameters);
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

  async insertExpression(expression: Expression): Promise<void> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      INSERT INTO Expressions (
        ActivityId,
        Pattern
      ) VALUES (
        $1,
        $2
      )
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      expression.activityId,
      expression.pattern
    ];
    await db.run(query, parameters);
  }

  async deleteExpression(expressionId: number): Promise<void> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      DELETE FROM Expressions
      WHERE Id = $1
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      expressionId
    ];
    await db.run(query, parameters);
  }

  async getActivityTypeId(operation: string): Promise<number> {
    const db = (await DatabaseConnection.getInstance()).getDb();
    const query = `
      SELECT
        ActivityTypes.Id
      FROM ActivityTypes
      WHERE ActivityTypes.Operation = $1
      `.replace(/\s+/g, " ").trim();
    const parameters = [
      operation
    ];
    const row = await db.get(query, parameters);
    const { Id } = row;
    return Id;
  }
}