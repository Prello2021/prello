import { User } from "../../src/models/User";
import { UserRepository } from "../../src/repositories/UserRepository";
import { Database } from "../../src/utils/database/Database";

const db = new Database();

beforeEach(() => {
  // Userテーブルの初期化
  console.log("Userテーブルの初期化");
});

afterEach(() => {
  // Userテーブルの削除(データを空にする)
  console.log("Userテーブルの削除(データを空にする)");
});

describe("UserRepository 正常系テスト", () => {
  it("getAll", async () => {
    // UserRepositoryをインスタンス化
    const repository = new UserRepository(db);

    // Userデータを3件insertする。
    const createdUsers = await createUserData(3, repository);
    console.log(createdUsers);

    // UserRepository.getAllを実行する
    const result = await repository.getAll();
    const users = result.value as User[];
    console.log(users);

    // 取得結果が3件であること
    expect(3).toBe(users.length);

    // 結果の検証
    // 結果が createdUsers で返却されたデータと同じであること
    for (let index = 0; index < users.length; index++) {
      expect(createdUsers[index].id).toBe(users[index].id);
      expect(createdUsers[index].name).toBe(users[index].name);
      expect(createdUsers[index].hobby).toBe(users[index].hobby);
    }
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
