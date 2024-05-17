import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='grid gap-10'>
        <h1 className='head-text mb-3'>Search ...</h1>

      <Link href={`/search/`} className='bg-gray-300 p-2 rounded-lg drop-shadow-lg shadow-purple-300'>
        <h1>Users</h1>
      </Link>
      
      <Link href={`manuals`} className='bg-gray-300 p-2 rounded-lg drop-shadow-lg shadow-purple-300'>
        <h1>
            Machinary Manuals Pdf
        </h1>
      </Link>
      <Link href={`lowloader`} className='bg-gray-300 p-2 rounded-lg drop-shadow-lg shadow-purple-300'>
        <h1>
            Low-loader by Map Location
        </h1>
      </Link>
      <Link href={`machinary`} className='bg-gray-300 p-2 rounded-lg drop-shadow-lg shadow-purple-300'>
        <h1>
            Machinary by Map Location
        </h1>
      </Link>
    </div>
  )
}

export default page
