import { User } from "../../models/User";
import { Result } from "../../utils/types/Result";

export interface IUserService {
  getAll(): Promise<Result<User[]>>;
}
