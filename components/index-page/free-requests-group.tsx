import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../clients/axios';
import FreeRequestComponent from '../FreeRequestComponent';


function FreeRequestsGroup() {
    const router = useRouter()

    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const [page , setPage] = useState(1)
  
  
    useEffect(()=>{
      ApiRequest
      .get(`/requests/all?start=1&length=9`)
      .then((res) => {
        setResponse(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        setError('ارور همگام دریافت نیاز ها');
        
  
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])
  
  
  return (
    <div className="basis-full order-2 lg:order-1 lg:basis-3/5 px-5 ">

        <div className='w-full text-right py-3  '>
                <h1 className='px-5 flex ' >

                  <span className=' col-span-1 text-3xl md:text-5xl text-beh-gray-dark  md:font-bold border-l-4 border-l-beh-gray-dark  '>
                    &nbsp;  تامین کن!&nbsp;
                  </span>




                  <span className=' col-span-1 hover:cursor-pointer px-2 text-xl mt-10 md:mt-4 font-semibold text-beh-orange'>
                   نیاز جامعه رو پیدا کن و تامین کننده شو 
                  </span>                
                </h1>
        </div>

        {response && page == 1 ?  
            (response as Array<any>).slice(0,3).map((elm)=>(
                <FreeRequestComponent key={elm?.id} id={elm?.id} username={elm?.Author?.profile?.name ? elm?.Author?.profile?.name : "کاربر بدون نام"} describe={elm?.describe} date={elm?.request_expire_date} recive_location={elm?.city?.name } title={elm?.name} avatar={elm?.Author?.avatar} />
            ))
        : null}


        {response && page == 2 ?  
                (response as Array<any>).slice(2,3).map((elm)=>(
                    <FreeRequestComponent key={elm?.id} id={elm?.id} username={elm?.Author?.profile?.name ? elm?.Author?.profile?.name : "کاربر بدون نام"} describe={elm?.describe} date={elm?.request_expire_date} recive_location={elm?.city?.name } title={elm?.name} avatar={elm?.Author?.avatar} />
                ))
        : null}


        {response && page == 3 ?  
                (response as Array<any>).slice(5,3).map((elm)=>(
                    <FreeRequestComponent key={elm?.id} id={elm?.id} username={elm?.Author?.profile?.name ? elm?.Author?.profile?.name : "کاربر بدون نام"} describe={elm?.describe} date={elm?.request_expire_date} recive_location={elm?.city?.name } title={elm?.name} avatar={elm?.Author?.avatar} />
                ))
        : null}

        <div className='mt-5 flex justify-center items-center'>
                    <div className='w-60 h-6  flex flex-row justify-between'>
                        <div  onClick={page < 3 && page !=3 ? ()=>setPage(page+1) : undefined} className={ `${page != 3 ? 'text-beh-gray' : 'to-beh-gray-light'} cursor-pointer  `}>
                            <h1 className={` ${page !=3 ? 'text-beh-gray-dark' : 'text-beh-gray-light' } `}>
                            بعدی
                            </h1>
                        </div>

                        <div dir='ltr' className='flex justify-between items-center gap-5'>
                            <div onClick={()=>setPage(1)} className={` ${page==1 ? 'bg-beh-gray-dark' : 'bg-beh-gray-light' } rounded-full w-4 h-4 `}></div>
                            <div onClick={()=>setPage(2)} className={` ${page==2 ? 'bg-beh-gray-dark' : 'bg-beh-gray-light' }  rounded-full w-4 h-4 `}></div>
                            <div onClick={()=>setPage(3)} className={` ${page==3 ? 'bg-beh-gray-dark' : 'bg-beh-gray-light' }  rounded-full w-4 h-4 `}></div>

                        </div>

                        <div className={`cursor-pointer`} onClick={page > 1 && page != 1 ? ()=>setPage(page-1) : undefined}>
                            <h1 className={` ${page !=1 ? 'text-beh-gray-dark' : 'text-beh-gray-light' } `}>
                            قبلی
                            </h1>
                        </div>
                    </div>
                    
        </div>



    </div>
  )
}

export default FreeRequestsGroup