import cors from "cors";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";

//定義
const app = express();

//expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log(`Node.js is listening to PORT: ${address.port}`);
});

// expressの設定(cors method header 許可の設定)
app.disable("x-powered-by");
app.get("/", (req: Request, res: Response) => {
  const param = { result: "Hello !" };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(param);
});

app.use(cors()).use(express.json({ limit: "10mb" })); // マックス10mb
