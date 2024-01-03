'use client'

import React, { useState, useEffect } from 'react';

const MyImage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = 3; // Change this according to the total number of images
  const autoSlideInterval = 6000; // 3 seconds, adjust as needed

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === totalImages - 1 ? 0 : prevImage + 1));
    }, autoSlideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [totalImages]);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage === totalImages - 1 ? 0 : prevImage + 1));
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? totalImages - 1 : prevImage - 1));
  };

  return (
    <div className='w-full rounded'>
      <div className='rounded-lg w-full'>
        <img
          src="/images/20.jpg"
          alt="Image 1"
          className={currentImage === 0 ? '' : 'hidden animate-spin  transition-opacity ease-in-out duration-1000 delay-1000'}
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
        <img
          src="/images/20.jpg"
          alt="Image 2"
          className={currentImage === 1 ? '' : 'hidden transform rotate-90 animate-spin'}
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
        <img
          src="/images/20.jpg"
          alt="Image 3"
          className={currentImage === 2 ? '' : 'hidden animate-spin '}
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
        
      </div>
    </div>
  );
};

export default MyImage;
