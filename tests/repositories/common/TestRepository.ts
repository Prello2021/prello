import { Database } from "../../../src/utils/database";

// テストで使用するRepositoryです。
export class TestRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  // async clearTable(tableName: string): Promise<void> {
  //   const query = {
  //     text: `
  //       DELETE FROM $1
  //     `,
  //     values: [tableName],
  //   };
  //   await this.database.delete(query);
  // }

  async clearTable(tableName: string): Promise<void> {
    const query = {
      text: `
        DELETE FROM ${tableName}
      `,
    };
    await this.database.delete(query);
  }
}
