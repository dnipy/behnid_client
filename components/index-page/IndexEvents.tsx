import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Event from '../../assets/EventImage.jpg'
import logo from '../../assets/logo.png'

function IndexEvents() {
    const router = useRouter()
  return (
    <div className='mt-20 w-[90%] mr-auto ml-auto'>
        
        <div onClick={()=> router.replace('/auth/register')} className='flex  cursor-pointer flex-wrap w-full min-h-[10rem] items-center bg-[#525252] mt-4 mb-10'>
            <div  className='w-[600px] text-center lg:text-right text-4xl lg:py-0 py-5  pr-10 font-bold text-white'>
                ثبت نام کن و 10% تخفیف بگیر !!!
            </div>
            <div className='w-[400px] mr-auto ml-auto min-h-[10rem] pr-4 flex justify-center items-center' >
                <div className='w-[80%] h-[7.5rem] bg-white flex items-center justify-center'>
                    <Image src={logo} />
                </div>
            </div>    
        </div>

        <Image src={Event} className="" />

    </div>
  )
}

export default IndexEvents