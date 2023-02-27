import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { BACK_END } from "../../clients/localStorage";
import { AuthContext } from "../../contexts/Auth";
import AllChats from "../../features/components/chats/all-chats";
import ChatDetailes from "../../features/components/chats/chat-detailes";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";

const Page : NextPage = ()  => {
  const [response, setResponse] = useState<Array<any>>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [id,setId] = useState<number | undefined>()
  const router = useRouter()
  const NoImg = `${BACK_END}/uploads/chat_image_1672439444536.png`

 

  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  return (
    <>
    <main dir="rtl" className="flex justify-center items-center h-screen">
        <div className="w-full lg:max-w-7xl   ">


          <div className="bg-beh-bg flex flex-row mx-auto gap-10 px-2 min-w-[350px]  ">          
            <div className={`h-[90vh] md:h-[80vh]  hidden lg:block mt-[12vh]  lg:basis-2/3   mx-auto  bg-white rounded-3xl`}>
              <div className="w-full h-full flex justify-center items-center">
                <div>
                  <h1 className="text-xl text-beh-gray-mid-ligth cursor-default font-[400]">انتخاب گفت و گو</h1>
                </div>
              </div>
            </div>


            <AllChats shouldBeOpened={true} />
          </div>

        </div>
    </main>
    </>
  )
}  



export default Page