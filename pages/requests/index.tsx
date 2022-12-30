import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest } from "../../clients/axios";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import FreeRequest from "../../components/freeRequest";
import {LoadingComponent} from "../../components/loading";
import Navbar from "../../components/Navbar";

const Page : NextPage = ()  => {
  const router = useRouter()

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    ApiRequest
    .get(`/requests/all?start=1&length=9`)
    .then((res) => {
      setResponse(res.data);
    })
    .catch((err) => {
      setError(err);
      router.replace('/500')

    })
    .finally(() => {
      setloading(false);
    });
  
},[])



  console.log(response)

  return (
    <>
    <Navbar />
    <main className="flex justify-center min">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? <ErrorComponent  details={response?.err} /> : null }

      <div dir="rtl" className="flex flex-wrap gap-x-10 h-screen ">
        { typeof response?.err === 'undefined' ? (response as Array<any>).map( (elm : any)=>(
            <FreeRequest  id={elm.id} quantity={elm.quantity as string} key={elm.id as number} name={elm?.name as string} describe={elm?.describe as string} authorName={elm?.Author?.name as string} catName={(elm?.categorie as Array<any>).at(0) ? (elm?.categorie as Array<any>).at(0)?.name  :   'نامشخص'} cityName={elm.city?.name as string} />
        ))
          : null
      }
      </div>

      </div>
    </main>
    <Footer/>

  </>
  )
}  

export default Page