"use client"

import { useEffect, useState } from "react";

function Likes() {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 500));
    const generatedViews = (Math.floor(Math.random() * 1000) / 1000).toFixed(1);
    setRandomViews(generatedViews !== "0.0" ? generatedViews + "k" : "");
  }, []);

  useEffect(() => {
    if (isLiked) {
      const delay = 3000; // Delay in milliseconds (adjust as needed)
      const interval = setInterval(() => {
        setRandomLikes((prevLikes) => prevLikes + 1);
      }, delay);

      // Clear the interval after 5 seconds (adjust as needed)
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLiked]);

  const handleLikeClick = async () => {
    // You can add any asynchronous logic here if needed

    // Simulate an asynchronous operation with a delay
    setIsLiked(true);

    // For demonstration purposes, you can remove the following line
    // and handle the asynchronous logic inside the setIsLiked callback
    // Reset the like state after 5 seconds (adjust as needed)
  };

  return (
    <div className={`flex items-center gap-2`}>
      <button onClick={handleLikeClick} className={`flex items-center cursor-pointer focus:outline-none ${isLiked ? 'text-red-900' : 'text-gray-900'}`}>
        {/* You can replace the text with your heart icon */}
        {isLiked ? '💙' : '🤍'}
        <p className="text-subtle-medium text-gray-1">{randomLikes}</p>
      </button>
      
      <div className="flex gap-1 text-subtle-medium text-gray-1">
      
        <p> Views {randomViews}</p>
      </div>
      
    </div>
  );
}

export default Likes;
