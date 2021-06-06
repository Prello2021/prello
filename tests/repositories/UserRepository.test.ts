import { User } from "../../src/models/User";
import { UserRepository } from "../../src/repositories/UserRepository";
import { TestRepository } from "./common/TestRepository";
import { Database } from "../../src/utils/database/Database";

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

describe("UserRepository 正常系テスト", () => {
  it("getAll", async () => {
    // UserRepositoryをインスタンス化
    const repository = new UserRepository(db);

    // Userデータを3件insertする。
    const createdUsers = await createUserData(3, repository);

    // getAllを実行する
    const result = await repository.getAll();
    const users = result.value as User[];

    // 取得結果が3件であること
    expect(3).toBe(users.length);

    // 結果の検証

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
