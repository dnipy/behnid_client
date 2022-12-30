import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import {MyProduct, MyProductOptions, MyProducts, Product} from "../../components/blog";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import { LoadingComponent } from "../../components/loading";
import Navbar from "../../components/Navbar";
import { WarnComponent } from "../../components/warn";
import { AuthContext } from "../../contexts/Auth";

 
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/products/mine?start=1&length=9`)
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
        {loading == false ? response.map((elm :any)=>{

          if (elm?.isShown) {
            return (
              <MyProducts price={elm?.price} city={elm?.city?.name  ? elm.city.name : 'ایران'} author={elm.author.name} authorID={elm.author.id}  id={elm.id} key={elm.id} title={elm.title} describe={elm.describe} freeDelivery={elm?.freeDelivery} image={elm?.image ? `https://behnid.com${elm.image}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} />
            )
          }
          
        
        }) : null}
      </div>

        }
      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Page