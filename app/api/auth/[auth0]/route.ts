import { NextResponse } from "next/server";

// Auth0 login/logout/callback endpoints. Active only when AUTH_MODE=auth0; in
// local mode these 404 so the SDK never needs to be configured.
export const dynamic = "force-dynamic";

type Ctx = { params: { auth0: string } };

export async function GET(req: Request, ctx: Ctx) {
  if (process.env.AUTH_MODE !== "auth0") {
    return NextResponse.json(
      { error: "Auth0 is disabled. Set AUTH_MODE=auth0 to enable it." },
      { status: 404 },
    );
  }
  const { handleAuth } = await import("@auth0/nextjs-auth0");
  const handler = handleAuth();
  // The App Router handler signature matches (req, ctx).
  return (handler as (r: Request, c: Ctx) => Promise<Response>)(req, ctx);
}
