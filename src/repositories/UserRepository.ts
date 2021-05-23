import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "../models/User";
import { Database, DatabaseResult } from "../utils/database";

export class UserRepository implements IUserRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * ユーザー一覧の一括取得
   * @returns ユーザー一覧
   */
  getAll(): Promise<DatabaseResult<User[]>> {
    const query = {
      text: `
          SELECT 
            * 
          FROM
            users
          ORDER BY 
            updated_at DESC
        `,
    };

    return this.database.query<User>(query);
  }
}
