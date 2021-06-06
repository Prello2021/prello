import { User } from "../../models/User";
import { DatabaseResult } from "../../utils/database/Database";

export interface IUserRepository {
  getAll(): Promise<DatabaseResult<User[]>>;
  create(user: User): Promise<DatabaseResult<number>>;
}
