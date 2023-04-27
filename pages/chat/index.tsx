import { NextPage } from "next";
import  { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { BACK_END } from "../../clients/localStorage";
import { AuthContext } from "../../contexts/Auth";
import AllChats from "../../features/components/chats/all-chats";
import ChatDetailes from "../../features/components/chats/chat-detailes";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";
import { NextSeo } from "next-seo"
import { responeType } from "../../types/chats";
import {  ChatDetailesType } from "../../types/chat-datailes";

const Page : NextPage = ()  => {
  const [AllChatResponse , setAllChatResponse] = useState<responeType[]>([])
  const [DetaileResponse, setDetaileResponse] = useState<ChatDetailesType | null>(null);
  const [chatId,setChatId] = useState<number | null>(null)
  const router = useRouter();
  const {id} = router.query

  useEffect(()=>{
    if (!id) {
      setChatId(null)
      return
    }
    else {
      setTimeout(() => {
        setChatId(Number(id))
      }, 500);
    }
  },[id])
 

  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  return (
    <>
    <NextSeo title="گفت و گو" />
    <main dir="rtl" className="flex justify-center items-center h-screen">
        <div className="w-full lg:max-w-7xl   ">


          <div className="bg-beh-bg flex flex-row mx-auto gap-10 px-2 min-w-[350px]  ">          
            {
              chatId 
                ?
                <ChatDetailes  response={DetaileResponse} setResponse={setDetaileResponse} AllChatResponse={AllChatResponse} setAllChatResponse={setAllChatResponse} shouldBeOpened={chatId ? true : false} />
                : 
                <NoChatSelected />

            }
                {/* <ChatDetailes  response={DetaileResponse} setResponse={setDetaileResponse} AllChatResponse={AllChatResponse} setAllChatResponse={setAllChatResponse} shouldBeOpened={true} /> */}


            <AllChats response={AllChatResponse} setResponse={setAllChatResponse} DetaileResponse={DetaileResponse} setDetaileResponse={setDetaileResponse} shouldBeOpened={!chatId ? true : false} />
          </div>

        </div>
    </main>
    </>
  )
}  


const NoChatSelected = ()=>(
  <div className={`h-[90vh] md:h-[80vh]  hidden lg:block mt-[12vh]  lg:basis-2/3   mx-auto  bg-white rounded-3xl`}>
      <div className="w-full h-full flex justify-center items-center">
          <div>
            <h1 className="text-xl text-beh-gray-mid-ligth cursor-default font-[400]">انتخاب گفت و گو</h1>
          </div>
      </div>
    </div>
)


export default Page