import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Event from '../../assets/EventImage.jpg'
import logo from '../../assets/logo.png'
import FreeRequestComponent from '../FreeRequestComponent'
import FreeRequestsGroup from './free-requests-group'

function IndexEvents() {
    const router = useRouter()
  return (
    <div className='mt-20 w-[90%] mr-auto ml-auto'>
        
        <div onClick={()=> router.replace('/auth/register')} className='flex  cursor-pointer flex-wrap w-full min-h-[10rem] items-center bg-[#525252] mt-4 mb-10'>
            <div  className='w-[600px] text-center lg:text-right text-4xl lg:py-0 py-5  pr-10 font-bold text-white'>
                <h1 className='text-center lg:text-right'>
                ثبت نام کن و 10% تخفیف بگیر !!!
                </h1>
            </div>
            <div className='w-[400px] mr-auto ml-auto min-h-[10rem] pr-4 flex justify-center items-center' >
                <div className='w-[80%] h-[7.5rem] bg-white flex items-center justify-center'>
                    <Image src={logo} alt="logo" />
                </div>
            </div>    
        </div>

        <div  className='flex  gap-5 flex-wrap w-full min-h-[10rem] items-center  mt-4 mb-10'>
            <div className='basis-0 lg:basis-1/4'>

            </div>

           <FreeRequestsGroup />
        </div>

        <Image src={Event} className="" alt="logo-two" />

    </div>
  )
}

export default IndexEvents