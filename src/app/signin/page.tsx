"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticateUser, register } from "../actions/auth";

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateUser,
    undefined,
  );
  const signInFormConfig = [
    { label: "", type: "hidden", name: "redirectTo", value: "/dashboard" },
    /*
    special trick to redirect to dashboard on formsubmission
    NextAuth automatically reads redirectTo when signIn() is called
    Extracts redirectTo from req.body (since it was included in the form)
    if signIn sucessful,The browser receives a 302 redirect respo with Location: /dashboard
    */

    { label: "EMAIL", type: "email", name: "email", isRequired: true },
    { label: "PASSWORD", type: "text", name: "password", isRequired: true },
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Sign In
        </h1>
        <form action={formAction} className="space-y-4">
          {signInFormConfig?.map((field, index) => (
            <div className="relative h-fit" key={index}>
              <input
                className="w-full rounded-md border border-gray-300 px-3 pb-1 pt-7 text-sm focus:border-black focus:outline-none"
                type={field?.type}
                name={field?.name}
                required={field?.isRequired}
              />
              <label className="absolute left-3 top-2 text-[12px]">
                {field?.label}
              </label>
            </div>
          ))}

          <button
            disabled={isPending}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isPending ? "Logging in ..." : "Log In"}
          </button>

          <p className="text-center text-xs text-gray-600">
            No account?{" "}
            <Link className="text-blue-400 hover:text-blue-600" href="/signup">
              Create one
            </Link>
          </p>

          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
