import Router, { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import {  AuthorizedApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function Login() {
    const {isUser} = useContext(AuthContext)
    

    
    const [fields,setFields] = useState({
        workNumber : 0 , 
        instaAcc : '' ,
        address : '' ,
        name : '',
        family : ''
    })
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
 


    const sendHandle = async()=>{
           

                let fData = fields
                console.log({fData})
                await AuthorizedApiRequest
                .post('/auth/profile-setup-two',fData)
                .then((res) => {
                    console.log(res)
                    setResponse(res.data)
                    if(res.data.msg) {
                        Router.replace('/profile?FirstTime=true')
                    }else {
                        setError(res.data?.err)
                    }
                })
                .catch((err) => {
                    setError(err?.response?.data?.err);
                })
                .finally(() => {
                    setloading(false);
                })
            
            // setError('پسورد وارد شده باید مساوی باشد')

    }




  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">تکمیل پروفایل</h3>
                

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }

                        <div dir='rtl'>
                            <label className="block text-right" htmlFor="email">نام</label>
                                    <input type="text" placeholder="دانیال"
                                        value={fields.name}
                                        onChange={(e)=>{
                                            setFields({
                                                ...fields,
                                                name : e.target.value
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div dir='rtl'>
                            <label className="block text-right" htmlFor="email">نام خانوادگی</label>
                                    <input type="text" placeholder="رحمانی"
                                        value={fields.family}
                                        onChange={(e)=>{
                                            setFields({
                                                ...fields,
                                                family : e.target.value
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div dir='rtl'>
                            <label className="block text-right" htmlFor="email">اکانت اینستا</label>
                                    <input type="text" placeholder="dnipy"
                                        value={fields.instaAcc}
                                        onChange={(e)=>{
                                            setFields({
                                                ...fields,
                                                instaAcc : e.target.value
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div dir='rtl'>
                            <label className="block text-right" htmlFor="email">آدرس</label>
                                    <textarea  placeholder="...."
                                        value={fields.address}
                                        onChange={(e)=>{
                                            setFields({
                                                ...fields,
                                                address : e.target.value
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div dir='rtl'>
                            <label className="block text-right" htmlFor="email">شماره تماس محل کار</label>
                                    <input type="number" placeholder="02133662545"
                                        value={fields.workNumber}
                                        onChange={(e)=>{
                                            setFields({
                                                ...fields,
                                                workNumber : e.target.valueAsNumber
                                            })
                                         }
                                        }
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