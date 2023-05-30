import React from 'react'
import {FiXCircle} from "react-icons/fi"
function WarnComponent(props : {message? : string , handle :(value: React.SetStateAction<string>) => void}) {
  return (
    <div dir='rtl' className='fixed max-w-sm text-white z-50 text-xl bg-beh-yellow top-4 w-[18rem] min-h-[5rem] rounded-xl p-3 left-7'>
        <div className='absolute scale-125 bg-beh-red p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handle('')}>
            <FiXCircle />
        </div>

        <div dir='rtl' className=''>
            <h1 className='font-bold text-left'>راهنما</h1>
            <h6 className='text-lg'>
              {props.message && typeof(props.message) === 'string' ? props.message : 'اطلاعاتی از سرور یافت نشد'}
            </h6>
        </div>
        
    </div>
  )
}

export default WarnComponent