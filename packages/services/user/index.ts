import db, { eq, usersTable } from "@repo/database";
// import { usersTable } from "@repo/database";

import {
  createUserWithEmailAndPasswordInput,
  CreateUserWithEmailAndPasswordInputType,
} from "./model";
import { createSalt, hashPassword } from "../utils/crypto";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;
    return result[0];
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
    const { firstName, lastName, email, password } =
      await createUserWithEmailAndPasswordInput.parseAsync(payload);

    // CHeck for existing user
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) throw new Error(`User with ${email} already exists`);

    // Calculate salt and hash for password
    const salt = createSalt();
    const hash = hashPassword(salt, password!);

    // Insert user to db
    const userInsertResult = await db
      .insert(usersTable)
      .values({ firstName, lastName, email, password: hash, salt })
      .returning({ id: usersTable.id });

    if (!userInsertResult || userInsertResult.length === 0)
      throw new Error("Something went wrong while creating an user");

    return {
      id: userInsertResult[0]?.id,
    };
  }
}
