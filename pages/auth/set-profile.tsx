import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from '../../clients/axios';

function Login() {
    const [fields,setFields] = useState({name : '' ,email : '',password : '',cpassword:''})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const [usersession,setUserSession] = useState<string | null>(null)

    
    
    console.log(usersession)
    const sendHandle = async()=>{
            if (fields.password === fields.cpassword){

                let fData = {password : fields.password , name : fields.name , email : fields.email}
                console.log({fData})
                await AuthorizedApiRequest
                .post('/auth/profile-setup',fData)
                .then((res) => {
                    console.log(res)
                    setResponse(res.data)
                    if(res.data.msg) {
                        Router.replace('/auth/set-profile-two')
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
                setError('پسورد وارد شده باید مساوی باشد')
            }

    }




  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">تکمیل اولیه پروفایل</h3>
                

                    <div className="mt-4">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }

                        <div>
                            <label className="block" htmlFor="email">نام کاربری</label>
                                    <input type="text" placeholder="دانیال"
                                        value={fields.name}
                                        onChange={(e)=>{
                                            setFields({
                                                name : e.target.value,
                                                email : fields.email,
                                                password: fields.password,
                                                cpassword : fields.cpassword
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="my-3">
                            <label className="block">ایمیل</label>
                                    <input type="email" placeholder="example@gmail.com"
                                        value={fields.email}
                                        onChange={(e)=>{
                                            setFields({
                                                name : fields.name,
                                                email : e.target.value,
                                                password: fields.password,
                                                cpassword : fields.cpassword
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>

                        <div>
                            <label className="block" htmlFor="email">کلمه عبور</label>
                                    <input type="text" placeholder="password"
                                        value={fields.password}
                                        onChange={(e)=>{
                                            setFields({
                                                name :  fields.name ,
                                                email : fields.email,
                                                password: e.target.value,
                                                cpassword : fields.cpassword
                                            })
                                         }
                                        }
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div  className="my-3">
                            <label className="block" htmlFor="email">تکرار کلمه عبور</label>
                                    <input type="text" placeholder="password"
                                        value={fields.cpassword}
                                        onChange={(e)=>{
                                            setFields({
                                                name :  fields.name ,
                                                email : fields.email,
                                                password: fields.password,
                                                cpassword : e.target.value
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