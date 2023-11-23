import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { Routes } from "@/types/routes";
import { redirect } from "next/navigation";

export const runtime = "edge";

function Register() {
  async function regiserUser(formData: FormData) {
    "use server";

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    let success = false;

    try {
      // Insert new user into the database
      await db.insert(users).values({ firstName, lastName }).execute();
      success = true;
    } catch (error: any) {
      // Check for unique constraint violation (generic approach)
      if (error.message.includes("AlreadyExists")) {
        return {
          errors: [
            {
              message: "User with this name already exists",
              status: 400,
            },
          ],
        };
      }

      return {
        errors: [
          {
            message: "Unknown Error",
            status: 500,
          },
        ],
      };
    }

    if (success) {
      redirect(Routes.Questions);
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen  lg:py-0">
          <h1 className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Suomi Trivia
          </h1>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="md:text-1xl text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Create Account
              </h1>
              <form className="space-y-4 md:space-y-6" action={regiserUser}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>

                  <input
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mb-2 me-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function Home() {
  const usersList = await db.select().from(users);

  return (
    <>
      <p>my users:</p>
      {usersList.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}

      <Register />
    </>
  );
}
