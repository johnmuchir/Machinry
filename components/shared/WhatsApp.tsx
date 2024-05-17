import React from 'react';
import Image from 'next/image';

interface WhatsAppProps {
    text: string;
}

const WhatsApp = ({ text }: WhatsAppProps) => {
    // Encode the text message
    const encodedText = encodeURIComponent(text);
    // Create the WhatsApp share link
    const shareUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

    return (
        <div>
            <a href={shareUrl} target="_blank" rel="noopener noreferrer">
              <Image src='/assets/share.png' alt='whatsapp' width={24} height={24} className='h-5 w-5 rounded-full mt-  ' />
            </a>
        </div>
    );
};

export default WhatsApp;
