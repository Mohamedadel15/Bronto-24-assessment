import { GetDataInServerSide } from "@/lib/action";

import UserBtn from "@/components/buttons/UserBtn";
import UserCard from "@/components/cards/UserCard";

interface User {
  id: number;
  name: string;
  job_title: string;
  user_name: string;
  created_at: string;
  age: number;
  country: {
    id: number;
    name: string;
  };
}

export default async function HomePage() {
  try {
    let users = await GetDataInServerSide("/userprofiles/", {
      cache: "no-store",
    });



    return (
      <article className="min-h-screen px-6 py-8 flex flex-col gap-5">
        <div className="flex justify-end w-full">
          <UserBtn addUser />
        </div>
        {
          users?.count == 0 ? (
            <p className="text-center font-bold text- 3xl text-gray-400 min-h-screen flex items-center justify-center">No users found</p>
          ) : (
            <section className="grid grid-cols-custom-300 gap-4 place-items-center">
              {
                users?.results?.map((user: User) => (
                  <UserCard key={user.id} user_details={user} />
                ))
              }
            </section>)
        }
      </article>
    );
  } catch (error) {
    return <p className="w-full h-screen text-center flex items-center justify-center text-3xl font-bold text-primary">Something went wrong</p>;
  }
}
