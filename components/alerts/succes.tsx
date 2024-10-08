import React from 'react'
import { FiXCircle } from 'react-icons/fi'

function SuccesComponent(props : {message? : string , handle :(value: React.SetStateAction<string>) => void}){
  return (
    <div className='fixed max-w-sm text-white z-50 text-xl bg-beh-green-light top-4 w-[18rem] min-h-[5rem] rounded-xl p-3 left-7'>
        <div className='absolute scale-125 bg-beh-red p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handle('')}>
            <FiXCircle />
        </div>
        <div dir='rtl' className=''>
            <h1 className='font-bold'>موفق</h1>
            <h6 className='text-lg'>
              {props.message && typeof(props.message) == 'string' ? props.message : 'اطلاعات با موفقیت ثبت شد'}
            </h6>
            
        </div>
    </div>
  )
}

export default SuccesComponent