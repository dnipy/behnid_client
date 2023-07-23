import React, { useEffect } from 'react'
import { FiXCircle } from 'react-icons/fi'

function ErrorComponent(props : {message? : string , handle :(value: React.SetStateAction<string>) => void}) {
  useEffect(()=>{
    setTimeout(() => {
      props.handle('')
    }, 4000);
  },[])
  return (
    <div className='fixed max-w-sm text-white z-50 text-xl bg-beh-red top-4 w-[18rem] min-h-[5rem] rounded-xl p-3 left-7'>
        <div className='absolute scale-125 bg-beh-green-light p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handle('')}>
            <FiXCircle />
        </div>
        <div dir='rtl' className=''>
            <h1 className='font-bold'>خطا</h1>
            <h6 className='text-lg'>
              {props.message && typeof(props.message) === 'string' ? props.message : 'اطلاعاتی از سرور یافت نشد'}
              
            </h6>
            
        </div>
    </div>
  )
}

export default ErrorComponent