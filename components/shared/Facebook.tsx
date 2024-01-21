import React from 'react';
import Image from 'next/image';

interface FacebookProps {
    url: string;
    quote: string;
}
const Facebook = ({ url, quote, }: FacebookProps) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;

  return (
    <div>
      <a href={shareUrl} target="_blank" rel="noopener noreferrer">
        <Image src='/assets/share.png' alt='whatsapp' width={24} height={24} className='h-6 w-6' />
      </a>
    </div>
  );
};

export default Facebook;
