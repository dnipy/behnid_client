import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios';
import { AuthContext } from '../../contexts/Auth';

function ChangeDetaile() {
    const router = useRouter()
    // const {isUser} = useContext(AuthContext)
    
    // if (isUser()) {
    //         router.replace('/')
    // }
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
  
    const fetchData = () => {
        AuthorizedApiRequest
            .get('/profile/my-data')
            .then((res) => {
                setResponse(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                setError(err);
                router.replace('/500')        
            })
            .finally(() => {
                setloading(false);
            });
    };
  
    useEffect(() => {
        fetchData();
    }, []);
  

    const sendHandle = async ()=>{
        let fData = {
            profileName : response?.profile?.name ,
            address : response?.profile?.address,
            family : response?.profile?.family,
            workNumber: response?.profile?.workNumber,
            instaAcc: response?.profile?.instaAcc,
        }
        console.log({fData})
        await AuthorizedApiRequest
        .post('/profile/update',fData)
        .then((res) => {
            console.log(res)
            if (!res.data.err){
                router.replace('/profile')
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

    <>
    <div className='p-64 bg-gray-100'>

    { typeof response == 'object' ? 
    <div dir="rtl" className="bg-white p-3  rounded-lg shadow-lg text-right">
                    <div className="flex items-center justify-center pb-6 space-x-2 font-semibold text-gray-900 leading-8 ">
                        <span className="text-orange-400 px-1">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide text-center text-2xl px-1">توضیحات</span>
                    </div>
                    {loading ? 'loading' : 
                    <>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-1 text-sm">
                            
                            <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">نام</div>
                                {/* <div className="px-4 py-2">{response?.profile?.name ? response.profile.name : '-'}</div> */}
                                <input onChange={(e)=>setResponse({...response,profile:{...response.profile ,name : e.target.value}})} value={response?.profile?.name ? response.profile.name : ''} type='text' className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div>


                            
                            <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">نام خانوادگی</div>
                                {/* <div className="px-4 py-2">{response?.profile?.family ? response.profile.family : '-'}</div> */}
                                <input onChange={(e)=>setResponse({...response,profile:{...response.profile ,family : e.target.value}})} value={response?.profile?.family ? response.profile.family : ''} type='text' className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div>


                            
                            {/* <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">شهر</div>
                                <div className="px-4 py-2">{response.cityName ? response.cityName : '-'}</div>
                                <input type='text' className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div> */}


                        


                            
                            <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">آدرس</div>
                                {/* <div className="px-4 py-2">{response.profile.address ? (response.profile.address as string).slice(0,25) : '-'} ...</div> */}
                                <input onChange={(e)=>setResponse({...response,profile:{...response.profile ,address : e.target.value}})} type='text' value={response.profile?.address ? response.profile.address  : ''} className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div>


                            
                            <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">تماس محل کار</div>
                                {/* <div className="px-4 py-2">{response.profile.workNumber ? response.profile.workNumber : '-'}</div> */}
                                <input onChange={(e)=>setResponse({...response,profile:{...response.profile ,workNumber : e.target.value}})} type='number' value={response.profile?.workNumber ? response.profile.workNumber : ''} className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div>




                            <div className="grid grid-cols-5 py-2">
                                <div className="px-4 py-2 font-semibold">اکانت اینستا</div>
                                {/* <div className="px-4 py-2">{response.name ? response.name : '-'}</div> */}
                                <input onChange={(e)=>setResponse({...response,profile:{...response.profile ,instaAcc : e.target.value}})} value={response.profile?.instaAcc ? response.profile.instaAcc : ''} type='text' className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 col-span-3 ' />
                            </div>


                            



                        </div>
                    </div>
                    <button
                        onClick={sendHandle}
                        className="block w-full text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-400 hover:text-white focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        تایید تغییرات
                    </button>
                    </>

                }
                    </div>
                    : null }
        </div>
    </>
  )
}

export default ChangeDetaile