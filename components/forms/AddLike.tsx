"use client";

import { useEffect, useState } from "react";
import {  ThumbsUpIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { getLikes, likeThread, unlikeThread } from "@/lib/actions/thread.action";

interface Props {
  userId: string;
  threadId: string;
  thread: string | any;
}
function AddLike({ thread, userId, threadId }: Props) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(thread?.likes);

  useEffect(() => {
    if (userId && thread?.likes?.includes(userId)) {
      setLiked(true);
    }
  }, [thread, user]);

  const likeOrUnlikeThread = async () => {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like: any) => like !== userId)
      : [...(likes ?? []), userId];

    
    setLiked(!liked);
    setLikes(newLikes);
    
    try {
      if (liked) {
        await unlikeThread(threadId, userId);
      } else {
        await likeThread(threadId, userId);
      }

    } catch (error) {
      console.error("Error occurred:", error);
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like thread");
    }

    const fetchLikesResponse = await getLikes(threadId);
      if (!fetchLikesResponse.ok) {
        throw new Error("Failed to fetch likes");
      }

      const newLikesData = await fetchLikesResponse.json();

      setLikes(newLikesData);
  }
  
  return (
    <div className="">
      <div className="flex items-center gap-1 border-t">
        <button
          //variant="ghost"
          className=" text-gray-500"
          onClick={likeOrUnlikeThread}
        >
          {/* If user has liked the post, show filled thumbs up icon */}
          <ThumbsUpIcon
            className={cn(" h-5 w-5", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          
        </button>
        {likes && likes.length > 0 && (
          <p className="text-small-medium text-gray-500 cursor-pointer hover:underline">
            {likes.length} likes
          </p>
        )}
      
      </div>
    </div>
  );
}

export default AddLike;
