'use client'

import { addFriend, fetchUser } from "@/lib/actions/user.action";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Props {
  friendId: string;
}

const AddFriend = ({friendId}: Props) => {
  const [isFriendAdded, setIsFriendAdded] = useState(false); // State to track if friend is added
  const { user } = useUser(); // Get the current user from Clerk.js
  useEffect(() => {
    // Check if the friend is already added (persisted in localStorage)
    const storedFriendStatus = localStorage.getItem(`friend_${friendId}`);
    if (storedFriendStatus === 'true') {
      setIsFriendAdded(true);
    } else {
      setIsFriendAdded(false);
    }
  }, [friendId]);
  const handleAddFriend = async () => {
    try {
       if (!user) return null;

      //await addFriend(user?.id, friendId); // Call addFriend function with current user ID and author's ID
      
      setIsFriendAdded(false); // Update state to indicate friend added
      localStorage.setItem(`friend_${friendId}`, 'false');
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }
  return (
    <div>
      <div className=''>
        {/* Add friend button */}
        <button onClick={handleAddFriend} className="flex text-small-medium -mt-6 items-center gap-2">
        {isFriendAdded ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
    
  )

}

export default AddFriend;