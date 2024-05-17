import Booking from '@/components/map/Booking'
import React from 'react'

const page = () => {
  return (
    <div className='text-light-1'>
      Search Lowloader
      <div className='grid grid-cols-1 md:grid-cols-3 mt-10'>
        <div className=' g-teal-100 '>
          <Booking />
        </div>
        <div className='col-span-2 g-red-100'>
          Map 
        </div>
      </div>
    </div>
  )
}

export default page
