import { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";


const Page : NextPage = ()  => {
    // const {isUser} = useContext(AuthContext)
    
    // if (isUser()) {
    //         Router.replace('/')
    // }
    
  const [loading,setloading] = React.useState(true)
  const [response,setResponse]= React.useState<any>('')
  const [error,setError] = React.useState('')
  const router = useRouter()
  const {id} = router.query
  const [idr,setIDr] = useState<number | undefined>()

  //forms
  const [file,setFile]=useState<FileList | null >(null)

    useEffect(()=>{
        if (!id) return
        setIDr(Number(idr as number))
        console.log(idr)
    })

  const handleSend = async()=>{
      setloading(true)
      setError('')
      setResponse('')
      const body = new FormData()
    //   body.append('product_image',)
    if(file?.item(0)){
        body.append('product_image',file.item(0) as Blob)
        console.log(file.item(0))
    
        AuthorizedApiRequestImage 
        .post(`/media/photo/product?productID=${id}`,body)
        .then((res) => {
            console.log(res)
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
                setResponse(res.data.msg);
               
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });


    }else {
        setError('فایل انتخاب کنید')
    }
  }

  if (response) {
      router.replace(`/products/${id}`)
  }

  return (
    <>
    <div>

    <div  className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">افزودن تصویر محصول</h3>
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {response ? <p  className="text-green-400 text-right">{response}</p>: null}


                <div className="mt-4">
                        <div className="mb-4">
                          <div className="flex w-full p-12 items-center justify-center bg-grey-lighter">
                              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-orange-500 hover:text-white">
                                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                  </svg>
                                  <span className="mt-2 text-base leading-normal">انتخاب تصویر</span>
                                  <input accept="image/png,image/jpg,image/jpeg" onChange={ (e)=>setFile(e.target?.files) } type='file' className="hidden" />
                              </label>
                          </div>
                        </div>
                    
                        <button onClick={handleSend} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">افزودن</button>
                        <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                </div>
                
          
        </div>
    </div>

    </div>
    </>
  )
}  

export default Page