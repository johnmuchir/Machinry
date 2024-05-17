import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignOutButton, SignedIn } from '@clerk/nextjs'

const page = () => {
  return (
    
    <div className=' grid gap-5 px-4'>
      <div className='flex items-center gap-3'>
        <Image src="/assets/settings.png" 
          alt="setting" 
          width={24} 
          height={24} 
          className='h-8 w-8' 
        />
        <h1 className='font-bold'>Settings</h1>
      </div>

      <div className='flex items-center gap-1'>
        <div className=''>
          <SignedIn>
          <SignOutButton>
            <div className='flex gap-5 cursor-pointer'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
                className='bg-gray-400 rounded-md'
              />
              <p>Logout</p>
            </div>
          </SignOutButton>
          </SignedIn>
        </div>        
      </div>
     
      <div className='grid gap-2 justify-center fixed bottom-40 '>
        <h1 className='font-bold text-[16px]'>Reach Us:</h1>
        <div className='text-light-3 items-center justify-center flex text-small-regular gap-5'>
          <Link href={`mailto:machinaries873@gmail.com`}>
            <Image
              src="/assets/gmail.png" 
              alt="email"
              width={28}
              height={28}
              className='cursor-pointer w-7 h-7'
            />
          </Link>
          <a href="https://wa.me/+254739435290">
            <Image src="/assets/whatsapp.png" alt="whatsapp" width={28} height={28} className='w-7 h-7'/>
          </a>
        </div>
      </div>
      <div className='flex items-center fixed justify-between gap-10 bottom-20 '>
       <Link href={'/'}>
        <Image
          src="/assets/icon.png" 
          alt="" 
          width={40}
          height={40}
          className='rounded-full w-10 h-10'
        />
        </Link>
        <p className='text-light-3 text-subtle-medium '>2024 Machinry. All Rights reserved.</p>
      </div>
    </div>
  
  )
}

export default page
