import { User } from "../src/models/User";
import { UserService } from "../src/services/UserService"; // レポジトリに依存している
import { IUserRepository } from "../src/repositories/interfaces/IUserRepository";

const mockUserList: User[] = [
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
];

// const mockUser: User = {
//   id: 1,
//   name: "test1",
//   hobby: "test1",
// };

function createMockUserRepository(): IUserRepository {
  const mockRepository: IUserRepository = {
    getAll: jest.fn(
      () => new Promise<User[]>((resolve) => resolve(mockUserList))
    ), // 偽装作成
    // get: jest.fn(
    //   (id: number) =>
    //     new Promise<User>((resolve) => {
    //       if (id === 1) resolve(mockUser);
    //     })
    // ),
  };

  return mockRepository;
}

describe("UserService 正常系テスト", () => {
  it("getAll", async () => {
    const mockRepository = createMockUserRepository();
    const service = new UserService(mockRepository);
    const userList = await service.getAll();
    expect(userList).toEqual(mockUserList);
  });
});
