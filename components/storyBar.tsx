import Image from 'next/image'
import React from 'react'
import NoImg from '../assets/NoImg.png'

function StoryBar() {
  return (
    <div className='rounded-sm w-[20rem]  md:w-3/4 overflow-auto h-[6.5rem] bg-gray-700  border-solid border-orange-500 border-[3px] flex' >
        <StroyComponent/>
        <StroyComponent/>
        <StroyComponent/>
        <StroyComponent/>
        <StroyComponent/>
        <StroyComponent/>

    </div>
  )
}




export const StroyComponent = ()=>{
    return (
        <div className='h-full w-[6rem] mx-2 '>
            <div className='rounded-full w-[4rem] h-[4rem] mr-auto flex justify-center items-center ml-auto mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
                <div className='rounded-full w-[3.6rem] h-[3.6rem]'>

                <Image objectFit='cover'  src={NoImg} className='rounded-full w-[3.6rem] h-[3.6rem]'  />
                </div>
            </div>
            <p className='text-center mt-1 text-white'>
                @dnipy
            </p>
        </div>
    )
}

export default StoryBar