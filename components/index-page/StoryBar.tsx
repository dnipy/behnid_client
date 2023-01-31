import { useRouter } from 'next/router'
import React from 'react'
import { StroyComponent } from '../storyBar'


function IndexStoryBar() {

    const router = useRouter()
        return (
            <>
          <div dir='rtl' className='rounded-sm  mt-5 pt-3  w-full overflow-auto min-h-[1rem] bg-[#2C2C2C]  border-t-solid border-orange-500 border-t-[4px] flex' >
              {/* <StroyComponent/>
              <StroyComponent/>
              <StroyComponent/>
              <StroyComponent/>
              <StroyComponent/>
              <StroyComponent/> */}
            </div>
            <div className='bg-[#2C2C2C] h-16 w-full'></div>
            <div className="absolute inline-flex justify-center items-center w-full">


            <div className="absolute left-1/2 px-12 py-2 rounded-full bg-white border-4 border-beh-orange -translate-x-1/2 ssss:bg-gray-900 ">
                <div className='px-3 py-[0.4rem] text-sm lg:text-lg lg:px-5 font-bold text-center text-beh-orange '>
                    رویداد های اخیر
                </div>
            </div>
            </div>
            </>
        )
    
      
    
}

export default IndexStoryBar