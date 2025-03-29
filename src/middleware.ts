import { auth } from "./server/auth";

//here we are callinga auth not initialising
export default auth((req) => {
  // req-->request reveived by the server
  const isAuthenticated = !!req.auth;
  if (!isAuthenticated) {
    //protects certain routes ,if user not authenticated,
    //it redirects them to the /signin page.
    //req.nextUrl.origin refers to the origin (protocol + domain + port) of the incoming request.
    //If the request is:https://example.com/dashboard/settings
    //then, req.nextUrl.origin === "https://example.com"
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

/*
Next.js detects middleware.ts or middleware.js

Next.js automatically applies middleware only to routes matching config.matcher.
*/
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
  // matcher: ["/null", "/null/:path*"],
};
