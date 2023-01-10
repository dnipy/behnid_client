import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ApiRequest } from '../../clients/axios';


function Register() {
    const [fields,setFields] = useState({phone : ''})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);


    const sendHandle = async()=>{
            let fData = {phone : fields.phone }
            console.log({fData})
            await ApiRequest
                .post('/auth/register',fData)
                .then((res) => {
                    setResponse(res.data)
                  
                    if (res.data?.msg) {
                        window.localStorage.setItem('phone-number',fields.phone)
                        Router.replace('/auth/register-confirm')
                    }

                    if (res.data?.err){
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
                <h3 className="text-2xl font-bold text-center">ثبتنام</h3>
                {/* <form action=""> */}

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }
                        <div>
                            <label className="block" htmlFor="email">شماره تلفن</label>
                                    <input type="text" placeholder="09120001234"
                                        value={fields.phone}
                                        onChange={(e)=>setFields({phone: e.target.value })}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        
                        
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">ارسال تاییدیه</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        
                        <div className="flex items-baseline justify-between mt-2 ">
                            <Link href="/auth/login" className="text-sm text-orange-400 hover:underline px-2">ورود </Link>
                            <Link href="/auth/reset-password" className="text-sm text-orange-400 hover:underline px-2">فراموشی پسورد</Link>

                        </div>
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}

export default Register