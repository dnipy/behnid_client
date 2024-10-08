import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest } from "../../clients/axios";
import ErrorComponent from "../../components/alerts/error";
import { NextSeo } from "next-seo";

const Page : NextPage = ()  => {
  const router = useRouter()

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const {id} = router.query

  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  useEffect(()=>{

    if(!id){
      return
    }

    
    setError('')
    setResponse([])
    setloading(true)



    ApiRequest
    .get(`/users/story?userID=${id}`)
    .then((res) => {        
        if (res.data.err) {
          setError(res.data.err)
          console.log(res.data.err)
        } 
        if (res.data?.role){
          res?.data?.role == 'Buyer' || res?.data?.role == 'Not-Found' ? router.push('/') : null
        }
        else {
          setResponse(res.data);
          console.log(res.data)
        }
    })
    .catch((err) => {
      // router.replace('/500')
      setError('خطا در اتصال به سرور');
    })
    .finally(() => {  
      setloading(false);
    });
  
},[id])
  return (
    <>
      <NextSeo
        title={`داستان`}
      />
    {error ? <ErrorComponent message={error} handle={setError} /> : null}

      <div className="bg-gray-900 h-screen w-screen ">
            <div className="max-w-sm  min-w-sm ml-auto mr-auto  h-screen bg-white">
                <div className="h-20 flex ">
                  <div className=" flex w-1/2">
                    <div className="w-1/3 h-full">
                      <div className="rounded-full h-16 w-16 ml-2 mt-2 bg-gray-900" >

                      </div>
                    </div>
                    <div className="2-2/3 h-20 py-7 pl-6 ">dnipy</div>
                  </div>
                  <div className="flex justify-end w-1/2 ">
                    <p className="m-7">
                      دقایقی پیش  
                    </p>
                  </div>
                </div>
            </div>
      </div>
    </>
  )
}  

export default Page