import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Pagination from "@/components/shared/Pagination";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import Searchbar from "@/components/shared/Searchbar";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-5'>Search</h1>

      <Searchbar routeType='search' />

      {/*<div className='mt-10 flex flex-col gap-5'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
        </div>*/}
        <div className="text-light-1 p-2 grid gap-2">
          <h1>Dear Machinry Users</h1>
          <p className="text-[14px] text-gray-300">
            We are thrilled to have you as a part of our Machinry App community, where we are on a mission to revolutionize the way you interact with machinery. Your trust and enthusiasm inspire us every day, and we want to provide you with an exciting update about the future of our App.
          </p>

          <h1>Under Development:</h1>
          <p className="text-[14px] text-gray-300">As you may have noticed, Machinry App is currently in the development phase. We are working tirelessly to create a cutting-edge platform that will redefine your experience with machinery management. Our team is dedicated to delivering a user-friendly, feature-rich application that meets and exceeds your expectations.</p>
        
          <h1>Exciting AI Integration:</h1>
          <p className="text-[14px] text-gray-300">The future holds something truly groundbreaking for Machinry App. We are thrilled to announce that very soon, our app will be integrated with Artificial Intelligence (AI) for advanced troubleshooting capabilities. This means that Machinry App will not only serve as a comprehensive machinery management tool but will also empower you with intelligent solutions for identifying and resolving issues.</p>
        
          <h1>Your Role in Our Journey:</h1>
          <p className="text-[14px] text-gray-300">Your feedback and support have been instrumental in shaping Machinry App. As we move forward, we encourage you to stay engaged and share your thoughts. Your insights are invaluable in ensuring that Machinry App becomes a game-changer in the world of machinery management.</p>
        
          <h1>Stay Tuned:</h1>
          <p  className="text-[14px] text-gray-300" >Exciting times are ahead! We will keep you updated on the progress of Machinry App and the anticipated launch of the AI-integrated version. Your patience and enthusiasm mean the world to us, and we can't wait to share the final product with you.
            </p>
        
        </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;