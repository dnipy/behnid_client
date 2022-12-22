import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest } from "../../clients/axios";
import {Product} from "../../components/blog";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import { LoadingComponent } from "../../components/loading";
import Navbar from "../../components/Navbar";
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
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? 'ارور' :

      <div dir="rtl" className="flex flex-wrap min-h-screen  ">
        {loading == false ? response.map((elm :any)=>(
          <Product price={elm?.price} city={elm?.city?.name  ? elm.city.name : 'ایران'} author={elm.author.name} authorID={elm.author.id}  id={elm.id} key={elm.id} title={elm.title} describe={elm.describe} likes={elm.likes} image={elm?.image ? `https://behnid.com${elm.image}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} />
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