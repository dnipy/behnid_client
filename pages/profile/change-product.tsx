import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function ChangeProduct() {

    const router = useRouter();
    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])
    
    const {id} = router.query
    const [comment,setComment] = useState('')
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
  const [categorie,setCategory] = React.useState<Array<any>>([])

    const [loading, setloading] = useState(true);
  
  
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

  const handleChangepack = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    setResponse({...response,packType : e.target.value})
}


    useEffect(()=>{
      if(!id){
        return
      }
      setError('')
      setResponse([])
      setloading(true)
      ApiRequest
      .get(`/products/single?id=${Number(id)}`)
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
        router.replace('/500')
      })
      .finally(() => {
        setloading(false);
      });
    
  },[id])

  const handleSend = async()=>{
    setloading(true)
    setError('')
    setResponse('')
    const body = {
      id : response.id ,
      title : response.title,
      describe : response.describe,
      price : Number(response.price),
      sendArea  : response.sendArea,
      packType : response.packtype,
      minOrder : response.minOrder,
      customerPrice : response.customerPrice,
      producerPrice : response.producerPrice,
      weight : response.weight,
      deliveryTime : response.deliveryTime,
      catName : response.cat,
  }

  if (!body.title || !body.price || !body.sendArea || !body.minOrder || body.customerPrice || !body.producerPrice || !body.weight ){
        setError("فیلد های دارای * اجباری هستند")
        return
    }


    if (!body.catName) {
        setError('لطفا دسته بندی را انتخاب کنید')
        return
    }
  console.log(body)

  AuthorizedApiRequest
  .post('/products/update',body)
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

const deleteProduct = (id : number)=>{
    AuthorizedApiRequest.post('/products/delete',{id})
    .then((res)=>{
      console.log(res.data)
      router.replace('/profile/all-products')
    }).catch(()=>{
        console.log('err at delete ticket')
    })
}

  return (
      <>
      {
          loading ? 'منتظر بمانید' : 
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg my-16">
                <h3 className="text-2xl font-bold text-center">تغییر محصول</h3>
                {/* <form > */}
                    {error ? <p  className="text-red-400 text-right">{error}</p>: null}
                    {/* {response ? <p  className="text-red-400 text-right">{response}</p>: null} */}
                    <div dir="rtl" className="mt-4">
                        <div>
                            <label className=" text-right block" htmlFor="email">نام محصول</label>
                                    <input value={response?.title} onChange={(e)=>setResponse({...response,title : e.target.value})} type="text" placeholder="رب گوجه چین چین"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="mt-4">
                            <label  className="text-right block">توضیحات</label>
                                    <textarea value={response?.describe} onChange={(e)=>setResponse({...response,describe : e.target.value})} className="resize-y w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"></textarea>
                                    
                        </div>

                        <div className="mt-4">
                            <label  className="text-right block">قیمت به تومان</label>
                                    <input value={response?.price} onChange={(e)=>setResponse({...response,price : e.target.value})} type="number" placeholder="200000"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    
                        </div>

                        <div className="mt-4">
                            <label className=" text-right block" htmlFor="email">محدوده ارسال</label>
                                    <input value={response?.sendArea} onChange={(e)=>setResponse({...response,sendArea : e.target.value})} type="text" placeholder="کرج و تهران"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>


                        <div className="mt-4">
                            <label className=" text-right block" htmlFor="email">زمان ارسال</label>
                                    <input value={response?.deliveryTime} onChange={(e)=>setResponse({...response,deliveryTime : e.target.value})} type="text" placeholder="دو روز کاری"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">حداکثر فروش</label>
                                        <input  type="number" value={10000} placeholder="10000"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    

                                    <div>
                                        <label  className="text-right block">حداقل فروش</label>
                                        <input value={response?.minOrder} onChange={(e)=>setResponse({...response,minOrder : e.target.value})} type="number" placeholder="10"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                        </div>


                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">قیمت فروشنده</label>
                                        <input value={response?.producerPrice} onChange={(e)=>setResponse({...response,producerPrice : e.target.value})} type="number" placeholder="20050"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    

                                    <div>
                                        <label  className="text-right block">قیمت خریدار</label>
                                        <input value={response?.customerPrice} onChange={(e)=>setResponse({...response,customerPrice : e.target.value})} type="number" placeholder="21000"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                                    <div>
                                        <label  className="text-right block">وزن به کیلوگرم</label>
                                        <input value={response?.weight} onChange={(e)=>setResponse({...response,weight : e.target.value})} type="number" placeholder="2"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                                    </div>
                                    
                                
                                    <div className="mx-1" style={{width : '14rem'}}>
                                            <label  className="text-right block">نوع بسته بندی</label>
                                            <select value={response?.packtype} onChange={handleChangepack} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                                <option value='vanet' >وانت</option>
                                                <option value='camiun'>کامیون</option>
                                                <option value='kg'>کیلویی</option>
                                            </select>
                 
                                    </div>
                        </div>


                        <div className="mt-4 ">
                                    <div>
                                            <label  className="text-right block">دسته بندی</label>
                                            <select value={response?.cat} onChange={(e)=>{
                                                setResponse({...response,cat : e.target.value})
                                            }} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600">
                                                
                                                {categorie.map((elm : any)=>(
                                                    <option value={elm.name} key={elm.id} >{elm.name}</option>
                                                ))}
                                                
                                               
                                            </select>
                                    </div>
                                    
                        </div>
                        
                            <button onClick={handleSend} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">ادامه</button>
                            <button onClick={()=>deleteProduct(response.id)}  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "> حذف </button>
                        
                       
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
    }
    </>
  )
}

export default ChangeProduct