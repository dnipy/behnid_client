import Image from 'next/image'
import React from 'react'
import { BACK_END } from '../clients/localStorage'

function Comment(props : {name : string , text : string , avatar : string | null}) {
  return (
    <div className="w-[95%] h-auto flex flex-col items-center  mx-auto  my-3 ">
    
    <div className='absolute  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
        {
            props.avatar 
                ?
            <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                :
            <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
        }
    </div> 
    
    <div className='mt-[50px] bg-beh-orange w-full h-[100px]'>
    <h1 className='text-center mt-[55px] font-bold text-lg text-white'>
        {props.name ? props.name : 'کاربر بدون نام'}
    </h1>
    </div>
    <div className=' p-5 text-black text-lg bg-beh-gray-light w-full min-h-[50px] h-auto'>
        <h1>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam tempore in fugit ratione recusandae cum, molestiae distinctio saepe. Atque nobis ipsa quis iusto minima non placeat, expedita laboriosam quibusdam illo!
        </h1>
    </div>
    </div>
  )
}

export default Comment