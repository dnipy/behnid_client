import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  ApiRequest, AuthorizedApiRequest } from "../../../clients/axios";
import { BACK_END } from "../../../clients/localStorage";
import { ErrorComponent } from "../../../components/error";
import { LoadingComponent } from "../../../components/loading";
import Navbar from "../../../components/Navbar";
import { WarnComponent } from "../../../components/warn";
import { packTypeCheck } from "../../../utils/PackType";


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
    .get(`/products/single?id=${id}`)
    .then((res) => {

      if (res.data.err) {
        setError(res.data.err)
        router.replace('/404')
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
  
},[id])



  const addComment = async()=>{ 
    await AuthorizedApiRequest.post('/comments/onProduct', {
      productID : id,
      message : comment
    }).then(res=>{
      if (res.data.msg) {
        console.log(res.data.msg)
      }
      else{
        console.log(res.data)
      }
    }).catch(e=>{
      console.log(e)
      router.replace('/500')
    })
  }


return (
    <> 
    <Navbar />
    <main dir="rtl" className="flex justify-center text-right">
      <div className="w-1/1 md:w-2/3 p-3">

      {loading ? <LoadingComponent/>: 
      <>

      {response?.err ? <ErrorComponent  details={response?.err} /> : null }

      <div className="my-10">


      <div dir="rtl" className="md:flex  items-start justify-center py-12 2xl:px-20 md:px-6 px-4">

      {error ? <ErrorComponent  details={'error'} /> :
      <>

<div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
  <img className="w-full" alt="image of a girl posing" src={response?.image ? `${BACK_END}${response.image}` : "https://archive.org/download/no-photo-available/no-photo-available.png" } />
  {/* <img className="mt-6 w-full" alt="image of a girl posing" src="https://i.ibb.co/qxkRXSq/component-image-two.png" /> */}
</div>
<div className="md:hidden">
<img className="w-full" alt="image of a girl posing" src={response?.image ? `${BACK_END}${response.image}` : "https://archive.org/download/no-photo-available/no-photo-available.png" } />
</div>
<div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:mr-6 md:mt-0 text-right mt-6">
  <div className="border-b border-gray-200 pb-6">
    <p className="text-sm leading-none text-gray-600 ssss:text-gray-300 ">{response?.author?.name }</p>
    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 ssss:text-white mt-2">{ response?.title }</h1>
  </div>
  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
    <p className="text-base leading-4 text-gray-800 ssss:text-gray-300">حداقل سفارش</p>
    <div className="flex items-center justify-center">
      <p className="text-sm leading-none text-gray-600 ssss:text-gray-300">{ response?.minOrder } </p>
    </div>
  </div>
  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
    <p className="text-base leading-4 text-gray-800 ssss:text-gray-300">قیمت</p>
    <div className="flex items-center justify-center">
      <p className="text-sm leading-none text-gray-600 ssss:text-gray-300 mr-3">{response?.price} تومان </p>
     
    </div>
  </div>

  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
    <p className="text-base leading-4 text-gray-800 ssss:text-gray-300">نوع بسته بندی</p>
    <div className="flex items-center justify-center">
      <p className="text-sm leading-none text-gray-600 ssss:text-gray-300 mr-3">{  packTypeCheck(response?.packType)}</p>
     
    </div>
  </div>

  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
    <p className="text-base leading-4 text-gray-800 ssss:text-gray-300">دسته بندی</p>
    <div className="flex items-center justify-center">
      <p className="text-sm leading-none text-gray-600 ssss:text-gray-300 mr-3">{response?.categorie?.at(0) ?  response?.categorie?.at(0).name : '-'}</p>
     
    </div>
  </div>
  <button onClick={()=>router.replace(`/products/${response?.id}/reply`)} className="ssss:bg-white my-1 ssss:text-gray-900 ssss:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
    سفارش
  </button>
  <button onClick={()=>router.replace(`/chat/new-chat?id=${response?.author?.id}`)} className="ssss:bg-white my-1 ssss:text-gray-900 ssss:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 text-base flex items-center justify-center leading-none text-white bg-orange-500 w-full py-4 hover:bg-orange-600 focus:outline-none">
    پیام 
  </button>
  <div dir="rtl" className="text-right">
    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7">{ response?.describe }</p>

    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7">  <b> تحویل در </b>: { response?.deliveryTime }</p>
    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7"> <b> قیمت خریدار </b>: { response?.customerPrice } تومان </p>
    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7">  <b> قیمت فروشنده </b> : { response?.producerPrice } تومان</p>
    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7"> <b> محدوده ارسال </b> : { response?.sendArea }</p>
    <p className=" text-base lg:leading-tight pb-5 leading-normal text-gray-600 ssss:text-gray-300 mt-7"> <b> وزن </b> : { response?.weight }</p>

 
  </div>











</div>
</>
}
</div>

<div className="inline-flex justify-center items-center w-full">
    <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 ssss:bg-gray-700"/>
    <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 ssss:bg-gray-900">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-700 ssss:text-gray-300" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
    </div>
</div>



{/* 
add-comment
*/}



{/* {error ? null : 
<div className="flex  items-center justify-center h-64 shadow-lg  mx-8 my-10">
        <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <h2 dir='rtl' className="px-3 pt-3 pb-2 text-gray-800  text-right text-lg">افزودن نظر</h2>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea className="bg-gray-50 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" dir='rtl' placeholder='نظر شما ...؟'  value={comment} onChange={(e)=>setComment(e.target.value)} required></textarea>
                </div>
                <div dir='rtl' className="w-full md:w-full flex items-start  pt-3 px-3">

                     <div className="-ml-1">
                        <button onClick={addComment}  type='submit'  className="bg-orange-500 text-white font-medium py-1 px-4 border  rounded-lg tracking-wide mr-1 hover:bg-orange-500" > افزودن نظر </button>
                    </div>
                    <div className="flex items-end w-1/2 text-gray-700 pt-2 px-2 mr-auto">
                        <p className="text-xs md:text-sm pt-px">نظر شما قابل تغییر نمیباشد</p>
                        <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> 
                        </svg>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
} */}

{
  response?.comments ?( response?.comments as Array<any>).map(elm=>(
      <div key={elm?.id} dir="rtl" className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-sm">
                <div className="relative flex gap-4">
                    <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"/>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{elm?.commentAuthor?.name}</p>
                            <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                        </div>
                        <p className="text-gray-400 text-sm">{ (elm?.date as string).slice(0,10) }</p>
                    </div>
                </div>
                <p className="-mt-4 px-10 text-gray-500">{elm?.message}</p>
      </div>  
  )   ) 
  : <p className="text-center">نظری موجود نیست</p>
}



      </div>
      
      </>
}
      </div>
    </main>
    {/* <Footer/> */}
  </>
  )
}  



export default Page




