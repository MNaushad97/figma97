"use client";
import { signout } from "../actions/auth";

export default function Page() {
  return (
    <div className="flex flex-col bg-white px-4">
      <p>Dashboard</p>
      <button onClick={() => signout()}>signOut</button>
    </div>
  );
}
