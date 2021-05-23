import cors from "cors";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import { Client } from "pg";
import { UserRepository } from "./repositories/UserRepository";
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

// // postgres 接続情報
// const connection = new Client({
//   host: "",
//   port: 5432,
//   user: "user",
//   password: "password",
//   database: "prello",
// });

// // postgresに接続
// connection
//   .connect()
//   .then(() => console.log("postgres connect success!"))
//   .catch((err) => console.log(err));

// const query = "SELECT * FROM users;";

// app.get("/", (req: Request, res: Response) => {
//   connection.query(query, (error, result) => {
//     console.log(result);
//     res.json(result.rows);
//   });
// });

const db = new Database();

const userRepository = new UserRepository(db);

app.get("/", async (req: Request, res: Response) => {
  const result = await userRepository.getAll();
  res.json(result.value);
});
