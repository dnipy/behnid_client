import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";


const Page : NextPage = ()  => {

  const router = useRouter()
  const {id} = router.query
  const [packtype,setPacktype] = React.useState<string>('vanet')
  const [categorie,setCategory] = React.useState<Array<any>>([])
  const [loading,setloading] = React.useState(true)
  const [cat,setCat] = React.useState('')
  const [status,setStatus]= React.useState<any>('')
  const [response,setResponse]= React.useState<any>('')
  const [error,setError] = React.useState('')

  //forms
  const [title,setTitle] = useState('')
  const [describe,setDescribe] = useState('')
 

  useEffect(()=>{
    if(!id){
      return
    }

    
    setError('')
    setResponse([])
    setloading(true)

    ApiRequest
    .get(`/requests/single?id=${id}`)
    .then((res) => {        
        if (res.data.err) {
          if (res.data.err == 3){
            router.replace('/auth/login')
            console.log(res.data.err)
          }
          else {
            setError(res.data.err)
            console.log(res.data.err)
          }
        } 
        else {
          setResponse(res.data);
          console.log(res.data)
        }
    })
    .catch((err) => {
    //   setError(err);
    router.replace('/404')
      console.log(err)
    })
    .finally(() => {  
      setloading(false);
    });
  
},[id])


  useEffect(()=>{
        ApiRequest
            .get('/categories/all')
            .then((res) => {
                setCategory(res.data);
                console.log(categorie)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setloading(false);
            });
  },[])




  const handleSend = async()=>{
      setloading(true)
      setError('')
      setStatus('')
      const body = {
        name : response?.name,
        describe : response?.describe,
        quantity : response?.quantity
        // catName : cat,
    }
    console.log(body)

    AuthorizedApiRequest
    .post(`/requests/edit?id=${id}`,body)
    .then((res) => {
        if (res.data.err) {
            setError(res.data.err)
        }
        else {
            setStatus(res.data.msg);
            Router.push(`/requests`)
        }
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        setloading(false);
    });
  }


  const deleteRequest = (id : number)=>{
    AuthorizedApiRequest.post('/requests/delete',{id})
    .then((res)=>{
      console.log(res.data)
      if (res?.data?.err) {
          setError('خطا')
      }
      else {
          setStatus('موفق')
          router.replace('/profile')
        }
    }).catch(()=>{
        console.log('err at delete ticket')
    })
}

  return (
    <>
    {typeof(response) == 'object' ? 
    <div>

    <div  className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">تغییر درخواست</h3>
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {status ? <p  className="text-green-400 text-right">{status}</p>: null}


                <div className="mt-4">
                      <div>
                            <label className="text-right block" htmlFor="email">نام درخواست</label>
                                <input dir="rtl" value={response?.name} onChange={(e)=>setResponse({...response,name : e.target.value})} type="text" placeholder="درخواست یک تن رب گوجه"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                      </div>
                      <div>
                            <label className="text-right block" htmlFor="email">تعداد</label>
                                <input dir="rtl" value={response?.quantity} onChange={(e)=>setResponse({...response,quantity : e.target.valueAsNumber})} type="number" placeholder="درخواست یک تن رب گوجه"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                      </div>


                      <div className="mt-4">
                            <label  className="text-right block">توضیحات</label>
                                    <textarea dir="rtl" value={response?.describe}  onChange={(e)=>setResponse({...response,describe: e.target.value})} className="resize-y w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"></textarea>
                                    
                      </div>

                      <div className="mt-4 ">
                                    <div>
                                            <label  className="text-right block">دسته بندی</label>
                                            <select value={cat} onChange={(e)=>{
                                                setCat(e.target.value)
                                            }} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                                
                                                {categorie.map((elm : any)=>(
                                                    <option value={elm.name} key={elm.id} >{elm.name}</option>
                                                ))}
                                                
                                               
                                            </select>
                                    </div>
                                    
                        </div>
                    
                        <button onClick={handleSend} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">افزودن</button>
                        <button onClick={()=>deleteRequest(Number(response?.id))}  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "> حذف </button>
                </div>
                
          
        </div>
    </div>

    </div> 
    : 
    'loading'
                                                }
    </>
  )
}  

export default Page