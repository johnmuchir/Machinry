import { currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.action";
import MyImage from "./MyImage";
import FetchFriends from "../cards/FetchFriends";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className="w-[300px] ">
        <h3 className='text-heading4-medium'>Sponsored</h3>
        <div className="mt-5">
          <MyImage />
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium'>Similar Minds</h3>
        <div className='mt-7 flex w-[300px] flex-col gap-5'>
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person?.id}
                  id={person?.id} 
                  name={person?.name}
                  username={person?.username}
                  imgUrl={person?.image} 
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular'>No users yet</p>
          )}
        </div>
      </div>
      <div>
        <FetchFriends />
      </div>
    </section>
  );
}

export default RightSidebar;