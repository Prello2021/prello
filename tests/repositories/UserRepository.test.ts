import { User } from "../../src/models/User";

beforeEach(() => {
  // Userテーブルの初期化
  console.log("Userテーブルの初期化");
});

afterEach(() => {
  // Userテーブルの削除(データを空にする)
  console.log("Userテーブルの削除(データを空にする)");
});

describe("UserRepository 正常系テスト", () => {
  it("getAll", () => {
    // Userデータを3件insertする。
    const createdUsers = createUserData(3);

    // UserRepositoryをインスタンス化

    // UserRepository.getAllを実行する

    // 結果の県境

    // 取得結果が3件であること

    // 結果が createdUsers で返却されたデータと同じであること
    expect(4).toBe(4);
  });
});

/**
 * テスト用のUserデータを作成する
 * @returns 作成されたUserデータ
 */
function createUserData(num: number): User[] {
  // numの回数、サンプルのUserデータをInsertする。

  // 作成したUserデータを返却する。
  return [];
}
