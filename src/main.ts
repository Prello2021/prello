import cors from "cors";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import { Client } from "pg";
import { UserController } from "./controllers/UserController";
import { UserRepository } from "./repositories/UserRepository";
import { UserService } from "./services/UserService";
import { Database } from "./utils/database/Database";

//定義
const app = express();
app.use(cors()).use(express.json({ limit: "10mb" })); // マックス10mb
// expressの設定(cors method header 許可の設定)
app.disable("x-powered-by");

//expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log(`Node.js is listening to PORT: ${address.port}`);
});

const db = new Database();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use("/api/", userController.router);
