import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

  private constructor() { }

  public static async getInstance(): Promise<DatabaseConnection> {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      await DatabaseConnection.instance.connect();
    }
    return DatabaseConnection.instance;
  }

  public getDb(): Database<sqlite3.Database, sqlite3.Statement> {
    if (!this.db) {
      throw new Error("Database not initialized. Call getInstance() first.");
    }
    return this.db;
  }

  private async connect(): Promise<void> {
    this.db = await open({
      filename: "./db/extracto.sqlite",
      driver: sqlite3.Database
    });
  }

  public async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
    }
  }

}
