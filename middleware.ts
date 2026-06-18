import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Route protection. All app routes require authentication.
// Public routes: "/", "/migration-guide", auth screens, and confirmation routes.
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic =
    path === "/" ||
    path.startsWith("/migration-guide") ||
    path === "/signin" ||
    path === "/signup" ||
    path.startsWith("/auth") ||
    path.startsWith("/api/auth");

  if (isPublic) {
    return NextResponse.next();
  }

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set(name, value);
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set(name, "");
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("returnTo", path);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  // Run on everything except static assets and files with extensions.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
