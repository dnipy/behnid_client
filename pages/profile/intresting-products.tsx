import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { Audio } from "react-loader-spinner";
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import { BACK_END } from "../../clients/localStorage";
import ErrorComponent from "../../components/alerts/error";
import {Product} from "../../components/blog";
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
      router.replace('/500')
    })
    .finally(() => {
      setloading(false);
    });
  
},[])



  return (
    <>
      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  message={error} handle={setError}/> : null}

    <main className="flex justify-center">
      <div className="fixed z-[1] w-full h-screen flex justify-center">
            <BsFillHeartFill className="fill-beh-orange/30 w-full h-3/4  mt-16    mx-4" />
      </div>
      <div className="w-1/1 z-[2] md:w-3/4 my-10 p-3">

      {response?.err ? 'ارور' :


          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
          {loading == false ? response.map((elm :any)=>(
            <MiniProduct AuthorId={elm?.authorID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName} sendFrom={elm?.city?.name} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name} title={elm?.title}  />
          )) : null}

          </div>

        }
      </div>
    </main>
  </>
  )
}  

export default Page