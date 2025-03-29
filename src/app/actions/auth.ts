"use server";

import { isValid, ZodError } from "zod";
import { signUpSchema } from "~/schemas";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "~/server/auth";
import { AuthError } from "next-auth";

export async function signout() {
  await signOut();
}

export async function authenticateUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData); //signIn() Triggers the `authorize` Function in authConfig in config.ts file
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email: enteredEmail, password: enteredPassword } =
      await signUpSchema.parseAsync({
        email: formData.get("email"),
        password: formData.get("password"),
      });

    const hasUser = await db.user.findUnique({
      where: {
        email: enteredEmail,
      },
    });

    if (hasUser) {
      return "User already exists";
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(enteredPassword, 10);

    await db.user.create({
      data: {
        email: enteredEmail,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((error) => error.message).join(", ");
    }
  }

  redirect("/signin");
}
