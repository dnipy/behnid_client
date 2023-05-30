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
import { NextSeo } from 'next-seo'
import ComponentLoading from "../../components/componentLoading";
  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [loadText, setLoadText] = useState('موارد بیشتر');
  const [listEnd,setListEnd] = useState(false)
  const [start,setStart] = useState(1)


  useEffect(()=>{
    setloading(true)
    ApiRequest
    .get(`/products/all?start=${start}`)
    .then((res) => {
      if (res.data.err) {
        setError(res.data?.err)
      }
      else {
        if (res.data?.length === 0) {
          setLoadText('موردی یافت نشد')
          // setStart(start - 10)
          setListEnd(true)
        }
        else {
          const NewData = res.data as [];
          const Data = response as [];

          NewData.forEach(elm=>{
            Data.push(elm)
          })
          

          setResponse(Data);

        }
        console.log(res.data)
      }
    })
    .catch((err) => {
      setError('خطا در ارتباط با سرور');
      // router.replace('/500')
    })
    .finally(() => {
      setloading(false);
    });
  
},[start])



  return (
    <>
    {loading ? <LoadingComponent/> : null}
    {error ? <ErrorComponent  details={'500'} /> : null}
    <Navbar_v2 />
    <NextSeo
      title="محصولات بهنید"
    />
    <main className="flex justify-center min-h-screen">
      <div className="w-1/1 md:w-3/4 my-10 p-3">


      {response?.err ? 'ارور' :

          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
          {loading == false ? response.map((elm :any)=>(
            <MiniProduct AuthorId={elm?.authorID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName} sendFrom={elm?.city?.name} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name} title={elm?.title}  />
          )) : null}


          </div>

        }
        <div className="w-full my-10 ">
          {
          loading 
          ? 
          <ComponentLoading />
          :
          <button disabled={listEnd}  className="text-center w-full cursor-pointer py-10" onClick={()=>setStart(start+10)}>{loadText}</button>
          }
        </div>
     

      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Page