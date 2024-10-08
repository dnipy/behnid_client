import React, {  useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { BiDetail, BiPlus, BiUser } from 'react-icons/bi'
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from '../../../clients/axios'
import { BACK_END } from '../../../clients/localStorage'
import NoPerson from "../../../assets/NoPerson.png"
import ErrorComponent from '../../../components/alerts/error'
import { ChatDetailesFields, ChatDetailesModels, ChatDetailesType, sendHandle } from '../../../types/chat-datailes'
import { UserImageMessageComponent } from './messages/UserImageMessageComponent'
import { SecondUserImageMessageComponent } from './messages/SecondUserImageMessageComponent'
import { SecondUserMessageComponent } from './messages/SecondUserTextMessageComponent'
import { UserMessageComponent } from './messages/UserTextMessageComponent'
import { ChatLoading } from './ChatLoading'
import { UserAvatarModel } from './modals/UserAvatarModal'
import { ModelSelector } from './modals/modalSelectorModal'
import { UserRemmitanceMessageComponent } from './messages/UserRemmitanceMessage'
import { SecondUserRemmitanceMessageComponent } from './messages/SecondUserRemmitanceMessage'
import { MdClose } from 'react-icons/md'
import { FullPic } from './modals/FullPicModal'
import { socket } from '../../../clients/io'
import { UserPdfMessageComponent } from './messages/UserPdfMessage'
import { SecondUserPdfMessageComponent } from './messages/SecondUserPdfMessage'
import Compressor from 'compressorjs'
import { message } from '../../../types/async-prisma-types'
import UserModal from '../user-modal'
import {HiDotsVertical} from 'react-icons/hi'
import { responeType } from '../../../types/chats'






function ChatDetailes(props : {shouldBeOpened : boolean , response: ChatDetailesType | null ,setResponse: React.Dispatch<React.SetStateAction<ChatDetailesType | null>>  ,  AllChatResponse :responeType[] , setAllChatResponse : React.Dispatch<React.SetStateAction<responeType[]>> }) {

//* STATES

  const [fields,setFields] = useState<ChatDetailesFields>({ isImageRemmitance : false , isPdfRemmitance : false , imageInput : null , pdf : null , remittance : null , textInput : '' ,remmitanceText : '' , replyedTo : null , sendLoading : false , imageText : ''})
  const [models,setModels] = useState<ChatDetailesModels>({ messageId : null , showUpdateMessage : false , modalSelectorOpen : false , FileSelectOpen : false , imageSendOpen : false , pdfSendOpen : false , locationSendOpen : false ,remittanceSendOpen : false , userProfileOpen : false , userAvatarOpen : false  , ShowImage : false , ShowImageSrc : '',fullPic : false , fullPicSrc : ""})

  const [loading,setloading] = useState(false)
  const [error,setError] = useState('')
  const [olderMessages,setOlderMessages] = useState<ChatDetailesType | null>(null);

  const [myId,setmyId] = useState<number | null >(null)
  const [ userTwoID,setUserTwoID] = useState<number | null>(null)
  const [loadDone,setLoadDone] = useState(false)
  // const online = useContext(SocketContext)
  const [online ,setOnline] = useState(false)
  const { response , setResponse , AllChatResponse , setAllChatResponse } = props

  const divref = useRef<any>()
  const beforeOlderRef = useRef<any>()

  const router = useRouter()
  const {id} = router.query

  const messageForFetch = 10;
  const [ fetchTime , setFetchTime ] = useState(1)
  const [olderLoading,setOlderLoading] = useState(false)
  const [endOfMessages,setEndOfMessages] = useState(false)


  const scrollToBottom = () => {
    divref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottomFast = () => {
    divref.current?.scrollIntoView({ behavior: "auto" })
  }



//* useEffects
  // ? authorization check
  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  // ? scroll to bottom after 500ms
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     scrollToBottom()
  //   },500)
  // },[response?.message])

  // ? fetch chat-messages from /api/chats/chat-messages?chatID=${id}
  useEffect(()=>{
    if (!id) return
    else {
      setloading(true)
      console.log(id)
      setTimeout(() => {
        AuthorizedApiRequest
        .get(`/chats/chat-messages?chatID=${id}&start=${1}&length=${messageForFetch}`)
        .then((res) => {
          if (res.data?.err) {
            setError(res.data.err)
            console.log(res.data.err)
          }
          if (res.data.e) {
            router.push('/chat')
          }
          else {  
            const ReverseMessages = res.data as ChatDetailesType
            const NewMessages = ReverseMessages?.message?.reverse()
            setResponse({...ReverseMessages , message : NewMessages});
            console.log({chatMessages : res.data})
            
            const user_id = Number(localStorage.getItem('user-id'))
            const user_two = res.data?.userOneId == user_id ? res.data?.userTwoId : res.data?.userOneId
            
            setmyId(Number(user_id))
            setUserTwoID(Number(user_two))
            setLoadDone(true)

            //SCROLL_TO_BOTTOM
            setTimeout(()=>{
              scrollToBottomFast()
              },500)
              
          }
        })
        .catch((err) => {
          setError('خطا');
          console.log({err})
        })
        .finally(() => {
          setloading(false)
        });
      }, 100);
       

    }

  },[id])
  

  // seen messages
  useLayoutEffect(()=>{
    // 
    if (!id) return
    if (!loadDone) return
    else {
      setloading(true)
      // console.log(id)
        AuthorizedApiRequest
        .get(`/chats/seen-message?chatID=${id}`)
        .then((res) => {
          if (res.data?.err) {
            setError(res.data.err)
            console.log(res.data.err)
          }
          if (res.data.e) {
            router.push('/chat')
          }
          
          else {              
            if (response?.message) {

              let newMessages = response?.message?.map(elm=>{
                if (elm.recieverId == myId) {
                  elm.hasSeen == true
                }
                return elm
              }) 

            setResponse({...response , message  : newMessages})     
            let newChatList = AllChatResponse;
            newChatList.map(elm=>{
                if (elm.id === Number(id)){
                  elm.message.forEach(msg =>{
                    msg.hasSeen = true
                  })
                }

                return elm
            });
            setAllChatResponse(newChatList)       
            // socket.emit('seen-message',{recieverId : userTwoID , chatID : Number(id) , senderID : myId})
            // console.log(newMessages)
            }
            

          else {
            // console.log('not seen this time')
            setTimeout(() => {
              if (response?.message) {

                let newMessages = response?.message?.map(elm=>{
                  if (elm.recieverId == myId) {
                    elm.hasSeen == true
                  }
                  return elm
                })
  
              setResponse({...response , message  : newMessages})
              // socket.emit('seen-message',{recieverId : userTwoID , chatID : id , senderId : myId})
              // console.log(newMessages)
              }
              let newChatList = AllChatResponse;
              newChatList.map(elm=>{
                  if (elm.id === Number(id)){
                    elm.message.forEach(msg =>{
                      msg.hasSeen = true
                    })
                  }

                  return elm
              });
              setAllChatResponse(newChatList)
              // console.log('done at second time')  
            }, 1000);
          }

          }
        })
        .catch((err) => {
          setError(err);
          console.log({err})
        })
        .finally(() => {
          setloading(false)
        });
      
    }
  },[id, loadDone])



  //  SOCKET EFFECT
  useEffect(() => {
    if (!myId) return

    else {
      socket.on('connect', () => { 
        setOnline(true)
      })
      socket.on('disconnect',()=>{
        setOnline(false)
      })
      socket.on('resive-message',(data:message)=>{
        // console.log('new-recived-msg  == '+ data)
        if (data && response?.message) {
          let NewMessages = []
          response?.message?.forEach((elm)=>{
            NewMessages.push(elm)
          })
          NewMessages.push(data)
          // NewMessages[NewMessages.length + 1]= data
          // console.log(NewMessages)
          NewMessages.forEach(elm=>{
            // console.log(elm)
            if (elm.recieverId == myId) {
              elm.hasSeen == true
              // console.log(elm)
            }
          }) 

          setResponse({...response! , message : NewMessages})        
        }
        else if (data && !response?.message ){
          setResponse({...response! , message : [data]})
        }
        let newChatList = AllChatResponse;
        newChatList.map(elm=>{
            if (elm.id === Number(id)){
              elm.message[0]=(data as message)
            }
            return elm
        });
        setAllChatResponse(newChatList); 
      })

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('resive-message')
      };
    }
    
  }, [myId,socket,response?.message])
  

// ? FUNCTIONS
  const scrollToBeforeTopRef = ()=>{
    beforeOlderRef.current?.scrollIntoView({ behavior: "instant" })
  }


  const LoadMessages = async () =>{
      setFetchTime(fetchTime + 1)
      setOlderLoading(true)
      console.log(id)
      setTimeout(() => {
        AuthorizedApiRequest
        .get(`/chats/chat-messages?chatID=${id}&start=${fetchTime * 10 + 1}&length=${10}`)
        .then((res) => {
          if (res.data?.err) {
            setError(res.data.err)
            console.log(res.data.err)
          }
          if (res.data.e) {
            router.push('/chat')
          }
          else {  
            // 
            const ReverseMessages = res.data as ChatDetailesType
            const NewMessages : message[] = []

            if(ReverseMessages?.message?.length == 0) {
              setEndOfMessages(true)
            }
            else {
              ReverseMessages?.message?.reverse()?.forEach(elm=>{
                NewMessages.push(elm)
              })
              olderMessages?.message?.map((elm)=>{
                NewMessages.push(elm)
              })
              setOlderMessages({...ReverseMessages , message : NewMessages});
          }

          }
        })
        .catch((err) => {
          setError('خطا در لود پیام ها');
          console.log({err})
        })
        .finally(() => {
          setOlderLoading(false)
        });
      }, 100);
       

    

  }



  // * DONE
  const SendText = ()=>{
    setFields({...fields,sendLoading : true , textInput : ''})
    const fbody = {
      chatID : Number(id),
      message : fields.textInput, 
      reciverID : userTwoID,
      replyedTo : fields.replyedTo
    }
    AuthorizedApiRequest
      .post('/chats/new-message',fbody)
        .then((resp)=>{
          if (!resp.data?.err) {
            console.log(resp.data)
            setResponse({...response! , message : [...response?.message! , resp.data]})
            const socketData = {
              recieverId : userTwoID,
              message  : resp.data
            }
            socket.emit('send-message',socketData);
            
            let newChatList = AllChatResponse;
            newChatList.map(elm=>{
                if (elm.id === Number(id)){
                  elm.message[0]=(resp.data as message)
                }
                return elm
            });
            setAllChatResponse(newChatList); 
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , textInput : '' , replyedTo : null});
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }

  // * Done 
  const editText = (message_id : number)=>{
    if (fields.imageText?.length < 1) {
      console.log('err')
      return
    }

    setFields({...fields,sendLoading : true })
    
    const fbody = {
      msgID : message_id,
      new_msg : fields.imageText
    }
    console.log(fbody)

    AuthorizedApiRequest
      .post('/chats/edit-message',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {

            let newMessages = response?.message.map(elm=>{
                if (elm.id == message_id){
                  elm.text = fields.imageText!
                  return (elm)
                }
                else {
                  return(
                    elm
                  )
                }
            })
            setResponse({...response! , message : newMessages!})
            
            let newChatList = AllChatResponse;
            newChatList.map(elm=>{
                if (elm.id === Number(id)){
                  elm.message = newMessages!
                }
                return elm
            });
            setAllChatResponse(newChatList); 
          }
          else {
            setError('پیام ها فقط تا یک ساعت بعد از ارسال قابل تغییر هستند')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , imageText : '' , replyedTo : null , });
          setModels({...models , showUpdateMessage : false , ShowImageSrc : '' , messageId : null ,})
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }


  // * Done 
  const DeleteMessage = (message_id : number) =>{
    setFields({...fields,sendLoading : true })
    const fbody = {
      msgID : message_id, 
    }
    AuthorizedApiRequest
      .post('/chats/delete-message',fbody)
        .then((resp)=>{
          if (resp.data?.msg){
            const newMessages = response?.message
            newMessages?.splice(newMessages?.findIndex(e => e.id === message_id),1)
            setResponse({...response! , message : newMessages! })
          }
          if (resp.data.err) {
            setError(resp.data.err)
          }
          
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , imageText : '' , replyedTo : null , });
          setModels({...models , showUpdateMessage : false , ShowImageSrc : '' , messageId : null ,})
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }

  // * Done (untested)
  const LikeMessage = (message_id : number)=>{
    setFields({...fields,sendLoading : true })
    const fbody = {
      chatID : Number(id),
      messageID : message_id, 
    }
    AuthorizedApiRequest
      .post('/chats/like-message',fbody)
        .then((resp)=>{
          if (resp.data?.msg){
            const newMessages = response?.message.map(elm=>{
              if (elm.id == message_id){
                elm.liked = true
                return (elm)
              }
              else {
                return(
                  elm
                )
              }
            })
            setResponse({...response! , message : newMessages! })
          }
          
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , textInput : '' , replyedTo : null});
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }

  // * Done 
  const SendImageUnCompressed = ()=>{

    
      const fbody = new FormData()
  
      if (fields.imageInput){
  
        fbody.append('chat_image',fields.imageInput as Blob)
        fbody.append('caption', fields.imageText)
        fbody.append('chatID', String(id) )
        fbody.append('reciverID', String(userTwoID) )
        fields.replyedTo && fbody.append('replyedTo', String(fields.replyedTo) )
  
        setFields({...fields,sendLoading : true , textInput : '' , replyedTo : null , pdf : null , imageInput : null})
      
        AuthorizedApiRequestImage
        .post('/chats/new-img-message',fbody)
          .then((resp)=>{
            console.log(resp)
            setResponse({...response! , message : [...response?.message! , resp.data]})
          })
          .catch((err)=>{
            console.log(err)
          })
          .finally(()=>{
            setFields({...fields,sendLoading : false , textInput : '' , imageInput : null});
            setModels({...models , imageSendOpen : false , modalSelectorOpen : false})
            setTimeout(() => {
              scrollToBottom()
            }, 500);
          })
    }
    else {
      setError('عکسی انتخاب نشده')
    }
  }


  // * Done (commpressed)
  const SendImage = ()=>{

    if (fields.imageInput){
      
      setFields({...fields,sendLoading : true , textInput : '' , replyedTo : null , pdf : null , imageInput : null})


      const image = fields.imageInput;
      new Compressor(image,{
        quality : 0.5,
        success: (compressedResult) => {
          // setSelectedImage(compressedResult) 
          console.log({
            orginal : fields.imageInput ,
            compressedResult
          })
          const fbody = new FormData()
          fbody.append('chat_image',compressedResult)
          fbody.append('caption', fields.imageText)
          fbody.append('chatID', String(id) )
          fbody.append('reciverID', String(userTwoID) )
          fields.isImageRemmitance && fbody.append('isRemmitance', 'yes'  )

          fields.replyedTo && fbody.append('replyedTo', String(fields.replyedTo) )
    
          setFields({...fields,sendLoading : true , textInput : '' , replyedTo : null , pdf : null , imageInput : null})
        
          AuthorizedApiRequestImage
          .post('/chats/new-img-message',fbody)
            .then((resp)=>{
              // console.log(resp)
              if (!resp.data?.err) {
                setResponse({...response! , message : [...response?.message! , resp.data]})
                const socketData = {
                  recieverId : userTwoID,
                  message  : resp.data
                }
                socket.emit('send-message',socketData)

                let newChatList = AllChatResponse;
                newChatList.map(elm=>{
                    if (elm.id === Number(id)){
                      elm.message[0]=(resp.data as message)
                    }
                    return elm
                });
                setAllChatResponse(newChatList); 
              }
              else {
                setError(resp.data?.err)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
            .finally(()=>{
              setFields({...fields,sendLoading : false , textInput : '' , imageInput : null , isImageRemmitance : false , imageText :''});
              setModels({...models , imageSendOpen : false , modalSelectorOpen : false})
              setTimeout(() => {
                scrollToBottom()
              }, 500);
            })
        },
      })


  }
  else {
    setError('عکسی انتخاب نشده')
  }
}

  // * Done 
  const SendPdf = ()=>{
    const fbody = new FormData()
    setloading(true)

    if (fields.pdf){

      fbody.append('pdf_file',fields.pdf as Blob)
      fbody.append('caption', fields.imageText)
      fbody.append('chatID', String(id) )
      fbody.append('reciverID', String(userTwoID) )
      fields.replyedTo && fbody.append('replyedTo', String(fields.replyedTo) )
      fields.isPdfRemmitance && fbody.append('isRemmitance', 'yes'  )

      setFields({...fields,sendLoading : true , textInput : '' , replyedTo : null , pdf : null})
    
      AuthorizedApiRequestImage
      .post('/chats/new-pdf-message',fbody)
        .then((resp)=>{
          // setResponse({...response! , message : [...response?.message! , resp.data]})
          if (!resp.data?.err) {
            console.log(resp.data)
            setResponse({...response! , message : [...response?.message! , resp.data]})
            const socketData = {
              recieverId : userTwoID,
              message  : resp.data
            }
            socket.emit('send-message',socketData)
            let newChatList = AllChatResponse;
            newChatList.map(elm=>{
                if (elm.id === Number(id)){
                  elm.message[0]=(resp.data as message)
                }
                return elm
            });
            setAllChatResponse(newChatList); 
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
          if (err?.response?.status == 413) {
            setError('فایل انتخابی بیش از حجم مجاز است')
          }
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , textInput : '',pdf : null , isPdfRemmitance : false});
          setModels({...models , pdfSendOpen : false , modalSelectorOpen : false})
          setloading(false)
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }
  else {
    setError('فایل انتخاب نشده')
  }
  }

  // ! Done  
  const SendRemittance = ()=>{
    setloading(true)
    const fbody = new FormData()

    if (fields.remittance){

      fbody.append('chat_remittance_image',fields.remittance as Blob)
      fbody.append('caption', fields.remmitanceText)
      fbody.append('chatID', String(id) )
      fbody.append('reciverID', String(userTwoID) )
      fields.replyedTo && fbody.append('replyedTo', String(fields.replyedTo) )

      setFields({...fields,sendLoading : true , textInput : '' , replyedTo : null , pdf : null , remittance : null})
    
      AuthorizedApiRequestImage
      .post('/chats/new-remittance-message',fbody)
        .then((resp)=>{
          // setResponse({...response! , message : [...response?.message! , resp.data]})
          if (!resp.data?.err) {
            console.log(resp.data)
            setResponse({...response! , message : [...response?.message! , resp.data]})
            const socketData = {
              recieverId : userTwoID,
              message  : resp.data
            }
            socket.emit('send-message',socketData)
            let newChatList = AllChatResponse;
            newChatList.map(elm=>{
                if (elm.id === Number(id)){
                  elm.message[0]=(resp.data as message)
                }
                return elm
            });
            setAllChatResponse(newChatList); 
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setFields({...fields,sendLoading : false , textInput : ''});
          setModels({...models , remittanceSendOpen : false , modalSelectorOpen : false})
          setloading(false)
          setTimeout(() => {
            scrollToBottom()
          }, 500);
        })
  }
  else {
    setError('حواله ایی انتخاب نشده')
  }
}


  const ModelSend : sendHandle = {
      imageSend : SendImage,
      pdfSend : SendPdf,
      remmitanceSend : SendRemittance
  }

  // onContextMenu={showContextMenu}   onClick={hideContextMenu}

  const onModelCloseImage =()=>{
      setModels({...models , showUpdateMessage : false , messageId : null ,ShowImageSrc : ''})
      setFields({...fields , imageInput : null ,textInput : ''})
  }

  const UpdateText = ()=>{
        editText(models.messageId!)
  }

  const DeleteText = ()=>{
    DeleteMessage(models.messageId!)
  }

  return (
    <>
    {error &&  <ErrorComponent handle={setError} message={error} />}
    {models.userAvatarOpen &&

      <UserAvatarModel models={models} setModels={setModels}  avatar={
        response?.userTwoId != myId 
                ? 
            response?.userTwo?.avatar ? `${BACK_END}${response.userTwo.avatar}` : NoPerson.src 
                :
            response?.userOne?.avatar ? `${BACK_END}${response.userOne.avatar}` : NoPerson.src 
      } />

     }
     {
       models.userProfileOpen &&
        <UserModal id={response?.userTwoId != myId  ? response?.userTwoId! : response?.userOneId!} models={models} setModels={setModels}/>
     }
     {models.fullPic && <FullPic src={models.fullPicSrc} models={models}  setModels={setModels}  />}

      {models.showUpdateMessage &&

          <div className="relative">
              <div className={`z-[25]  h-full w-full fixed ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'} fixed top-0 right-0 w-[100vw] h-screen backdrop-blur-sm bg-beh-gray/50 z-50`}>
                  <div className="flex h-[79vh] mt-[4.5rem]  justify-center items-center">                         
                      <div className={`w-[330px] ${models.ShowImageSrc ? 'h-[600px]' : 'h-[300px]'}  flex flex-col items-center justify-center bg-beh-gray-dark rounded-3xl `}>
                          
                          <div className="relative">
                              <div onClick={onModelCloseImage} className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer rounded-full -top-[60px]  -right-[152px] flex justify-center items-center ">
                                  <MdClose className="w-6 h-6 fill-white" />
                              </div>
                          </div>
                          <h1 className="text-center text-lg text-white mb-2">ویرایش پیام</h1>

                          
                          {models.ShowImageSrc ? <img src={BACK_END+models.ShowImageSrc} className='w-[320px] cursor-not-allowed  h-[320px] rounded-xl' /> : null }

                          <div className="w-full p-2 h-[100px]  mt-10 flex justify-around items-center">

                              <input value={fields.imageText} onChange={(e)=>setFields({...fields , imageText : e.target.value })} placeholder="کپشن این تصویر..." className="w-full px-2 text-xl h-[70px] rounded-xl" type="text" />
                          </div>
                          <div className="w-full p-2 h-[80px] gap-x-2  flex justify-around items-center">
                              <div onClick={UpdateText} className={`w-[50%]  h-[50px] rounded-xl ${models.showUpdateMessage ? 'bg-beh-green-super-light cursor-pointer' : 'bg-beh-orange/70 cursor-not-allowed' }   flex justify-center items-center`}>
                                  <h1 className='text-white text-xl'>تایید</h1>
                              </div>
                              <div onClick={DeleteText} className={`w-[50%] h-[50px] rounded-xl ${models.showUpdateMessage ? 'bg-beh-orange cursor-pointer' : 'bg-beh-orange/70 cursor-not-allowed' }   flex justify-center items-center`}>
                                <h1 className='text-white text-xl'>حذف پیام</h1>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      }

    {loading ?  
      <ChatLoading shouldBeOpened={props.shouldBeOpened} />
      :
    <div         className={`h-[98vh]  md:mt-[12vh] shadow-xl  md:h-[80vh] ${props.shouldBeOpened ? 'basis-full lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto  bg-white rounded-3xl`}>
                {models.modalSelectorOpen && <ModelSelector sendHandle={ModelSend} shouldBeOpened={props.shouldBeOpened} fields={fields} setFields={setFields} model={models} setModels={setModels} />}
                <div className="w-full   ">

                    {/* CHAT_HEADER */}
                    <div className="h-[14vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">
                        <div className='basis-11/12 h-full flex justify-center items-center'>
                          <div className='w-[100%] sm:w-[95%] h-14 flex   rounded-2xl bg-beh-orange shadow-xl'>
                                <div className='basis-1/12  p-2 h-full flex justify-center items-center'>
                                  <HiDotsVertical className='fill-white w-7 h-7 hover:cursor-pointer' />
                                </div>
                                <div className='w-11/12 h-full flex justify-center items-center text-center text-white  text-xl'>
                                  <div className='cursor-pointer' onClick={()=>setModels({...models,userProfileOpen : true})} >
                                      {/* CONTACT_NAME */}
                                      <h1>
                                        {
                                          response?.userTwoId != myId ? `${response?.userTwo?.profile?.name ? response?.userTwo?.profile?.name : 'کاربر'} ${response?.userTwo?.profile?.family ? response?.userTwo?.profile?.family : 'بدون نام'}` :  `${response?.userOne?.profile?.name ? response?.userOne?.profile?.name : 'کاربر'} ${response?.userOne?.profile?.family ? response?.userOne?.profile?.family : 'بدون نام'}`
                                        }
                                        <br />
                                        <span className='text-sm'>  
                                        {/* {online ? 'آنلاین' :  'در حال اتصال'} */}
                                        </span>
                                      </h1>
                                  </div>
                                </div>
                          </div>
                        </div>

                        <div className='basis-1/12 flex justify-end px-2 items-center'>
                            <div className='rounded-full w-[12vh] h-[12vh] bg-beh-gray flex justify-center items-center'>
                                        
                                        {/* TOP_AVATAR_PIC */}
                                        <img 
                                        
                                        src={
                                          response?.userTwoId != myId ? 
                                                                  response?.userTwo?.avatar ? `${BACK_END}${response.userTwo.avatar}` : NoPerson.src 
                                                                      :
                                                                  response?.userOne?.avatar ? `${BACK_END}${response.userOne.avatar}` : NoPerson.src 
                                        }
                                        
                                        onClick={
                                          response?.userTwoId != myId ? 
                                                                  response?.userTwo?.avatar ? ()=>setModels({...models,userAvatarOpen : true}) : undefined
                                                                      :
                                                                  response?.userOne?.avatar ? ()=>setModels({...models,userAvatarOpen : true}) : undefined 
                                        }
                                        
                                        alt={
                                          response?.userTwoId != myId ? 
                                                        response?.userTwo?.profile?.name
                                                                      :
                                                        response?.userOne?.profile?.name
                                        } className='w-[11vh] cursor-pointer h-[11vh] rounded-full'
                                        
                                        />

                            </div>
                        </div>
                    </div>

                    {/* MESSAGES_PART */}
                    <div  className="h-[75vh] md:h-[56vh]  px-10 w-full min-w-[340px]   overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray    flex flex-row gap-4">
                      <div className='w-full    flex-col flex gap-1 '>
                        <div  className='text-center  mb-2'>
                          {olderLoading ? 
                            <h1>در حال بارگیری</h1>  
                            :
                              endOfMessages 
                              ?
                              <h1>پیامی موجود نیست</h1> 
                              :
                              <h1 onClick={LoadMessages}>
                                پیام های قبلی
                              </h1>
                        }
                         
                        </div>
                      {
                        olderMessages?.message &&  olderMessages?.message?.map(elm=>{
                              const { senderId } = elm
                              // TEXT_I_SENT
                              if (senderId == myId  ) {

                                
                                if (elm.pdf ) {
                                  return (
                                    <UserPdfMessageComponent date={elm.date} isRemmitance={elm?.messageType == 'remittance' ? true : false}  id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} does_seen={elm.hasSeen} models={models} setModel={setModels} src={elm.pdf} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }

                                if (elm.image && elm.messageType == 'message') {
                                  return (
                                    <UserImageMessageComponent date={elm.date} fields={fields} setFields={setFields} id={elm.id} liked={elm.liked} LikeMessage={LikeMessage} models={models} setModel={setModels} src={elm.image}  does_seen={elm.hasSeen} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                
                                if (elm.image && elm.messageType == 'remittance') {
                                  return (
                                    <UserRemmitanceMessageComponent date={elm.date} id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} does_seen={elm.hasSeen} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }


                                else {
                                  return(
                                    <UserMessageComponent date={elm.date}  id={elm.id}  fields={fields} setFields={setFields} models={models} setModel={setModels}  key={elm.id} liked={elm.liked} does_seen={elm.hasSeen} text={elm.text!} />
                                    )
                                }
                              }

                              // TEXT_USER_SENT
                              else  {
                                if (elm.image && elm.messageType == 'message') {
                                  return (
                                    <SecondUserImageMessageComponent date={elm.date} id={elm.id}  LikeMessage={LikeMessage} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} liked={elm.liked} />
                                  )
                                }
                                if (elm.image && elm.messageType == 'remittance') {
                                  return (
                                    <SecondUserRemmitanceMessageComponent date={elm.date} id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                
                                if (elm.pdf ) {
                                  return (
                                    <SecondUserPdfMessageComponent date={elm.date}  id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.pdf} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                return(
                                    <SecondUserMessageComponent date={elm.date} liked={elm.liked} id={elm.id} like={LikeMessage}  key={elm.id} text={elm.text!}  /> 
                                  )
                              }


                          })
                        }
                        <div ref={beforeOlderRef} ></div>
                        {
                          response?.message?.map(elm=>{
                              const { senderId } = elm
                              // TEXT_I_SENT
                              if (senderId == myId  ) {

                                
                                if (elm.pdf ) {
                                  return (
                                    <UserPdfMessageComponent date={elm.date} isRemmitance={elm?.messageType == 'remittance' ? true : false}  id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} does_seen={elm.hasSeen} models={models} setModel={setModels} src={elm.pdf} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }

                                if (elm.image && elm.messageType == 'message') {
                                  return (
                                    <UserImageMessageComponent date={elm.date} fields={fields} setFields={setFields} id={elm.id} liked={elm.liked} LikeMessage={LikeMessage} models={models} setModel={setModels} src={elm.image}  does_seen={elm.hasSeen} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                
                                if (elm.image && elm.messageType == 'remittance') {
                                  return (
                                    <UserRemmitanceMessageComponent date={elm.date} id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} does_seen={elm.hasSeen} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }


                                else {
                                  return(
                                    <UserMessageComponent date={elm.date}  id={elm.id}  fields={fields} setFields={setFields} models={models} setModel={setModels}  key={elm.id} liked={elm.liked} does_seen={elm.hasSeen} text={elm.text!} />
                                    )
                                }
                              }

                              // TEXT_USER_SENT
                              else  {
                                if (elm.image && elm.messageType == 'message') {
                                  return (
                                    <SecondUserImageMessageComponent date={elm.date} id={elm.id}  LikeMessage={LikeMessage} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} liked={elm.liked} />
                                  )
                                }
                                if (elm.image && elm.messageType == 'remittance') {
                                  return (
                                    <SecondUserRemmitanceMessageComponent date={elm.date} id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.image} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                
                                if (elm.pdf ) {
                                  return (
                                    <SecondUserPdfMessageComponent date={elm.date}  id={elm.id} LikeMessage={LikeMessage} liked={elm.liked} models={models} setModel={setModels} src={elm.pdf} text={elm.text ? elm.text : ''} replyedTO={elm.replyedTo ? elm.replyedTo : undefined} key={elm.id} />
                                  )
                                }
                                return(
                                    <SecondUserMessageComponent date={elm.date} liked={elm.liked} id={elm.id} like={LikeMessage}  key={elm.id} text={elm.text!}  /> 
                                  )
                              }


                          })
                        }

                        {/* <UserImageMessageComponent models={models} setModel={setModels} text='lirej sdkj ld jsdjsldkjsldj;sdl;l kdl snl i sa asasasas as as a as d a ad a d jjihohoij  ijoij nslk nldsk nsk' src=''  />
                        
                        <SecondUserImageMessageComponent models={models} setModel={setModels} text='lirej sdkj ld jsdjsldkjsldj;sdl;l kdl snl i sa asasasas as as a as d a ad a d jjihohoij  ijoij nslk nldsk nsk' src=''  /> */}
                        
                        <div ref={divref} ></div>
                      </div>
                    </div>                    
                  </div>



                    {/* INPUTS_PART */}
                    <div className="h-[10vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">

                     


                      <div className='basis-11/12 h-full flex justify-center items-center'>
                        <div className='w-[90%] sm:w-[95%] h-10 flex '>
                          
                          <div onClick={!fields.sendLoading && fields.textInput ? SendText : undefined} className='basis-3/12 cursor-pointer md:w-2/12 bg-beh-green-light h-full flex rounded-r-lg shadow-lg justify-center text-white items-center'>
                            <h1>
                              ارسال
                            </h1>
                          </div>

                          <input value={fields.textInput} onChange={(e)=>setFields({...fields , textInput : e.target.value})} placeholder='اینجا بنویس ...' className='w-9/12 placeholder:text-md text-right px-3 md:w-10/12 h-full flex justify-center border-l-2 rounded-l-lg  border-y-2 border-beh-gray items-center   text-beh-gray  text-xl'/>
                       
                         
                        </div>
                      </div>

                      <div className='basis-1/12 flex  px-2 justify-center items-center'>
                          
                          <div className='w-[6.5vh] h-[6.5vh] flex justify-center items-center'>
                              <div onClick={()=>setModels({...models,modalSelectorOpen : true})} className='w-[6.25vh] cursor-pointer h-[6.25vh] bg-beh-orange rounded-full  flex justify-center items-center'>
                                    <BiPlus className='w-7 h-7 fill-white' />
                              </div>    
                            </div>
                      
                      </div>

                      
                    </div>


                </div>
    }
                </>
    
  )
}

export default ChatDetailes