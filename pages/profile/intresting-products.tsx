import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AuthorizedApiRequest } from "../../clients/axios";
import { BACK_END } from "../../clients/localStorage";
import ErrorComponent from "../../components/alerts/error";
import { LoadingComponent } from "../../components/loading";
import {  IntrestingMiniProduct } from "../../components/products/mini-product";
import { City, Product, User } from "../../types/async-prisma-types";
import { NextSeo } from "next-seo";

export type savedProducts ={err : string | null} & (Product &  {
  city: City | null;
  author: {
      user: User & {
          profile: {
              family: string | null;
              name: string | null;
          } | null;
      };
      id: number;
  };
})[]

  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<savedProducts | null>(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/profile/my-intresting-products`)
    .then((res) => {
      if (res.data.err) {
        setError(res.data.err)
      }
      else {

        setResponse(res.data);
        console.log(res.data)
      }
    })
    .catch((err) => {
      setError(err);
      router.replace('خطا در ارتباط با سرور')
    })
    .finally(() => {
      setloading(false);
    });
  
},[])



  return (
    <>
    <NextSeo
      title="علاقمندی"
    />
      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  message={error} handle={setError}/> : null}

    <main className="flex justify-center">
      <div className="fixed z-[1] w-full h-screen flex justify-center">
            <BsFillHeartFill className="fill-beh-orange/30 w-full h-3/4 mt-12  md:mt-[5rem]  mx-4" />
      </div>
      <div className="w-1/1 z-[2] md:w-3/4 mb-10 mt-2 p-3">
      <div dir="rtl" className="flex h-[50px] mb-5 ">
                    <div className="w-full  border-b-[2px] border-gray-300 ">
                      <h1 className="text-xl text-orange-500 pr-2 font-bold ">علاقمندی</h1>
                    </div>             
      </div>

      {response?.err ? 'ارور' :


          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
          {loading === false && response ? response.map((elm)=>(
            <IntrestingMiniProduct product={response} setProducts={setResponse} AuthorId={elm?.authorID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName ? elm?.unitName : 'کیلوگرم'} sendFrom={elm?.city?.name ? elm?.city?.name : 'نامشخص'} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name ? elm?.author?.user?.profile?.name : 'نامشخص'} title={elm?.title}  />
          )) : null}

          </div>

        }
      </div>
    </main>
  </>
  )
}  

export default Page