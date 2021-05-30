import { User } from "../../src/models/User";
import { UserService } from "../../src/services/UserService";
import { IUserRepository } from "../../src/repositories/interfaces/IUserRepository";
import { DatabaseResult } from "../../src/utils/database/Database";
import { HttpStatusCode } from "../../src/utils/http/HttpStatusCode";

/**
 * モックのユーザー情報(複数)を作成
 *
 * @param  {number} num
 * @returns User
 */
function createMockUserData(num: number): User[] {
  const userList: User[] = [];

  for (let index = 0; index < num; index++) {
    const user: User = {
      id: index,
      name: `name_${index}`,
      hobby: `hobby_${index}`,
    };
    userList.push(user);
  }

  return userList;
}

/**
 * GetAllUserRepositoryにモック化する
 *
 * @param  {DatabaseResult<User[]>} mockResult
 * @returns IUserRepository
 */
function createMockGetAllRepository(
  mockResult: DatabaseResult<User[]>
): IUserRepository {
  const mockRepository: IUserRepository = {
    getAll: jest.fn(
      () =>
        new Promise<DatabaseResult<User[]>>((resolve) => resolve(mockResult))
    ),
    create: jest.fn((user: User) => {
      const mockResult: DatabaseResult<number> = {
        value: 0,
      };
      return new Promise<DatabaseResult<number>>((resolve) =>
        resolve(mockResult)
      );
    }),
  };

  return mockRepository;
}

describe("UserService 正常系テスト(複数)", () => {
  it("getAll", async () => {
    // mockのユーザー情報結果を3件作成
    const mockUserData = createMockUserData(3);
    const mockResult: DatabaseResult<User[]> = {
      value: mockUserData,
    };

    // Repositoryを作成し、Serviceをインスタンス化
    const mockRepository = createMockGetAllRepository(mockResult);
    const service = new UserService(mockRepository);

    // ユーザー取得実行
    const userList = await service.getAll();
    const result = userList.value as User[];

    // 取得件数を検証する
    expect(3).toBe(result.length);

    // 取得結果の詳細を検証する
    for (let index = 0; index < result.length; index++) {
      expect(mockUserData[index].id).toBe(result[index].id);
      expect(mockUserData[index].name).toBe(result[index].name);
      expect(mockUserData[index].hobby).toBe(result[index].hobby);
    }
  });
});

describe("UserService 正常系テスト(空のとき)", () => {
  it("getAll", async () => {
    // mockのユーザー情報結果を0件作成
    const mockResult: DatabaseResult<User[]> = {
      value: [],
    };

    // Repositoryを作成し、Serviceをインスタンス化
    const mockRepository = createMockGetAllRepository(mockResult);
    const service = new UserService(mockRepository);

    // ユーザー取得実行
    const userList = await service.getAll();
    const result = userList.value as User[];

    // 取得件数を検証する
    expect(result.length).toBe(0);
    // エラーがないことを確認
    expect(userList.error).toBeUndefined();
  });
});

describe("UserService 異常系テスト(Repositoryでエラー)", () => {
  it("getAll", async () => {
    // mockのResultにエラーを入れておく
    const mockResult: DatabaseResult<User[]> = {
      error: new Error("異常系エラー"),
    };
    // Repositoryを作成し、Serviceをインスタンス化
    const mockRepository = createMockGetAllRepository(mockResult);
    const service = new UserService(mockRepository);

    // ユーザー取得実行
    const userList = await service.getAll();
    const error = userList.error as Error;

    // エラーが入ってることを確認
    expect(error).not.toBeNull();

    // ステータスコード500であることを確認
    expect(userList.statusCode).toBe(HttpStatusCode.InternalServerError);
  });
});
