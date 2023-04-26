import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios'
import ErrorComponent from '../../components/alerts/error'
import { LoadingComponent } from '../../components/loading'

function NewChat() {
    const router = useRouter()
    const {id} = router.query
    const [error , setError] = useState("")

    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])


    useEffect(()=>{
        if (!id) {
            return
        }
        
        else {
            console.log({id})
            AuthorizedApiRequest
                .post('/chats/newChat',{userID : Number(id)})
                .then((res) => {
                    console.log({res})
                    if (res.data.err || res.data.e) {
                        console.log(res.data.err || res.data.e)
                        // router.replace('/500')
                    setError(res.data?.err ? res?.data?.err : 'مشکلی پیش آمده')

                    }
                    else {
                        if (res.data?.id) {
                            router.replace(`/chat?id=${res?.data?.id}`)
                        }
                        else if (res.data?.message as Array<any>) {
                            if ((res.data.message as Array<any>).at(0)) {
                                router.replace(`/chat?id=${  (res.data.message as Array<any>).at(0)?.chatID  }`)
                            }
                        }
                    }
                })
                .catch((err) => {
                    // router.replace('/500')
                    setError('هنگام اتصال به سرور مشکلی پیش آمده است . لطفا دوباره تلاش کنید')
                })

            }
            
    },[id])

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
        {error && <ErrorComponent handle={setError} message={error} /> }
        <LoadingComponent /> 
    </div>
  )
}

export default NewChat