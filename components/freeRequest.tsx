import { useRouter } from 'next/router'
import React from 'react'

function FreeRequest(props : {id : number , quantity : string , name : string , describe : string , authorName : string , cityName : string , catName  :string}) {
  
  const router = useRouter()
  return (
    <div dir='ltr' key={props.id} className=" hover:scale-110 duration-200  w-sm bg-white px-10 pt-6 h-64 mr-auto ml-auto  sm:my-5  pb-2 rounded-xl shadow-lg transform  text-right transition duration-500">
   
      <h1 className="my-1 text-gray-800 text-2xl text-center font-bold cursor-pointer">...{props.name.slice(0, 13)}</h1>
      
      <h3 className="mb-3 pt-2  text-xl font-bold text-orange-400 flex items-center justify-end">  
       {props.authorName}
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 text-orange-400 mb-1.5" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
       </h3>
       
      <div className="my-4">
        <div className="flex space-x-1 items-center justify-end">
        <p className='pb-2'>{props.catName}</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 text-gray-800 mb-1.5" viewBox="0 0 16 16">
              <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </span>
        </div>

        <div className="flex space-x-1 items-center justify-end">
        <p className='pb-2'>{props.cityName ? props.cityName : 'نامشخص'}</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 text-gray-800 mb-1.5" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
          </span>
        </div>

        <button onClick={()=> router.replace(`/requests/${props.id}`)} className="mt-4 text-xl w-full text-white bg-gray-900 py-2 rounded-xl shadow-lg">مشاهده</button>
      </div>
    </div>
  )
}

export default FreeRequest