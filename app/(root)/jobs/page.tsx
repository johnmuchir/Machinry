import { currentUser } from "@clerk/nextjs";
import { fetchUsers } from "@/lib/actions/user.action";
import FollowCard from "@/components/cards/FollowCard";

async function page() {
  const user = await currentUser();
  if (!user) return null;

  const follow = await fetchUsers({
    userId: user.id,
  });

  
  return (
    <section className=''>
      {/*<div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium'>Similar Minds</h3>
        <div className='mt-7 flex flex-col gap-5'>
          {follow.users.length > 0 ? (
            <>
              {follow.users.map((person) => (
                <FollowCard
                  key={person?.id}
                  id={person?.id} 
                  name={person?.name}
                  username={person?.username}
                  imgUrl={person?.image}
                  followId={person?.id}
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular'>No users yet</p>
          )}
        </div>
      </div>
      <div>

        </div>*/}
    </section>
  );
}

export default page;
