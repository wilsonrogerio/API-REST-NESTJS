import { HashingServiceProtocol } from "./hashing-service";
import * as bcrypt from "bcryptjs"

export class BcryptPasswordService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash
  }
  async compare(password: string, passwordHash: string): Promise<boolean> {

    return bcrypt.compare(password, passwordHash);

  }
}