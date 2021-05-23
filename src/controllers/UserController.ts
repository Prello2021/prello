import { Request, Response, Router } from "express";
import { IUserService } from "../services/interfaces/IUserService";

export class UserController {
  public router: Router;
  private service: IUserService;

  constructor(service: IUserService) {
    this.router = Router();
    this.service = service;

    this.router.get("/users", async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode as number).json(result.error.message);
        return;
      }
      res.status(result.statusCode as number).json(result.value);
    });
  }
}
