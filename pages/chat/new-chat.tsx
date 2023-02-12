import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios'

function NewChat() {
    const router = useRouter()
    const {id} = router.query

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
                    if (res.data.err) {
                        console.log(res.data.err)
                        // router.replace('/404')
                    }
                    else {
                        if (res.data?.id) {
                            router.replace(`/chat/${res?.data?.id}`)
                        }
                        else if (res.data?.message as Array<any>) {
                            if ((res.data.message as Array<any>).at(0)) {
                                router.replace(`/chat/${  (res.data.message as Array<any>).at(0)?.chatID  }`)
                            }
                        }
                    }
                })
                .catch((err) => {
                    router.replace('/500')
                })

            }
            
    },[id])

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
        
    </div>
  )
}

export default NewChat