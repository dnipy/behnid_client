import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function Login() {

    const [fields,setFields] = useState({pass : '' , newPass : "" , newPassConfirm : ""})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const {login} = useContext(AuthContext)


    const router = useRouter();
    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])

    const sendHandle = async()=>{
            setResponse([])
            if (fields.newPass.length > 8) {
                setError('پسورد نباید کمتر از 8 رقم باشد')
                return
            }
            if (fields.newPass === fields.newPassConfirm){
                setError('')
                

                let fData = {password : fields.pass , newPassword : fields.newPass}
                console.log({fData})
                await AuthorizedApiRequest
                .post('/auth/change-password',fData)
                .then((res) => {
                    console.log(res)
                    if (!res.data.err){
                        setResponse(res.data)
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
            else {
                setError('پسورد جدید و تکرار آن باید مساوی باشد')
                console.log(fields.newPass,fields.newPassConfirm)
            }
        }



  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">ورود به حساب کاربری</h3>
                {/* <form action=""> */}

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }
                     {response.msg ? <p className='text-green-800 text-right' >{response.msg}</p> : null }

                        <div>
                            <label className="block" htmlFor="email">پسورد قدیمی</label>
                                    <input type="text" placeholder="09120001234"
                                        value={fields.pass}
                                        onChange={(e)=>setFields({pass : e.target.value , newPass : fields.newPass ,newPassConfirm : fields.newPassConfirm})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="mt-4">
                            <label className="block">پسورد جدید</label>
                                    <input type="password" placeholder="Password"
                                        value={fields.newPass}
                                        onChange={(e)=>setFields({pass: fields.pass , newPass : e.target.value , newPassConfirm : fields.newPassConfirm})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="mt-4">
                            <label className="block">تایید پسورد جدید</label>
                                    <input type="password" placeholder="Password"
                                        value={fields.newPassConfirm}
                                        onChange={(e)=>setFields({pass : fields.pass , newPass :fields.newPass , newPassConfirm : e.target.value})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">تغییر پسورد</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        
                        
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}

export default Login