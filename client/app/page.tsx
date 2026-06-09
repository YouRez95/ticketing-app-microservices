import { getCurrentUser } from "@/lib/api/auth";

export default async function Home() {
  const { currentUser } = await getCurrentUser();

  return (
    <div>
      <h1 className="text-xl font-bold underline">Hello world</h1>
      {currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Not signed in</p>}
    </div>
  );
}
