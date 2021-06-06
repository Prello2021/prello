import { User } from "../../src/models/User";
import { UserRepository } from "../../src/repositories/UserRepository";
import { UserService } from "../../src/services/UserService";
import { UserController } from "../../src/controllers/UserController";
import { TestRepository } from "./common/TestRepository";
import { Database } from "../../src/utils/database/Database";
import express, { Application } from "express";
import request from "supertest";

const db = new Database();
const testRepository = new TestRepository(db);

beforeEach(async () => {
  // Userテーブルの初期化除(データを空にする)
  await testRepository.clearTable("users");
});

afterEach(async () => {
  // Userテーブルの削除(データを空にする)
  await testRepository.clearTable("users");
  await db.close();
});

/**
 * テスト用のUserデータを作成する
 * @returns 作成されたUserデータ
 */
async function createUserData(
  num: number,
  repository: UserRepository
): Promise<User[]> {
  // numの回数、サンプルのUserデータをInsertする。
  const userList = [];
  for (let index = 0; index < num; index++) {
    const user: User = {
      name: `name_${index}`,
      hobby: `hobby_${index}`,
    };
    //データベースに追加
    const result = await repository.create(user);
    user.id = result.value;

    userList.push(user);
  }

  // 作成したUserデータを返却する。
  return userList;
}

/**
 * UserデータからidをキーとするMapを作成する
 * @returns 作成されたUserMapデータ
 */
function createUserMap(users: User[]): Map<number, User> {
  const result = new Map<number, User>();

  users.forEach((user) => {
    const userId = user.id as number;
    result.set(userId, user);
  });

  return result;
}

//正常系(3件突っ込み、3件取得)
describe("UserRepository 正常系テスト", () => {
  it("getAll", async () => {
    //expressのアプリケーション実体化
    const app: Application = express();
    //ユーザーAPIのを作成
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    //ユーザーAPIをエンドポイントに登録
    app.use("/api/", userController.router);

    // Userデータを3件insertする
    const createdUsers = await createUserData(3, userRepository);

    const response = await request(app).get("/api/users");

    //ステータスのチェック
    expect(200).toBe(response.statusCode);

    const users = response.body as User[];
    // 取得結果が3件であること
    expect(3).toBe(users.length);

    // 検証のためUserMapを作成する
    const userMap = createUserMap(users);

    // 結果が createdUsers で返却されたデータと同じであること
    createdUsers.forEach((createdUser) => {
      // UserMapからIDで検索し、Userオブジェクトを取得する
      const createdId = createdUser.id as number;
      const resultUser = userMap.get(createdId) as User;

      // 項目の検証
      expect(createdUser.id).toBe(resultUser.id);
      expect(createdUser.name).toBe(resultUser.name);
      expect(createdUser.hobby).toBe(resultUser.hobby);
    });
  });
});

//正常系(0件取得、エラーならない)
