import { NextPage } from "next";
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import Router, { useRouter } from "next/router";
import Link from "next/link";


const Page : NextPage = ()  => {

  return (
    <>
        <div className="">
             <FirstStep  />
        </div>
    </>
  )
}  




//title  desc price send_area min_order max_order city customer_price prudocer_price pack_type delivery time weight image

function FirstStep() {
  const [packtype,setPacktype] = React.useState<string>('vanet')
  const [categorie,setCategory] = React.useState<Array<any>>([])
  const [loading,setloading] = React.useState(true)
  const [cat,setCat] = React.useState<string>('مواد غذایی')
  const [response,setResponse]= React.useState<any>('')
  const [error,setError] = React.useState('')

  //forms
  const [title,setTitle] = useState('')
  const [describe,setDescribe] = useState('')
  const [price,setPrice] = useState<string | number | readonly string[] | undefined>()
  const [sendArea,setSendArea] = useState('')
  const [minOrder,setMinOrder] = useState<string | number | readonly string[] | undefined>()
  const [customerPrice,setCustomerPrice] = useState<string | number | readonly string[] | undefined>()
  const [producerPrice,SetProducerPrice] = useState<string | number | readonly string[] | undefined>()
  const [weight,setWeight] = useState('')
  const [deliveryTime,setDeliveryTime] = useState('')
  const [City,setCity] = React.useState<string>('اسکو')
  const [cityID,setCityId] = useState(1)
  const [cities,setCities]= React.useState([])


  const router = useRouter();
  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  useEffect(()=>{
        ApiRequest
            .get('/categories/all')
            .then((res) => {
                setCategory(res.data);
                console.log(res.data)
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

  const handleChangepack = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      console.log(packtype)
      setPacktype(e.target.value)
      console.log(packtype)
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    setCity(String(e.target.value))
    setCityId(Number(e.target.value.split(',').at(1)))
    console.log(City)
    // console.log(e.target.value.split(',').at(1))
  }

  const handleSend = async()=>{
      setloading(true)
      setError('')
      setResponse('')
      const body = {
        title,
        describe,
        price,
        sendArea,
        packType : packtype,
        minOrder,
        customerPrice,
        producerPrice,
        weight,
        deliveryTime,
        catName : cat,
        City : cityID
        
    }
    console.log(body)

    if (!body.title || !body.price || !body.sendArea || !body.minOrder || !body.customerPrice || !body.producerPrice || !body.weight ){
        setError("فیلد های دارای * اجباری هستند")
        return
    }


    if (!body.catName) {
        setError('لطفا دسته بندی را انتخاب کنید')
        return
    }
    console.log(body)

    AuthorizedApiRequest
    .post('/products/add',body)
    .then((res) => {
        if (res.data.err) {
            setError(res.data.err)
        }
        else {
            setResponse(res.data.msg);
            Router.push(`/profile/add-product-images?id=${res.data.id}`)
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
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg my-16">
                <h3 className="text-2xl font-bold text-center">افزودن محصول</h3>
                {/* <form > */}
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {response ? <p  className="text-red-400 text-right">{response}</p>: null}
                    <div dir="rtl" className="mt-4">
                        <div>
                            <label className=" text-right block" htmlFor="email">*نام محصول</label>
                                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="رب گوجه چین چین"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="mt-4">
                            <label  className="text-right block">توضیحات</label>
                                    <textarea value={describe} onChange={(e)=>setDescribe(e.target.value)} className="resize-y w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"></textarea>
                                    
                        </div>

                        <div className="mt-4">
                            <label  className="text-right block">*قیمت به تومان</label>
                                    <input value={price} onChange={(e)=>setPrice(e.target.valueAsNumber)} type="number" placeholder="200000"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    
                        </div>

                        <div className="mt-4">
                            <label className=" text-right block" htmlFor="email">*محدوده ارسال</label>
                                    <input value={sendArea} onChange={(e)=>setSendArea(e.target.value)} type="text" placeholder="کرج و تهران"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>


                        <div className="mt-4">
                            <label className=" text-right block" htmlFor="email">زمان ارسال</label>
                                    <input value={deliveryTime} onChange={(e)=>setDeliveryTime(e.target.value)} type="text" placeholder="دو روز کاری"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">حداکثر فروش</label>
                                        <input  type="number" placeholder="10000"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    

                                    <div>
                                        <label  className="text-right block">*حداقل فروش</label>
                                        <input value={minOrder} onChange={(e)=>setMinOrder(e.target.valueAsNumber)} type="number" placeholder="10"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                        </div>


                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">*قیمت فروشنده</label>
                                        <input value={producerPrice} onChange={(e)=>SetProducerPrice(e.target.valueAsNumber)} type="number" placeholder="20050"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    

                                    <div>
                                        <label  className="text-right block">*قیمت خریدار</label>
                                        <input value={customerPrice} onChange={(e)=>setCustomerPrice(e.target.valueAsNumber)} type="number" placeholder="21000"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">*وزن به کیلوگرم</label>
                                        <input value={weight} onChange={(e)=>setWeight(e.target.value)} type="number" placeholder="2"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    
                                
                                    <div className="mx-1" style={{width : '14rem'}}>
                                            <label  className="text-right block">*نوع بسته بندی</label>
                                            <select value={packtype} onChange={handleChangepack} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                                <option value='vanet' >وانت</option>
                                                <option value='camiun'>کامیون</option>
                                                <option value='kg'>کیلویی</option>
                                            </select>
                 
                                    </div>
                        </div>


                        <div className="mt-4">
                                    <div>
                                            <label  className="text-right block">*دسته بندی</label>
                                            <select value={cat} onChange={(e)=>{
                                                console.log(e.target.value);
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
                                <select  value={City} onChange={handleChangeCity} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                        {cities.map((elm : any)=>(
                                            <option  id={elm.id} value={[elm.name,elm.id]} key={elm.id} >{elm.name}</option>
                                         ))}
                                </select>
                            </div>
                        </div>
                        
                            <button onClick={handleSend} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">ادامه</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت</Link></button>
                        
                       
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}







export default Page