import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AllChats from "../../features/components/chats/all-chats";
import ChatDetailes from "../../features/components/chats/chat-detailes";


const Page : NextPage = ()  => {
  const router = useRouter()
  useEffect(()=>{
    const data = localStorage.getItem('user-session')
    if (!data) router.replace('/')
},[])
return (
  <>

  <main dir="rtl" className="flex justify-center items-center h-screen">
      <div className="w-full lg:max-w-7xl   ">


        <div className="bg-beh-bg flex flex-row mx-auto gap-10 px-2 min-w-[350px]  ">          
          <ChatDetailes shouldBeOpened={true} />


          <AllChats shouldBeOpened={false} />
        </div>

      </div>
  </main>
  </>
  )
}  
    
    export default Page