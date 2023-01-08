import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";
import { BiUserPin,BiSend } from "react-icons/bi"
import { BACK_END } from "../../clients/localStorage";

const Page : NextPage = ()  => {
    const router = useRouter()
 
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);



    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])

    useEffect(()=>{
        AuthorizedApiRequest
        .get(`/chats/my-contacts`)
        .then((res) => {
          if (res.data.err) {
            setError('ارور')
          }
          else {
    
            setResponse(res.data);
            console.log(res.data)
          }
        })
        .catch((err) => {
          setError(err);
          router.replace('/500')
        })
        .finally(() => {
          setloading(false);
        });
      
    },[])
  return (
    <>
        <div dir="rtl" className="w-full text-right max-w-screen-xl mx-auto ">
        <div className="relative rounded overflow-hidden border border-grey-light h-screen  flex  justify-center items-center bg-gray-100">
            <div className=" p-4 bg-grey-lighter py-8 ">
            <div className="bg-white mx-auto max-w-sm h-[40rem]  shadow-lg rounded-lg w-[22rem] overflow-hidden">
                <div className="sm:flex sm:items-center px-2 py-4">
                <div className="flex-grow">
                    <h3 className="font-bold text-center px-2 py-3 leading-tight">مخاطبین</h3>
                    <div dir="rtl" className="w-full overflow-auto h-64">
                        {response?.founded_users?.length > 0  ? (response.founded_users as Array<any>).map(elm=>(
                            <ContactComponent name={elm?.name} avatar={elm?.avatar} phone={elm?.phone}  id={elm?.id} key={elm?.id} />
                        )) : 
                        <p className="text-center mt-auto mb-auto">
                          مخاطبی موجود نیست
                        </p>
                        }
                

                    </div>
                </div>
                </div>

            </div>
            </div>
        </div>
        </div>
    </>
  )
}  

export default Page





const ContactComponent = (props : {name : string , avatar : string , id : number , phone : string}) =>{
  const router = useRouter()
    return (
    <div dir="ltr" key={props.id} className="flex cursor-pointer hover:text-orange-500 transition-all duration-200 hover:bg-gray-200  my-1   rounded-xl h-20">

        
        <div className="w-2/6  text-center py-1 flex justify-center items-center ">
         <div className="w-14 h-14  rounded-full"  style={{backgroundImage :  props.avatar ? `url(${BACK_END}${props.avatar})` : `url(${BACK_END}/uploads/chat_image_1672439444536.png)` , backgroundSize : "cover"  }} >

         </div> 
        </div>

        <div className="w-3/5  py-4  text-left">
            <p className="hover:text-blue-dark font-semibold">@{props.name}</p>
            <p className="hover:text-blue-dark">{props.phone}</p>

        </div>


        <div className="w-1/5 text-right   flex justify-center items-center">
            <p className="text-sm text-grey-dark hover:scale-125 duration-200" onClick={()=>router.replace(`/chat/new-chat-with-number?phoneNumber=${props.phone}`)}>
              <BiSend className="w-5 h-5 " />
            </p>
        </div>
        

    </div>

    )
}