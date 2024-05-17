import Image from 'next/image';

const MyImage = () => {
  return (
    <div className='w-full rounded'>
      <div className='rounded-lg w-full'>
        <Image
          src="/images/20.jpg"
          alt="Image"
          width={300}
          height={300}
          className='rounded-lg'
        />
      </div>
    </div>
  );
};

export default MyImage;
