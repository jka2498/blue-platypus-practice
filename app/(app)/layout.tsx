import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SetupNotice } from "@/components/layout/setup-notice";
import { authMode } from "@/lib/auth";
import { getSessionUser } from "@/lib/session";
import { getLevelInfo } from "@/lib/levels";

// All app pages read per-user data at request time — never statically prerender.
export const dynamic = "force-dynamic";

// All authenticated app pages share this shell. Data flows top-down from the
// synced user; if the DB is unreachable we render a setup notice instead of
// crashing.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      // Auth0 mode, not logged in — middleware normally redirects, but guard here.
      return <SetupNotice detail="No active session. Please sign in." />;
    }
    const level = getLevelInfo(user.xp);

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar
          displayName={user.display_name}
          xp={user.xp}
          streak={user.streak_days}
          levelName={`Level ${level.level} — ${level.name}`}
          authMode={authMode()}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  } catch (err) {
    return <SetupNotice detail={err instanceof Error ? err.message : String(err)} />;
  }
}
