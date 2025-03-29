import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);
//NextAuth(authConfig) returns an object that contains various authentication-related utilities

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
/*
setting up 
NextAuth.js authentication 
`auth`: A function to get authentication status.
will use to protect certain routes ,if user not authenticated,we'll redirects them to the /signin page.
see middleware.ts
*/
