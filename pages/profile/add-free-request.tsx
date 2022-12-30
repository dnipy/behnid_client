import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";


const Page : NextPage = ()  => {

    
  const [packtype,setPacktype] = React.useState<string>('vanet')
  const [categorie,setCategory] = React.useState<Array<any>>([])
  const [loading,setloading] = React.useState(true)
  const [cat,setCat] = React.useState('')
  const [deliveryTime,setDeliveryTime] = useState('')
  const [City,setCity] = React.useState<string>('تهران')
  const [cities,setCities]= React.useState([])
  const [response,setResponse]= React.useState<any>('')
  const [error,setError] = React.useState('')

  //forms
  const [title,setTitle] = useState('')
  const [describe,setDescribe] = useState('')
 


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


  useEffect(()=>{
    ApiRequest
        .get('/categories/all-city')
        .then((res) => {
            console.log(res)
            setCities(res.data);
            console.log(City)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });

  },[])

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    setCity(e.target.value)
  }


  const handleSend = async()=>{
      setloading(true)
      setError('')
      setResponse('')
      const body = {
        name : title,
        describe,
        catName : cat,
        City 
    }
    console.log(body)

    AuthorizedApiRequest
    .post('/requests/FreeRequest',body)
    .then((res) => {
        if (res.data.err) {
            setError(res.data.err)
        }
        else {
            setResponse(res.data.msg);
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


  return (
    <>
    <div>

    <div  className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">افزودن درخواست</h3>
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {response ? <p  className="text-green-400 text-right">{response}</p>: null}


                <div className="mt-4">
                      <div>
                        <label className="text-right block" htmlFor="email">نام درخواست</label>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="درخواست یک تن رب گوجه"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                      </div>


                      <div className="mt-4">
                            <label  className="text-right block">توضیحات</label>
                                    <textarea value={describe}  onChange={(e)=>setDescribe(e.target.value)} className="resize-y w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"></textarea>
                                    
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

                        <div className="mt-4">
                            <div>
                                <label  className="text-right block pb-2">*شهر</label>
                                <select value={City} onChange={handleChangeCity} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                        {cities.map((elm : any)=>(
                                            <option value={elm.name} key={elm.id} >{elm.name}</option>
                                            ))}
                                </select>
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