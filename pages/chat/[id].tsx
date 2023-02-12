import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import { LoadingComponent } from "../../components/loading";
import { socket } from "../../clients/io";
import { BACK_END, user_id } from "../../clients/localStorage";
import EmojiPicker from "emoji-picker-react";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";
import AllChats from "../../features/components/chats/all-chats";
import ChatDetailes from "../../features/components/chats/chat-detailes";


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
  const [record,setRecord] = useState(false)


  const [txt,setTxt] = useState('')
  const bottomRef = useRef<null | HTMLLIElement>(null);
  const div_ref = useRef<null | HTMLDivElement>(null)
    //forms
  const [file,setFile]=useState<FileList | null >(null)
  const NoImg = `${BACK_END}/uploads/chat_image_1672439444536.png`

  
  
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

function onData(recordedBlob : any) {
  console.log('chunk of real-time data is: ', recordedBlob);
}
function onStop(recordedBlob : any) {
  console.log('recordedBlob is: ', recordedBlob);
}


function stopRecording () {
    setRecord(false);
}
function startRecording () {
  setRecord(true);
}

useEffect(()=>{
  setRecord(true)
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