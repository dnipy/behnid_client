import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function Login() {
    const [fields,setFields] = useState({phone : '' , code : ''})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const {login} = useContext(AuthContext)


    useEffect(()=>{
        console.log({phone : window.localStorage.getItem('phone-number')})
        setFields({...fields,phone :  window.localStorage.getItem('phone-number') as string  })
    },[])


    const sendHandle = async()=>{
            let fData = {phone : fields.phone ,code : fields.code}
            console.log({fData})
            await ApiRequest
                .post('/auth/register-confirm',fData)
                .then((res) => {
                    console.log({res})
                    setResponse(res.data)
                    if (res.data.accessToken){
                        localStorage.setItem('user-session',JSON.stringify(res.data?.accessToken))
                        login(res.data?.accessToken)

                        setTimeout(()=>{
                            Router.replace('/auth/set-profile')
                        },1500)
                    }
                    else {
                        setError(res?.data?.err)
                        console.log(res.data?.err)
                    }
                })
                .catch((err) => {
                    setError('500');
                })
                .finally(() => {
                    setloading(false);
                })

    }

  return (
    <div>
        

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">تایید شماره تلفن</h3>
             

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }

                      
                        <div className="my-3">
                            <label className="block">کد ۶ رقمی دریافت شده</label>
                                    <input type="number" placeholder="123456"
                                      
                                        maxLength={6}
                                        value={fields.code}
                                        onChange={(e)=>setFields({phone : fields.phone ,code : e.target.value})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">تایید</button>
                            {/* <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><a href='/'> بازگشت  </a></button> */}
                        
                     
                    </div>
            
            </div>
        </div>

    </div>
  )
}

export default Login