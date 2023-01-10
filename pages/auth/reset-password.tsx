import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../clients/axios'

function Login() {
    const router = useRouter()
    const [fields,setFields] = useState({phone : '' })
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (data) router.replace('/')
    },[])




    
    const sendHandle = async()=>{

            setError('')
            let fData = {phone : fields.phone }
            console.log({fData})
            
            await ApiRequest
                .post('/auth/reset-password',fData)
                .then((res) => {
                    console.log(res)
                    if (res.data.msg){
                        router.replace('/auth/login')
                    }
                    else {
                        setError(res?.data?.err)
                    }

                })
                .catch((err) => {
                    setError('500');
                    console.log(err)
                })
                .finally(() => {
                    setloading(false);
                })

    }
    
  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">بازیابی پسورد</h3>
                <form action="">

                    <div className="mt-4">
                            <div className='mb-3'>
                                <label className="block" htmlFor="email">شماره تلفن</label>
                                        <input type="text" placeholder="09120001234"
                                            onChange={(e)=>{
                                                setFields({phone : e.target.value})
                                            }}
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                            </div>
                        
                        
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">بازیابی پسورد</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        

                    </div>
                    
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login