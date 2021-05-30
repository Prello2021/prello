import express, { Application } from "express";
import { User } from "../src/models/User";
import { IUserService } from "../src/services/interfaces/IUserService";
import { UserController } from "../src/controllers/UserController";

import request from "supertest";

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
  {
    id: 3,
    name: "test3",
    hobby: "test3",
  },
];

function createMockIUserService(): IUserService {
  const mockService: IUserService = {
    getAll: jest.fn(
      () => new Promise<User[]>((resolve) => resolve(mockUserList))
    ),
  };

  return mockService;
}

describe("UserController 正常系テスト", () => {
  it("getAll", () => {
    const app: Application = express();
    const mockService = createMockIUserService();
    const controller = new UserController(mockService);
    app.use("/api/", controller.router);
    return request(app).get("/api/users").expect(200);
  });
});
