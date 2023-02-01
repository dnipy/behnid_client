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
import Navbar from "../../components/Navbar";
import Navbar_v2 from "../../components/Navbar_v2";
import { WarnComponent } from "../../components/warn";

  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    ApiRequest
    .get(`/products/all?start=1&length=9`)
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
    <Navbar_v2 />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? 'ارور' :

      <div dir="rtl" className="flex flex-wrap min-h-screen gap-x-5 justify-center  ">
        {loading == false ? response.map((elm :any)=>(
          <Product price={elm?.price} city={elm?.city?.name  ? elm.city.name : 'ایران'} author={elm.author.name} authorID={elm.author.id}  id={elm.id} key={elm.id} title={elm.title} describe={elm.describe} freeDelivery={elm?.freeDelivery} image={elm?.image ? `${BACK_END}${elm.image}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} />
          )) : <Audio color='#fb923c' />}
      </div>

        }
      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Page