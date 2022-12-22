import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { AuthContext } from "../../contexts/Auth";

const Page : NextPage = ()  => {
  const [response, setResponse] = useState<Array<any>>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [id,setId] = useState<number | undefined>()
  const router = useRouter()

  const fetchData = () => {
    AuthorizedApiRequest
        .get('/profile/my-data')
        .then((res) => {
            setId(res.data?.id);
        })
        .then(
          ()=>{
            console.log(id)
            setTimeout(()=>{
              
            },1000)
          }
        )
        .catch((err) => {
            console.log(err);
            router.replace('/500')

        })
    };

      useEffect(() => {
          fetchData();
      }, [id]);
        

  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/chats/my-chats`)
    .then((res) => {
      if (res.data.err) {
        setError('ارور')
      }
      else {
        setResponse(res.data as Array<any>);
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
    <div className="p-10">

<div className="container  mx-auto h-64 ">
      <div className="min-w-full border bg-white rounded lg:grid lg:grid-cols-2">
        <div className="border-r  border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>

          <ul className=" hidden lg:block lg:overflow-auto lg:h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-center text-gray-600">پیام ها</h2>
            {response?.length != 0 && typeof(response) !== 'undefined' ? response.map(elm=>(
            <li key={elm?.id} >
              
              <a dir="rtl"
                href={`/chat/${elm.id}`}
                className={`flex items-center px-5 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none`}>
                <img className="object-cover w-10 h-10 rounded-full"
                  src={`https://behnid.com${elm?.userOne?.id != id ? elm?.userOne?.avatar : elm?.userTwo?.avatar}`} alt="username" />
                <div className="w-full pb-3">
                  <div className="flex  justify-between">
                    <span className="block mr-2  font-semibold text-gray-600">{elm?.userOne?.id != id ? elm?.userOne?.name : elm?.userTwo?.name}</span>
                    <span className="block mr-2 text-sm text-gray-600">{elm?.message[0]?.date ? (elm?.message[0]?.date as string).slice(0,10) : null}</span>
                  </div>
                  <span className="block mr-2  pr-4 text-right text-sm text-gray-600">{elm?.message[0]?.text ? (elm?.message[0]?.text as string).slice(0,20) : null}</span>
                </div>
              </a>
            </li>
            )) : <p className="text-center text-gray-600">پیامی موجود نیست</p>}

          </ul>
        </div>
 
        <div className="flex items-center justify-center text-center  w-full p-3 border-t border-gray-300">
          <div>

            <p className="text-gray-600 my-5">
              ارسال پیام یا انتخاب گفتگو
            </p>
            <div onClick={()=>router.replace('/chat/my-contact')} className="border-2 cursor-pointer border-gray-400 py-1 text-gray-400 rounded-lg hover:bg-gray-600 hover:border-gray-600 hover:text-gray-50">ارسال پیام</div>
          </div>
        </div>

      </div>
    </div>

    </div>
    </>
  )
}  

export default Page