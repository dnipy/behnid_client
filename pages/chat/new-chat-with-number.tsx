import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios'
import { LoadingComponent } from '../../components/loading'

function NewChat() {
    const router = useRouter()
    const {phoneNumber} = router.query

    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])


    useEffect(()=>{
        if (!phoneNumber) {
            return
        }
        
        else {
            console.log({phoneNumber})
            AuthorizedApiRequest
                .post('/chats/newChat-with-number',{userPhone : phoneNumber})
                .then((res) => {
                    console.log({res})
                    if (res.data.err) {
                        console.log(res.data.err)
                        // router.replace('/404')
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
                    router.replace('/500')
                })

            }
            
    },[phoneNumber])

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
        <LoadingComponent/>
    </div>
  )
}

export default NewChat