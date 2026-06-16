import { cache } from "react";
import { getActiveUser } from "@/lib/auth";

// Request-scoped memoisation so the layout and the page don't each run the
// user sync (streak recalc) separately within a single render.
export const getSessionUser = cache(getActiveUser);
