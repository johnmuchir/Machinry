"use client"

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Props {
  threadId: string;
  userId: string;
}

function Likes({ threadId, userId }: Props) {
  const pathname = usePathname();
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // You might want to fetch the initial like status and count from the server
    // For simplicity, let's assume you have this information available
    // Fetch the initial like status and count here if needed

    // Example:
     const fetchData = async () => {
    //   // Fetch like status and count from the server
      //const { isLiked, likeCount } = await addLikeToThread(JSON.parse(threadId), pathname);
      if (threadId !== null) {
      setIsLiked(isLiked);
       setLikeCount(likeCount);
     };
    
     fetchData();
    }
  }, [threadId]);

  const handleLikeClick = async () => {
    try {
     

      // Update the local state to reflect the new like state
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex items-center gap-1`}>
      <button onClick={handleLikeClick} className={`cursor-pointer focus:outline-none ${isLiked ? 'text-red-900' : 'text-gray-900'}`}>
        {/* You can replace the text with your heart icon */}
        {isLiked ? '❤️' : '🤍'}
      </button>
      <span className='text-subtle-medium text-light-3'>{likeCount}</span>
    </div>
  );
}

export default Likes;
