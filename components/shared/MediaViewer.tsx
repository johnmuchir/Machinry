"use client"

import React, { useState, useEffect, useRef } from 'react';
import MediaModal from '../forms/MediaModal';

interface MediaViewerProps {
  images: string[];
}

const MediaViewer: React.FC<MediaViewerProps> = ({ images }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openMediaOverlay = (index: number) => {
    setSelectedMediaIndex(index);
  };

  const closeMediaOverlay = () => {
    setSelectedMediaIndex(null);
  };

  useEffect(() => {
    // Pause the video when the overlay is closed
    if (!selectedMediaIndex && videoRef.current) {
      videoRef.current.pause();
    }
  }, [selectedMediaIndex]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries && entries.length > 0) {
      const isInView = entries[0].isIntersecting;

      // Play or pause the video based on visibility
      if (videoRef.current) {
        isInView ? videoRef.current.play() : videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const videoObserver = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    // Observe the video element
    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (videoRef.current) {
        videoObserver.unobserve(videoRef.current);
      }
    };
  }, []);

  const visibleImages = images.slice(0, 2); // Display only the first two images
  const remainingImagesCount = images.length - 2;

  return (
    <div className='relative'>
      {visibleImages && visibleImages.length > 0 && (
        <div className="mt-2 flex items-center">
          {visibleImages.map((media, index) => (
            <div key={index} className="media-container w-full">
              {media.includes('mp4') ? (
                <div>
                  {/* Add a ref to the video element */}
                  <video ref={videoRef} controls className="rounded-lg mb-2">
                    <source src={media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : media.includes('pdf') ? (
                <div onClick={() => openMediaOverlay(index)}>
                  {/* Adjust the styling of the iframe */}
                  <iframe src={media} title={`pdf-${index}`} className='w-full' />
                </div>
              ) : (
                <div onClick={() => openMediaOverlay(index)}>
                  <img src={media} alt="" className="rounded-lg mb-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {remainingImagesCount > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-2 rounded ">
          {`+${remainingImagesCount} `}
        </div>
      )}

      {selectedMediaIndex !== null && (
        <MediaModal images={images} onClose={closeMediaOverlay} />
      )}

    </div>
  );
};

export default MediaViewer;
