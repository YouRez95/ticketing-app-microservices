import Link from "next/link";
import { getCurrentUser } from "@/lib/api/auth";

export default async function Navbar() {
  const { currentUser } = await getCurrentUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg">
        MyApp
      </Link>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="text-sm text-gray-600">{currentUser.email}</span>
            <Link href="/auth/signout" className="text-sm">
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="text-sm">
              Sign in
            </Link>
            <Link href="/auth/signup" className="text-sm">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
