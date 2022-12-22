import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Blog( props : {id : number, title : string , image : string , likes : number , describe : string }) {

    const router = useRouter()
  return (
        <div onClick={()=>router.replace(`/blog/${props.id}`)} className="max-w-sm  basis-1/3 bg-white hover:shadow-xl shadow-lg rounded-lg overflow-hidden text-right my-4">
            <img className="w-full h-56 object-cover object-center" src="https://archive.org/download/no-photo-available/no-photo-available.png" alt="avatar"/>
            <div className=" items-center px-6 py-3 bg-gray-900">
                {/* <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 512 512">
                    <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z"/>
                </svg> */}
                <h1 className="mx-3 text-white font-semibold text-center text-lg">{props.title}</h1>
            </div>
            <div className="py-4 px-6">
                <p className="py-2 text-lg text-gray-700"> ... {props.describe}</p>
                <div className="flex justify-end items-center mt-4 text-gray-700">
                    <h1 className="px-2  text-sm">{props.likes}</h1>
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                        <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                    </svg>
                </div>
                <div className="flex justify-end items-center mt-4 mb-3 text-gray-700">
                    <h1 className="px-2 text-sm">ممدرضا</h1>
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                        <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                    </svg>
                </div>
            </div>
        </div>  
    )
}

export default Blog



export function Product( props : { authorID : string | number , price : number | string , id : number, title : string , image : string , likes : number , describe : string, author : string , city : string}) {

    const router = useRouter()
  return (
        <div dir='ltr' className="   w-[15rem] h-[20rem] bg-white hover:shadow-xl shadow-lg rounded-lg overflow-hidden text-right   mr-auto ml-auto  sm:mr-2 sm:ml-2 my-4">
            {/* <img className="w-full object-center" src={props.image ? props.image : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt="avatar"/> */}
            
            <div className="h-[2rem]  text-left pl-4 pt-2 text-xs">
                <p  onClick={()=>router.replace(`/sellers/${props.authorID}`)}>
                @{props.author}
                </p>
            </div>
            <div  onClick={()=>router.replace(`/products/${props.id}`)} className='h-[12rem]  ' style={{backgroundImage : `url(${props.image})`,  backgroundPosition: 'center',  backgroundSize: 'cover',  backgroundRepeat: 'no-repeat'  }}   >

            </div>
            <div className='text-sm font-bold text-center pt-2'>
                {props.title}
            </div>
            <div className='h-[3rem] my-[0.5rem]  flex flex-row' >
                <div className='w-1/3 border-r-2 text-center'>
                    <p className='text-sm'>شهر</p>
                    <p className='text-xs'>{props.city}</p>
                </div>

                <div className='w-1/3 border-r-2 text-center'>
                    <p className='text-sm'>لایک</p>
                    <p className='text-xs'>{props.likes}</p>
                </div>

                <div className='w-1/3  text-center'>
                    <p  className='text-sm'>قیمت</p>
                    <p className='text-xs'>{props.price}</p>
                </div>

            </div>
        </div>  
    )
}

export function MyProduct( props : {id : number, title : string , image : string , likes : number , describe : string, author : string , city : string}) {

    const router = useRouter()
  return (
        <div dir='ltr' onClick={()=>router.replace(`/profile/change-product?id=${props.id}`)} className="max-w-xs  ml-auto mr-auto bg-white hover:shadow-xl shadow-lg rounded-lg overflow-hidden text-right my-4">
            <img className="w-full h-56 object-cover object-center" src={props.image ? props.image : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt="avatar"/>
            <div className=" items-center px-6 py-3 bg-gray-900">
                {/* <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 512 512">
                    <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z"/>
                </svg> */}
                <h1 className="mx-3 text-white font-semibold text-center text-lg">{props.title}</h1>
            </div>
            <div className="py-4 px-6">
                <p dir='rtl' className="h-44 py-2 text-lg text-right text-gray-700"> {props.describe.slice(0,100)} ... </p>

                <div className="flex justify-around my-2">

                <div className="flex justify-end items-center mt-4 mb-3 text-gray-700">
                        <h1 className="px-2 text-sm">{props.author}</h1>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                        </svg>
                    </div>

                    <div className="flex justify-end items-center mt-4 mb-3 text-gray-700">
                        <h1 className="px-2  text-sm">{props.city}</h1>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                        </svg>
                    </div>
                    

                </div>
            </div>
        </div>  
    )
}

export function MyProductOptions( props : {id : number, title : string , image : string , likes : number , describe : string, author : string , city : string}) {
    const [notif,setNotif]= useState(false)

    
    const router = useRouter()
  return (
        <div dir='ltr'  className="max-w-xs  ml-auto mr-auto bg-white hover:shadow-xl shadow-lg rounded-lg overflow-hidden text-right my-4">
            <img className="w-full h-56 object-cover object-center" src={props.image ? props.image : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt="avatar"/>
            <div onClick={()=>setNotif(!notif)} className=" items-center px-6 py-3 bg-gray-900">
                <h1 className="mx-3 text-white font-semibold text-center text-lg">{props.title}</h1>
            </div>
            {
                notif ? 
                <div className=' mx-4  items-center px-6 py-3 rounded-b-xl bg-orange-400 flex justify-around'>
                    <h1 className='text-xs cursor-pointer' onClick={()=>router.replace(`/profile/products-requests?id=${props.id}`)}>درخواست ها</h1>
                    <h1 className='text-xs cursor-pointer' onClick={()=>router.replace(`/profile/change-product?id=${props.id}`)}>تغییر</h1>

                </div> : 
                null
            }
            <div className="py-4 px-6">
                <p dir='rtl' className="h-44 py-2 text-lg text-right text-gray-700"> {props.describe.slice(0,100)} ... </p>

                <div className="flex justify-around my-2">

                <div className="flex justify-end items-center mt-4 mb-3 text-gray-700">
                        <h1 className="px-2 text-sm">{props.author}</h1>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                        </svg>
                    </div>

                    <div className="flex justify-end items-center mt-4 mb-3 text-gray-700">
                        <h1 className="px-2  text-sm">{props.city}</h1>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                        </svg>
                    </div>
                    

                </div>
            </div>
        </div>  
    )
}