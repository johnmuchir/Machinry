import { currentUser } from "@clerk/nextjs";
import { getFriends } from "@/lib/actions/user.action";

async function FetchFriends () {
  const user = await currentUser();
  if (!user) return null;

  const result = await getFriends(
    user.id,
  );

  return (
    <div>

    </div>
  );
}

export default FetchFriends;
