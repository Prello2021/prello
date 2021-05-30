import { User } from "../src/models/User";
import { UserService } from "../src/services/UserService";
import { IUserRepository } from "../src/repositories/interfaces/IUserRepository";
import { DatabaseResult } from "../src/utils/database/Database";

const mockUserList: DatabaseResult<User[]> = {
  value: [
    {
      id: 1,
      name: "test1",
      hobby: "test1",
    },
    {
      id: 2,
      name: "test2",
      hobby: "test2",
    },
    {
      id: 3,
      name: "test3",
      hobby: "test3",
    },
  ],
  // error: null,
};

function createMockGetAllRepository(
  mockResult: DatabaseResult<User[]>
): IUserRepository {
  const mockRepository: IUserRepository = {
    getAll: jest.fn(
      () =>
        new Promise<DatabaseResult<User[]>>((resolve) => resolve(mockResult))
    ),
  };

  return mockRepository;
}
// ↑下準備
// ↓テスト内容の実行

describe("UserService 正常系テスト", () => {
  it("getAll", async () => {
    const mockRepository = createMockGetAllRepository(mockUserList);
    const service = new UserService(mockRepository);
    const userList = await service.getAll();
    const result = userList.value as User[];
    const mock = mockUserList.value as User[];
    expect(mock[0].name).toEqual(result[0].name); // テストの検証
  });
});
