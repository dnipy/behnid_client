import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Event from '../../assets/EventImage.jpg'
import logo from '../../assets/logo.png'
import FreeRequestComponent from '../FreeRequestComponent'
import FreeRequestsGroup from './free-requests-group'
import radar from '../../assets/radar.gif'


function IndexEvents() {
    const router = useRouter()
  return (
    <div className='mt-20 w-[90%] mr-auto ml-auto'>
        
        <div  className='flex  cursor-pointer flex-wrap w-full min-h-[10rem] items-center bg-[#525252] mt-4 mb-10'>
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

        <div  className='flex flex-row  gap-5 flex-wrap w-full min-h-[10rem] items-center  py-10 mt-4 mb-10 bg-white'>
           <FreeRequestsGroup />
           
           
           
            <div className='basis-full order-1 lg:order-2 lg:basis-2/6 h-full mt-5 '>
                <div className='w-full'>

                    <img src={radar.src} alt="radar gif" loading='lazy' className='mx-auto' />
                    <div className='mt-10 h-[300px]'>
                        <h1 className=' col-span-1 text-4xl text-beh-gray-dark  font-bold     '>
                            &nbsp;  چیزی نیاز داری؟  &nbsp;
                        </h1>
                        <h6 className='px-5 py-3 text-lg font-semibold'>

                        به نید با تجربه 16 ساله افتخار همکاری با شرکت های بزرگ در حوزه ی موادغذایی ،شوینده ،بهداشتی و نوشیدنی را دارد.
 همچنین افتخار ارتباط با بیش از 4000 کسب و کار ، خریدار و فروشنده عمده در کارنامه خود را دارد                        </h6>

                        <div className='flex mt-2 justify-end px-10 lg:px-0'>
                            <div className=' rounded-lg w-[160px] h-[50px] cursor-pointer  bg-beh-gray-dark text-beh-orange font-bold text-2xl'>
                                <h1 className='text-center pt-1'>
                                    پیام بزار
                                </h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <Image src={Event} className="" alt="logo-two" />

    </div>
  )
}

export default IndexEvents