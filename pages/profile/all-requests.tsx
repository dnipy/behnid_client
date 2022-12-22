import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import {LoadingComponent}  from "../../components/loading";
import Navbar from "../../components/Navbar";

const Page : NextPage = ()  => {

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/requests/my-req?start=1&length=9`)
    .then((res) => { 
      setResponse(res.data);
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setloading(false);
    });
  
},[])



  console.log(response)

  return (
    <>
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? <ErrorComponent  details={response?.err} /> : null }


<div className="flex justify-center my-16">
<div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8">
    
        <h5 className="text-xl font-bold text-center leading-none text-gray-900 ">درخواست های شما</h5>


   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">


          {response ? (response as Array<any>).map((elm)=>(
            <li key={elm.id} dir="rtl" className=" text-right mt-10 py-3 sm:py-4"  >
              <div className="flex items-center space-x-4">
                  {/* <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                  </div> */}
                  <div onClick={()=>Router.replace(`/requests/${elm.id}`)} className="flex-1 px-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                          {elm?.name}
                      </p>
                      <p className="text-sm px-2 text-gray-500 truncate ">
                          {elm?.describe ? `${(elm.describe as string ).slice(0,30)} ...`  : '...' }
                      </p>
                  </div>
                  <div onClick={()=>Router.replace(`/profile/change-free-requests?id=${elm.id}`)} className="inline-flex items-center text-base font-semibold cursor-pointer text-gray-900">
                      تغییر
                  </div>
              </div>
            {/* <hr className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"/> */}
        </li>
          )) : 'شما محصولی ندارید'}

        </ul>
   </div>
</div>

</div>      

      </div>
    </main>
    <Footer/>

  </>
  )
} 

export default Page