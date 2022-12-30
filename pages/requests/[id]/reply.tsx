import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from '../../../clients/axios';


function Login() {
    const [fields,setFields] = useState({message : ''})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const router = useRouter();
    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])

    const sendHandle = async()=>{
        setResponse([])
          

                let fData = {message : fields.message}
                console.log({fData})
                await AuthorizedApiRequest
                .post('/tickets/add',fData)
                .then((res) => {
                    console.log(res)
                    if (!res.data.err){
                        setError('')
                        setResponse(res.data)
                        setFields({message : ''})
                    }
                    else {
                        setError(res.data.err)
                    }
                })
                .catch((err) => {
                    setError(err?.response?.data?.err);
                })
                .finally(() => {
                    setloading(false);
                })
                

        }



  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">پاسخ به درخواست</h3>
                {/* <form action=""> */}

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }
                     {response.msg ? <p className='text-green-800 text-right' >{response.msg}</p> : null }

                    
                        <div dir='rtl' className='text-right mt-4'>
                            <label className="block" htmlFor="email">متن تکمیلی</label>
                                    <textarea  placeholder="برای کرج , حداقل تا فردا , رنگ , ..."
                                        value={fields.message}
                                        onChange={(e)=>setFields({message : e.target.value})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/requests'> بازگشت  </Link></button>
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">ارسال</button>
                        
                        
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}

export default Login