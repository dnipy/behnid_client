import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import Navbar from "../../components/Navbar";
import { WarnComponent } from "../../components/warn";
import {Building} from "../../components/mid-pages/Building"

const Page : NextPage = ()  => {
  const router = useRouter()
  const {id} = router.query
  const [comment,setComment] = useState('')
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    if(!id){
      return
    }
    setError('')
    setResponse([])
    setloading(true)
    ApiRequest
    .get(`/blog/single?BlogID=${id}`)
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
    })
    .finally(() => {
      setloading(false);
    });
  
},[id])



  const addComment = async()=>{ 
    await AuthorizedApiRequest.post('/comments/onProduct', {
      productID : id,
      message : comment
    }).then(res=>{
      if (res.data.msg) {
        router.replace(`/products/${id}`)
      }
      else{
        console.log(res.data)
      }
    }).catch(e=>{
      console.log(e)
    })
  }

  return (
    <>
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <WarnComponent details="در حال لود" /> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? <ErrorComponent  details={response?.err} /> : null }

      <h1 className="text-3xl font-bold ">
        page content
      </h1>

      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Building