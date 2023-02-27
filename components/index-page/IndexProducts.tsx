import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../clients/axios';
import { BACK_END } from '../../clients/localStorage';
import ErrorComponent from '../alerts/error';
import { MiniProduct } from '../products/mini-product';

function IndexProducts() {


    const router = useRouter()
 
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
  
  
    useEffect(()=>{
      ApiRequest
      .get(`/products/all?start=1&length=3`)
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
        console.log(err)
        setError('500')
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])


  return (
      <>
        {error ? <ErrorComponent handle={setError} message={error} /> : null}
        <div className="w-[95%] mr-auto ml-auto  ">
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
            <div dir="rtl" className="flex flex-wrap justify-center  gap-x-5 gap-y-6 ">
              
                {loading == false ? response.map((elm :any)=>(
                  <MiniProduct AuthorId={elm?.author?.user?.id} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName} sendFrom={elm?.city?.name} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name} title={elm?.title}  />
                )) : null}
              
            </div>


            {/* BOTTOM PART */}
            <div className="inline-flex justify-center items-center w-full mt-4">
                <hr className="my-8 w-full h-1 bg-gray-300 rounded border-0 ssss:bg-gray-700"/>
                    
                        <div onClick={()=>router.replace('/products')} className="absolute left-1/2 px-4 bg-white border-2 border-beh-orange hover:rounded-full transition-all duration-100 hover:duration-300 hover:text-orange-500  -translate-x-1/2 ssss:bg-gray-900 cursor-pointer">
                          <div className='px-5 py-[0.4rem] '>
                                نمایش بیشتر ...
                            </div>
                        </div>
             </div>
        </div>
        
      </>
    )
}

export default IndexProducts