import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";

const Page : NextPage = ()  => {
    const router = useRouter()
 
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);


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
            <div className=" p-4 bg-grey-lighter py-8">
            <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg w-72 overflow-hidden">
                <div className="sm:flex sm:items-center px-2 py-4">
                <div className="flex-grow">
                    <h3 className="font-bold text-center px-2 py-3 leading-tight">مخاطبین</h3>
                    <input type="text" placeholder="جستجو در مخاطبین "
                    className="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none" />
                    <div dir="rtl" className="w-full overflow-auto h-64">
                        {response?.contacts?.length > 0  ? (response.contacts as Array<any>).map(elm=>(
                            <ContactComponent name={elm?.contactName} id={elm?.id} key={elm?.id} />
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





const ContactComponent = (props : {name : string , id : number , phone? : string}) =>{
  const router = useRouter()
    return (
    <div key={props.id} className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
        <div className="w-8 h-10 text-center py-1">
         <p className="text-3xl p-0 text-grey-dark">&bull;</p>
        </div>
        <div className="w-4/5 h-10 py-3 px-1">
            <p className="hover:text-blue-dark">{props.name}</p>
        </div>
        <div className="w-1/5 h-10 text-right p-3">
            <p className="text-sm text-grey-dark" onClick={()=>router.replace(`/chat/new-chat?id=${props.id}`)}>چت</p>
        </div>
    </div>

    )
}