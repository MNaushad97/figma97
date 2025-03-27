import { object, string } from "zod";

export const signUpSchema = object({
  email: string({ required_error: "email is required" }).email("Invalid email"),
  password: string({ required_error: "password is required" })
    .min(8, "Must be at least 8 characters")
    .max(32, "Must be at most 32 characters"),
});
export const signInSchema = object({
  email: string({ required_error: "email is required" }).email("Invalid email"),
  password: string({ required_error: "password is required" }),
});
