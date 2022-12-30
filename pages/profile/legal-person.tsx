import { NextPage } from "next";
import { ErrorComponent } from "../../components/error";
import { WarnComponent } from "../../components/warn";
import {useAuthorizedAxios} from "../../hooks/useAxios";
import StepWizard from "react-step-wizard";
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import Router, { useRouter } from "next/router";
import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "../../contexts/Auth";
import Link from "next/link";


const Page : NextPage = ()  => {

    const router = useRouter();
    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])


  return (
    <>
        <div className="">
             <FirstStep  />
        </div>
    </>
  )
}  




//title  desc price send_area min_order max_order city customer_price prudocer_price pack_type delivery time weight image

function FirstStep(props : any) {
    // const {isUser} = useContext(AuthContext)
    
    // if (isUser()) {
    //         Router.replace('/')
    // }
    const [loading,setloading] = React.useState(false)
    const [response,setResponse]= React.useState<any>('')
    const [error,setError] = React.useState('')

    const [file,setFile]=useState<FileList | null >(null)
    const [file2,setFile2]=useState<FileList | null >(null)
    const [file3,setFile3]=useState<FileList | null >(null)
    const [file4,setFile4]=useState<FileList | null >(null)


    const handleSend = async()=>{
        setloading(true)
        setError('')
        setResponse('')
        const body = new FormData()
      if(file?.item(0) && file2?.item(0) ){
          console.log(file,file2,file3,file4)
          body.append('company_1',file.item(0) as Blob)
          body.append('company_2',file2.item(0) as Blob)
          body.append('company_3',file3?.item(0) as Blob)
          body.append('company_4',file4?.item(0) as Blob)

      
          AuthorizedApiRequestImage 
          .post('/media/authorize/sellers/company',body)
          .then((res) => {
              console.log(res)
              if (res.data.err) {
                  setError(res.data.err)
                  console.log(res.data.err)
              }
              else {
                  setResponse('موفق');
                  console.log('ok',res.data)
                  Router.replace('/profile')
              }
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              setloading(false);
          });
  
  
      }else {
          setError('تصویر جواز و اساس نامه اجباری است')
      }
    }
 






  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg my-16">
                <h3 className="text-2xl font-bold text-center">فروشنده حقوقی</h3>
                {/* <form > */}
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {response ? <p  className="text-green-400 text-right">{response}</p>: null}
                    {loading ? <p  className=" text-right">منتظر بمانید</p>: null}

                    <div dir="rtl" className="mt-4">
                    <div className="px-8 py-6 mt-4 text-left ">
         



                            <div className="mt-6">
                                <div>
                                    <label className="text-right block" htmlFor="email">تصویر جواز تاسیس</label>
                                            <input  onChange={(e)=>setFile(e.target?.files)} type="file" accept="image/png,image/jpg,image/jpeg" placeholder="درخواست یک تن رب گوجه"
                                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                </div>


                                <div className="mt-6">
                                        <label className="text-right block" htmlFor="email">تصویر اساس نامه</label>
                                        <input onChange={(e)=>setFile2(e.target?.files)} type="file" accept="image/png,image/jpg,image/jpeg" placeholder="درخواست یک تن رب گوجه"
                                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                </div>

                                <div className="mt-6">
                                        <label className="text-right block" htmlFor="email">تصویر آخرین  تغییرات روزنامه رسمی</label>
                                        <input  onChange={(e)=>setFile3(e.target?.files)} type="file" accept="image/png,image/jpg,image/jpeg" placeholder="درخواست یک تن رب گوجه"
                                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                </div>


                                <div className="mt-6">
                                        <label className="text-right block" htmlFor="email">تصویر اجاره نامه یا سند مالکیت</label>
                                        <input  onChange={(e)=>setFile4(e.target?.files)} type="file" accept="image/png,image/jpg,image/jpeg" placeholder="درخواست یک تن رب گوجه"
                                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                </div>

                                
                                    <button  className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500" onClick={handleSend}>افزودن</button>
                                    <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/profile/become-seller'> بازگشت  </Link></button>
                            </div>
                            
                    
                    </div>
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}







export default Page