import { QueryConfig } from "pg";
import { IUserRepository } from "../../../src/repositories/interfaces/IUserRepository";
import { Database, DatabaseResult } from "../../../src/utils/database";

// 店舗アカウントテーブルを操作するRepositoryクラスを実装します。
export class TestRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }
}
