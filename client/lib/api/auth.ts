import { cookies } from "next/headers";
import { services } from "@/lib/config";
import { cache } from "react";

export interface UserPayload {
  id: string;
  email: string;
}

export interface CurrentUserResponse {
  currentUser: UserPayload | null;
}

/**
 * Fetches the current authenticated user from the auth service.
 * Forwards the session cookie so express-session can read req.session.jwt.
 * Returns null for currentUser if unauthenticated — never throws on 401.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUserResponse> => {
  const cookieStore = await cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  try {
    const response = await fetch(`${services.auth}/api/users/currentuser`, {
      cache: "no-store",
      headers: { Cookie: decodedCookie },
    });

    if (!response.ok) return { currentUser: null };
    return response.json();
  } catch {
    return { currentUser: null };
  }
});
