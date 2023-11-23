import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

// oh yeah, this is the future
export const runtime = "edge";

export default async function Home() {
  const usersList = await db.select().from(users);

  const createUser = async () => {
    "use server";

    // await db.insert(user).values({ fullName: "John Doe" });
  };

  return (
    <>
      <p>my users:</p>
      {usersList.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}

      <form action={createUser}>
        <button>create user</button>
      </form>
    </>
  );
}
