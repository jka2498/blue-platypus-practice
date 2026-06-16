import { NextResponse, type NextRequest } from "next/server";

// Route protection.
//   • AUTH_MODE=local  → everything is open (built-in dev user).
//   • AUTH_MODE=auth0  → protect all app routes; allow "/", "/migration-guide",
//     and the Auth0 endpoints under /api/auth.
export async function middleware(req: NextRequest) {
  if (process.env.AUTH_MODE !== "auth0") {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;
  const isPublic =
    path === "/" ||
    path.startsWith("/migration-guide") ||
    path.startsWith("/api/auth");
  if (isPublic) return NextResponse.next();

  const { getSession } = await import("@auth0/nextjs-auth0/edge");
  const res = NextResponse.next();
  const session = await getSession(req, res);
  if (!session) {
    const url = new URL("/api/auth/login", req.url);
    url.searchParams.set("returnTo", path);
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  // Run on everything except static assets and files with extensions.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
