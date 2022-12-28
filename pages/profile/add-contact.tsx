import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function AddContact() {
    const [fields,setFields] = useState({phone : '' , pass : ''})
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    
    


    const sendHandle = async()=>{
            if (!fields.phone || !fields.pass){
                setError('لطفا اطلاعات را کامل کنید')
                return
            }
            setError('')
            let fData = {contactNumber : fields.phone ,contactName : fields.pass}
            console.log({fData})
            await AuthorizedApiRequest
                .post('/chats/add-contact',fData)
                .then((res) => {

                    if (res.data.msg){
                    console.log(res.data)
                    setResponse("اضافه شد")
                    Router.replace('/chat/my-contact')                  
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
                <h3 className="text-2xl font-bold text-center">افزودن مخاطب</h3>
                {/* <form action=""> */}

                    <div className="mt-4  ">
                     {error ? <p className='text-red-800 text-right' >{error}</p> : null }
                        <div>
                            <label className="block text-right">نام</label>
                                    <input dir='rtl' type="text" placeholder="محمد انگشبه"
                                        value={fields.pass}
                                        onChange={(e)=>setFields({phone: fields.phone , pass : e.target.value})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-right" htmlFor="email">شماره تلفن</label>
                                    <input dir='rtl' type="text" placeholder="09120001234"
                                        value={fields.phone}
                                        onChange={(e)=>setFields({phone: e.target.value , pass : fields.pass})}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>

                        </div>
                        
                            <button onClick={sendHandle} className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">افزودن</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}

export default AddContact