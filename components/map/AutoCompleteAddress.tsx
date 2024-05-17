import React from 'react'
import LoaderMap from './LoaderMap'

const AutoCompleteAddress = () => {
  return (
    <div>
      <div>
        <label className='text-light-3'>Where From?</label>
        <input type="text" className='bg-dark-4 border-[1px] p-1 w-full rounded-md outline-none' />
      </div>
      <div className='mt-3'>
        <label className='text-light-3'>Where To?</label>
        <input type="text" className='bg-dark-4 border-[1px] p-1 w-full rounded-md outline-none' />
      </div>
      <LoaderMap />
    </div>
  )
}

export default AutoCompleteAddress
