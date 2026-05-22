import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
  firstName: z.string().trim().min(2).max(50).describe("first name of the user"),
  lastName: z.string().trim().min(2).max(50).describe("last name of the user").optional(),
  email: z.email().describe("email of the user"),
  password: z.string().optional(),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("id of the created user"),
});
