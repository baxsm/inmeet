import { auth } from "@/lib/auth";

export default auth((req) => {
  if (req.nextUrl.pathname.includes("/dashboard")) {
    if (!req.auth) {
      const url = req.url.replace(req.nextUrl.pathname, "/sign-in");
      return Response.redirect(url);
    }
  }

  if (
    req.nextUrl.pathname.includes("/sign-in") ||
    req.nextUrl.pathname.includes("/sign-up")
  ) {
    if (req.auth) {
      const url = req.url.replace(req.nextUrl.pathname, "/dashboard");
      return Response.redirect(url);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
