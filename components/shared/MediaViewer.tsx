"use client"

import React, { useState } from 'react';


interface MediaViewerProps {
  images: string[];
}

const MediaViewer: React.FC<MediaViewerProps> = ({ images }) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const openMediaOverlay = (media: string) => {
    setSelectedMedia(media);
  };

  const closeMediaOverlay = () => {
    setSelectedMedia(null);
  };

  return (
    <div>
      {images && images.length > 0 && (
        <div className="mt-2">
          {images.map((media, index) => (
            // Check if the media URL is not an empty string
            media && (
              <div key={index} className="media-container">
                {media.includes('pdf') ? (
                  // Display video
                  <div onClick={() => openMediaOverlay(media)}>
                    <iframe src={media} title={`pdf-${index}`} width="100%" height="200" />
                  </div>
                ) : media.includes('mp4') ? (
                  // Display PDF - you can customize this part based on your preference
                  <video controls className="rounded-lg mb-2">
                    <source src={media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Display image
                  <div onClick={() => openMediaOverlay(media)}>
                    <img src={media} alt="" className="rounded-lg mb-2" />
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {selectedMedia && (
        <div className='fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50' onClick={closeMediaOverlay}>
          <div className='h-auto w-full overflow-hidden bg-white p-0 relative'>
            {/* Render the selected media in fullscreen here */}
            {selectedMedia.includes('pdf') ? (
              <iframe src={selectedMedia} title="fullscreen-pdf" width="100%" height="100%" />
            ) : selectedMedia.includes('pdf') ? (
              <iframe src={selectedMedia} title="fullscreen-pdf" width="100%" height="100%" />
            ) : (
              <img src={selectedMedia} alt="" className="w-full h-full" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;
