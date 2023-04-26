import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest } from "../../clients/axios";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import FreeRequest from "../../components/freeRequest";
import FreeRequestComponent from "../../components/FreeRequestComponent";
import {LoadingComponent} from "../../components/loading";
import Navbar from "../../components/Navbar";
import Navbar_v2 from "../../components/Navbar_v2";
import { NextSeo } from "next-seo";

const Page : NextPage = ()  => {
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


  console.log(response)

  return (
    <>
    <NextSeo
        title="درخواست ها"
      />
    {loading ? <LoadingComponent/> : null}
    {error ? <ErrorComponent  details={'500'} /> : null}
    <Navbar_v2 />
    <main className="flex justify-center ">
      <div className="w-1/1 md:w-3/4 my-10 p-3">


      {response?.err ? 'ارور' :

          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
                        { !loading && response ?  
        (response as Array<any>).map((elm)=>(
            <FreeRequestComponent  key={elm?.id} id={elm?.id} username={elm?.Author?.profile?.name ? elm?.Author?.profile?.name : "کاربر بدون نام"} describe={elm?.describe} date={elm?.request_expire_date} recive_location={elm?.city?.name } title={elm?.name} avatar={elm?.Author?.avatar} />
        ))
      : null}

          </div>

        }
      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Page

