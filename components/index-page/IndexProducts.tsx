import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../clients/axios';
import { Product } from '../blog';

function IndexProducts() {


    const router = useRouter()
 
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
  
  
    useEffect(()=>{
      ApiRequest
      .get(`/products/all?start=1&length=4`)
      .then((res) => {
        if (res.data.err) {
          setError('ارور')
        }
        else {
  
          setResponse(res.data);
          console.log(res.data)
        }
      })
      .catch((err) => {
        setError(err);
        router.replace('/500')
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])


  return (
        <div className="w-[95%] mr-auto ml-auto min-h-[500px] ">
            {/* TOP PART */}
            <div className="flex h-[80px]">
              <div className="w-2/3 h-[40px] border-b-[3px] border-gray-300">
                <h1 className="text-xl text-orange-500 pr-2 font-semibold ">محصولات</h1>
              </div>
              <div className="w-1/3">
                {/* 1/3 */}
              </div>
            </div>


            {/* MIDDLE PART */}
            <div dir="rtl" className="flex flex-wrap justify-center  gap-x-5  ">
                {loading == false ? response.map((elm :any)=>(
                <Product price={elm?.price} city={elm?.city?.name  ? elm.city.name : 'ایران'} author={elm.author.name} authorID={elm.author.id}  id={elm.id} key={elm.id} title={elm.title} describe={elm.describe} freeDelivery={elm?.freeDelivery} image={elm?.image ? `https://behnid.com${elm.image}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} />
                )) : null}
            </div>


            {/* BOTTOM PART */}
            <div className="inline-flex justify-center items-center w-full">
                <hr className="my-8 w-full h-1 bg-gray-300 rounded border-0 ssss:bg-gray-700"/>
                    
                        <div onClick={()=>router.replace('/products')} className="absolute left-1/2 px-4 bg-white border-2 border-orange-500 hover:rounded-full transition-all duration-300 hover:duration-300 hover:text-orange-500  -translate-x-1/2 ssss:bg-gray-900 cursor-pointer">
                            <div className='px-5 py-[0.4rem] '>
                                نمایش بیشتر ...
                            </div>
                        </div>
             </div>
        </div>
        
    )
}

export default IndexProducts