import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRequest } from "../../clients/axios";
import { Product } from "../../components/blog";
import {ErrorComponent} from "../../components/error";
import Footer from "../../components/footer";
import Navbar from "../../components/Navbar";
import {Audio} from 'react-loader-spinner'
import FreeRequest from "../../components/freeRequest";
import { LoadingComponent } from "../../components/loading";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";
import { BACK_END } from "../../clients/localStorage";


const Page : NextPage = ()  => {
  const router = useRouter()

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const {id} = router.query


  useEffect(()=>{

    if(!id){
      return
    }

    
    setError('')
    setResponse([])
    setloading(true)



    ApiRequest
    .get(`/sellers/single?SellerID=${id}`)
    .then((res) => {        
        if (res.data.err) {
          setError(res.data.err)
          console.log(res.data.err)
          router.replace('/404')

        } 
        else {
          setResponse(res.data);
          console.log(res.data)
        }
    })
    .catch((err) => {
      console.log(err)
      router.replace('/404')
    })
    .finally(() => {  
      setloading(false);
    });
  
},[id])


  return (
    <>
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">
   
      {error ? <ErrorComponent  details={error} /> : null}

      {loading ?
          <LoadingComponent/>
        :
      <>
      {response ?   
      <>  
      <div className="flex justify-center" >
        <div className="w-full  my-36 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg ">
      <div className="flex justify-end px-4 pt-4">
          <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
              <span className="sr-only">Open dropdown</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
          </button>
      
          <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow " data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" >
              <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Edit</a>
              </li>
              <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
              </li>
              <li>
                  <a href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
              </li>
              </ul>
          </div>


      </div>
      <div className="flex flex-col items-center pb-2">
          <img className="mb-3 p-2 w-24 h-24 rounded-full shadow-lg" src={ response?.avatar ? `${BACK_END}${response.avatar}` : "https://myket.ir/app-icon/prof.com.wtpic22_cfebf8bb-fa14-4277-8f23-d8183faf76bc.png"} alt="user image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">{response?.Author?.name}</h5>
          <div className="flex  justify-around">
            
            <div className="px-2">
              <b>محصولات</b>
              <br/>
              <p className="text-center">{response.products ? response.products.length : 0}</p>
            </div>

            <div className="px-2">
              <b>درخواست ها</b>
              <br/>
              <p className="text-center">{response.freeRequests ? response.freeRequests.length : 0}</p>
            </div>

            <div className="px-2">
              <b>بازدید</b>
              <br/>
              <p className="text-center">{response.products ? response.products.length : 0}</p>

            </div>

          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
              <a href={`/chat/new-chat?id=${response.id}`} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-orange-400  rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none">ارسال پیام</a>
              {/* <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-orange-400  rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 ">اطلاعات تماس</a> */}
          </div>
      </div>

      <div className="inline-flex justify-center items-center w-full">
          <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0"/>
          <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 ">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-700 " viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
          </div>
      </div>



      <div className="my-4">
        <h3 className="text-center text-xl pb-5">{response?.name}</h3>
        <h3 className="text-center pt-1 text-md"> { response?.date ? 
                        MiladiToShamsi( Number((response?.date as string).slice(0,4))  , Number((response?.date as string).slice(5,7))  , Number((response?.date as string).slice(8,10))  )  

        : '-'} <b>تاریخ</b> </h3>
        <h3 className="text-center pt-1 text-md"> <b>شهر</b> : { response?.cityName  ? response.cityName   :  'تنظیم نشده'}  </h3>
        <h3 className="text-center pt-1 text-md"> <b>دسته بندی</b> : { response?.categorie  ? (response.categorie as Array<any>).at(0).name : 'تنظیم نشده'}  </h3>


        <p className="text-center p-4 text-sm">
            {response?.bio ? response.bio : '- : ' } 
            <b> بیوگرافی </b>
        </p>
      </div>


        </div>
      </div>

      <div>
          <h3 className="bg-orange-400 text-center hover:bg-orange-500 text-white font-bold py-2 mb-5 mt-5 px-4 rounded-full">
              محصولات
          </h3>
          <div dir="rtl" className="flex flex-wrap  gap-x-5 justify-center  ">
              {response?.products ? response?.products.map((elm :any)=>(
              <Product price={elm?.price} authorID={elm?.author?.id} city={elm?.city?.name  ? elm.city.name : 'کل ایران'} author={response?.name}  id={elm?.id} key={elm?.id} title={elm?.title} describe={elm?.describe} freeDelivery={elm?.freeDelivery} image={elm?.image ? `${BACK_END}${elm.image}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} />
              )) : <p className="text-center">محصولی موجود نیست</p>}
          </div>

      </div>


      <div>

        <h3 className="bg-orange-400 text-center hover:bg-orange-500 text-white font-bold py-2 px-4 mb-5 mt-10  rounded-full">
          درخواست ها
        </h3>
        <div dir="rtl" className="flex-row justify-around">
          {response?.freeRequests ? response?.freeRequests.map((elm :any)=>(
            <FreeRequest  id={elm.id} quantity={elm.quantity as string} key={elm.id as number} name={elm?.name  ? elm?.name : '-'} describe={elm?.describe as string} authorName={elm?.name} catName={ elm.categorie.length > 0 ?  elm.categorie[0].name as string : 'نامشخص'} cityName={elm.city?.name as string} />
            )) : <p className="text-center">محصولی موجود نیست</p>}
        </div>

      </div>








      </>
      :
      null

      }
      </>

  }

      </div>
    </main>
    <Footer/>

  </>
  )
}  

export default Page