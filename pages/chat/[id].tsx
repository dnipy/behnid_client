import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import { LoadingComponent } from "../../components/loading";
import { socket } from "../../clients/io";
import { user_id } from "../../clients/localStorage";
import EmojiPicker from "emoji-picker-react";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";
import Image from "next/image";
// import NoImage from "../../assets/NoImg.png"

const Page : NextPage = ()  => {
  const router = useRouter()
  const {id} = router.query
  const [response, setResponse] = useState<Array<any>>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [imojiOpen,setImojiOpen] = useState(false);
  const [sendingMSG,setSendingMSG] = useState(false)


  const [chatDetail,setChatDetail] =useState<any>([]);
  const [cerror , setCError] = useState('');
  const [cloading , setCloading] = useState(true);
  const [online,setOnline] = useState<Array<any>>([])
  const [secondUser,setSecondUser] = useState<number | undefined>()


  const [txt,setTxt] = useState('')
  const bottomRef = useRef<null | HTMLLIElement>(null);
  const div_ref = useRef<null | HTMLDivElement>(null)
    //forms
  const [file,setFile]=useState<FileList | null >(null)
  const NoImg = "https://behnid.com/uploads/chat_image_1672439444536.png"

  
  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])


  useEffect(()=>{
    if (!id) {
      return
    }
    AuthorizedApiRequest
    .get(`/chats/chat-messages?chatID=${id}`)
    .then((res) => {
      if (res.data.err) {
        setCError('ارور')
      }
      else {
        setChatDetail(res.data);
        const x = res.data?.userOneId !== parseInt(user_id as string) ? res.data?.userOneId : res.data?.userTwoId
        setSecondUser(x)
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});

    })
    .catch((err) => {
      setCError(err);
    })
    .finally(() => {
      setCloading(false);
    });
  },[id])


  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/chats/my-chats`)
    .then((res) => {
      if (res.data.err) {
        setError('ارور')
      }
      else {
        setResponse(res.data as Array<any>);
      }
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setloading(false);
    });
  },[])



  useEffect(()=>{
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'})
  },[chatDetail?.message])


 
  


  socket.on('get-users',(data)=>{
    setOnline(data)
  })

  



  const sendMessage = ()=>{
    if (txt) {

      setSendingMSG(true)
      setImojiOpen(false)
      AuthorizedApiRequest
      .post('/chats/new-message',
      {
        chatID : id,
        message : txt,
        reciverID : secondUser
      })
      .then((resp)=>{
        console.log({resp})
        if (resp?.data?.err) {
          console.log({emit_send_error:resp?.data?.e})
        }
        else {
          setChatDetail(resp.data)
          socket.emit('send-message',(resp.data?.message as Array<any>).slice(-1)[0])
          bottomRef?.current?.scrollIntoView({behavior: 'smooth'})
          
        }
        setTxt('')
      })
      .catch((e)=>{
        console.log(e)
      }).finally(()=>{
        setSendingMSG(false)
      })
    }
    else {
      return
    }
  }  


  socket.on('resive-message',(recived_data)=>{
    console.log({recived_data})
    const oldMessage = chatDetail.message as Array<any>
    oldMessage?.push(recived_data)
    // const NewArray = chatDetail?.message ?     : [recived_data]
    // console.log(NewArray)
    setChatDetail({
      ...chatDetail,
      message  : oldMessage 
    })
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'})

    // console.log({emit_recived_data :data})
  })

  const handleSend = async()=>{

  const body = new FormData()
  const stringSecondUser = String(secondUser)

  if(file?.item(0)){
      body.append('chat_image',file.item(0) as Blob)


  
      AuthorizedApiRequestImage 
      .post(`/chats/new-img-message?chatID=${id}&reciverID=${stringSecondUser}`,body)
      .then((res) => {
          console.log(res)
          if (res.data.err) {
            setError('مشکل در ارسال عکس')
            setFile(null)
              console.log(res.data)
          }
          else {
              
            setChatDetail(res?.data);
            socket.emit('send-message',(res.data?.message as Array<any>).slice(-1)[0])
            console.log({emit_send_message : (res.data?.message as Array<any>).slice(-1)[0]})
            bottomRef.current?.scrollIntoView({behavior: 'smooth'})
            console.log({image_file : (res.data?.message as Array<any>).slice(-1)[0]})
            setTxt('')
            setFile(null)
          }
      })
      .catch((err) => {
          console.log({err})
      })
      .finally(() => {
          setloading(false);
      });


  }else {
      setError('فایل انتخاب کنید')
  }
}


  return (
    <div  >
            {file ?
                 <div  className="fixed z-50 w-full h-full rounded-sm shadow-md opacity-60 bg-gray-500 flex justify-center items-center" >
                   
                      <p onClick={()=>setFile(null)} className="fixed top-20 right-20 text-lg text-center cursor-pointer  rounded-full w-10 bg-orange-400  pb-1 mb-1 shadow-md hover:shadow-lg" >x</p>
                    
                   <div className="min-w-[30rem]  p-10 h-[15rem] bg-white rounded-md shadow-lg opacity-100" >
                     <p className="pb-10">
                     {file.item(0)?.name}
                     </p>
                     <button onClick={handleSend} className="w-full h-16 text-white bg-orange-500 ">ارسال</button>

                   </div>
                 </div> :
      null}
    <div className="container bg-white   mx-auto shadow-lg">
      
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">

        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="hidden lg:block text-gray-600">
              
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
                className={` ${elm?.id == id ? 'bg-orange-400 hover:bg-orange-400' : null} flex items-center px-5  text-gray-900 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none`}>
                <img  className="object-cover w-10 h-10 rounded-full"
                  src={`https://behnid.com${elm?.userOne?.id != user_id ? `${ elm?.userOne?.avatar ? elm?.userOne?.avatar : '/uploads/chat_image_1672439444536.png' }` :  `${elm?.userTwo?.avatar ? elm?.userTwo?.avatar : '/uploads/chat_image_1672439444536.png'  }`  }`} alt="username" />
                  <div className="w-full pb-3">
                  <div className="flex  justify-between">
                    <span className="block mr-2  font-semibold text-gray-600">{elm?.userOne?.id != user_id ? elm?.userOne?.name : elm?.userTwo?.name}</span>
                    <span className="block mr-2 text-sm text-gray-600">{elm?.message[0]?.date ?                             
                                  MiladiToShamsi( Number((elm?.message[0]?.date as string).slice(0,4))  , Number((elm?.message[0]?.date as string).slice(5,7))  , Number((elm?.message[0]?.date as string).slice(8,10))  )  

                               : null}</span>
                  </div>
                  <span className="block mr-2  pr-4 text-right text-sm text-gray-600">{elm?.message[0]?.text ? (elm?.message[0]?.text as string).slice(0,20) : null}</span>
                </div>
              </a>
            </li>
            )) : <p className="text-center text-gray-600">پیامی موجود نیست</p>}

          </ul>

        </div>
        <div className="col-span-2 block overflow-auto">
          <div className="w-full">
            {chatDetail ? 
            <>
            <div dir="rtl" className="relative flex items-center p-3 px-10 shadow-md bg-orange-400 text-gray-900">
              <img className="object-cover w-10 h-10 rounded-full shadow-lg"
                  src={chatDetail?.userOne?.id != user_id ? `https://behnid.com${chatDetail?.userOne?.avatar ? chatDetail?.userOne?.avatar : '/uploads/chat_image_1672439444536.png' }` :   `https://behnid.com${chatDetail?.userTwo?.avatar  ?  chatDetail?.userTwo?.avatar : '/uploads/chat_image_1672439444536.png' }` }  alt="username" />
                  <span className="block mr-2 font-bold text-gray-900">{chatDetail?.userOne?.id !== Number(user_id as string) ? chatDetail?.userOne?.name : chatDetail?.userTwo?.name }</span>
              {
                online.find(item=>item?.userId === secondUser )?.userId   ?
                  <span className="absolute w-3 h-3 bg-green-600 rounded-full right-10 top-3"></span>
                : null
              }
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[90vh] lg:h-[80vh]  " ref={div_ref} >

              <ul className="space-y-3">

                { typeof(chatDetail.message) != 'undefined' ?  (chatDetail?.message as Array<any>).map(elm=>{


                  if (elm?.senderId !== parseInt(user_id as string)) {
                    // console.log({sender : elm.senderId, myid :  parseInt(user_id as string)})
                    if (!elm?.image){
                      return (                
                      <li key={elm?.id} className="flex justify-start">
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{elm?.text}</span>
                          <span className="text-xs">{(elm?.date as string)?.slice(11,16)}</span>
                        </div>
                      </li>
                    )
                    }
                    else {
                      return (
                        <li key={elm?.id} className="flex justify-start">
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <img src={`https://behnid.com${elm.image}`} className='max-w-56 max-h-56' alt="ikkasf" />
                            <span className="block">{elm?.text}</span>
                            <span className="text-xs">{(elm?.date as string)?.slice(11,16)}</span>
                          </div>
                        </li>
                        )
                      }
                    
                    }
                  else {
                    if (!elm?.image){
                      
                        return (
                          <li key={elm?.id} className="flex justify-end">
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span className="block">{elm?.text}</span>
                            <span className="text-xs">{(elm?.date as string)?.slice(11,16)}</span>
                          </div>
                        </li> 
                      )
                    }  
                    else {
                      return (
                        <li key={elm?.id} className="flex justify-end">
                          <div className="relative max-w-xl px-2 py-2 text-gray-700 bg-gray-100 rounded shadow ">
                            <img src={`https://behnid.com${elm.image}`} className='max-w-56 max-h-56' alt="ikkasf" />
                            <span className="block">{elm?.text}</span>
                            <span className="text-xs">{(elm?.date as string)?.slice(11,16)}</span>
                          </div>
                        </li>
                      )
                        
                    }
                  }

                })
                : null
              }


                      <div className="h-10"></div>
                      <li ref={bottomRef} className="flex justify-start"></li> 



                
              </ul>
            </div>

            <div className="flex fixed bottom-5 left-[10vw] lg:relative rounded-full items-center justify-between  w-4/5 p-3 border-1 mb-2 mr-auto ml-auto lg:left-0 shadow-xl   bg-orange-400">
              <button onClick={()=>setImojiOpen(!imojiOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-900 hover:scale-105" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button >
                <label className="hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 hover:scale-119" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>

   
                    <input accept="image/png,image/jpg,image/jpeg" onChange={ (e)=>setFile(e.target?.files) } type='file' className="hidden" />
                </label>
                
              </button>
              {
                imojiOpen ? 
                  <div className="fixed bottom-20 left-10 sm:left-auto"   >
                    <div className="flex justify-end pr-2" >
                      <p onClick={()=>setImojiOpen(!imojiOpen)} className="relative text-lg text-center cursor-pointer  w-8 h-8 rounded-full  bg-orange-400  pb-1 mb-1 shadow-lg" >x</p>
                    </div>
                    <EmojiPicker onEmojiClick={(emojiData)=>{
                      const newLine = `${txt} ${emojiData.emoji}`
                      setTxt(newLine)
                    }}/>
                  </div>
                :null
              }

              <input type="text" placeholder="Message"
                
                value={txt}
                onChange={(e)=>setTxt(e.target.value)}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
              <button>
                {/* <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg> */}
              </button>
              <button type="submit" onClick={ sendingMSG ?  undefined : sendMessage}>
                <svg className={`w-6 h-6 ${txt ? 'text-gray-900 hover:scale-105 rounded-full transition-all duration-150   ' : "opacity-50"} rotate-90`} xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            </>
              : <LoadingComponent/> }
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}  

export default Page