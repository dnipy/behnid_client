import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ApiRequest } from "../../clients/axios";
import { BACK_END } from "../../clients/localStorage";
import {Product} from "../../components/blog";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import { LoadingComponent } from "../../components/loading";
import Navbar_v2 from "../../components/Navbar_v2";
import { MiniProduct } from "../../components/products/mini-product";

  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    ApiRequest
    .get(`/products/all?start=1&length=20`)
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
    <>
    {loading ? <LoadingComponent/> : null}
    {error ? <ErrorComponent  details={'500'} /> : null}
    <Navbar_v2 />
    <main className="flex justify-center min-h-screen">
      <div className="w-1/1 md:w-3/4 my-10 p-3">


      {response?.err ? 'ارور' :

          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
          {loading == false ? response.map((elm :any)=>(
            <MiniProduct AuthorId={elm?.authorID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName} sendFrom={elm?.city?.name} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name} title={elm?.title}  />
          )) : null}

          </div>

        }
      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Page