import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function ComponentLoading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <AiOutlineLoading className="animate-spin" />
    </div>  )
}

export default ComponentLoading