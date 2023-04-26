import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { BiImage, BiPlus, BiSend, BiUser } from 'react-icons/bi'
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from '../../../clients/axios'
import { BACK_END } from '../../../clients/localStorage'
import NoPerson from "../../../assets/NoPerson.png"
import ErrorComponent from '../../../components/alerts/error'
import { ChatDetailesType, ChatDetailesFields, ChatDetailesModels, sendHandle } from '../../../types/chat-datailes'
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
import { SocketContext } from '../../../contexts/socket'
import { UserPdfMessageComponent } from './messages/UserPdfMessage'
import { SecondUserPdfMessageComponent } from './messages/SecondUserPdfMessage'






function RemmitanceDetailes(props : {shouldBeOpened : boolean}) {

//* STATES

  const [fields,setFields] = useState<ChatDetailesFields>({ isImageRemmitance : false , isPdfRemmitance : false , imageInput : null , pdf : null , remittance : null , textInput : '' ,remmitanceText : '' , replyedTo : null , sendLoading : false , imageText : ''})
  const [models,setModels] = useState<ChatDetailesModels>({ messageId : null , showUpdateMessage : false , modalSelectorOpen : false , FileSelectOpen : false , imageSendOpen : false , pdfSendOpen : false , locationSendOpen : false ,remittanceSendOpen : false , userProfileOpen : false , userAvatarOpen : false  , ShowImage : false , ShowImageSrc : '',fullPic : false , fullPicSrc : ""})

  const [loading,setloading] = useState(false)
  const [error,setError] = useState('')
  const [response, setResponse] = useState<ChatDetailesType | null>(null);

  const [myId,setmyId] = useState<number | null >(null)
  const [userTwoID,setUserTwoID] = useState<number | null>(null)
  // const online = useContext(SocketContext)
  const [online ,setOnline] = useState(false)

  const divref = useRef<any>()
  const router = useRouter()
  const {id} = router.query

  const scrollToBottom = () => {
    divref.current?.scrollIntoView({ behavior: "smooth" })
  }


//* useEffects
  // ? authorization check
  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  // ? scroll to bottom after 500ms
  useEffect(()=>{
    setTimeout(()=>{
      scrollToBottom()
    },500)
  },[response?.message])

  // ? fetch chat-messages from /api/chats/chat-messages?chatID=${id}
  useEffect(()=>{
    if (!id) return
    else {
      setloading(true)
      console.log(id)
        AuthorizedApiRequest
        .get(`/chats/single-remmitences?id=${id}`)
        .then((res) => {
          if (res.data?.err) {
            setError(res.data.err)
            console.log(res.data.err)
          }
          if (res.data.e) {
            router.push('/chat')
          }
          else {  
          
            setResponse(res.data as ChatDetailesType);
            console.log({chatMessages : res.data})
            
            const user_id = Number(localStorage.getItem('user-id'))
            const user_two = res.data?.userOneId == user_id ? res.data?.userTwoId : res.data?.userOneId
            
            setmyId(Number(user_id))
            setUserTwoID(Number(user_two))


            //SCROLL_TO_BOTTOM
            setTimeout(()=>{
              scrollToBottom()
            },500)

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

  },[id])







 
  return (
    <>
    {error &&  <ErrorComponent handle={setError} message={error} />}
    {loading ?  
      <ChatLoading shouldBeOpened={props.shouldBeOpened} />
      :
    <div         className={`h-[90vh]  md:mt-[12vh] shadow-xl mt-4 md:h-[80vh] ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto  bg-white rounded-3xl`}>
                <div className="w-full   ">

                    {/* CHAT_HEADER */}
                    <div className="h-[14vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">
                        <div className='basis-11/12 h-full flex justify-center items-center'>
                          <div className='w-[100%] sm:w-[95%] h-14 flex   rounded-2xl bg-beh-orange shadow-xl'>
                                <div className='basis-1/12  p-2 h-full flex justify-center items-center'>
                                  <BiUser className='fill-white w-10 h-10' />
                                </div>
                                <div className='w-11/12 h-full flex justify-center items-center text-center text-white  text-xl'>
                                  <div >
                                      {/* CONTACT_NAME */}
                                      <h1 >
                                        {
                                          response?.userTwoId != myId ? `${response?.userTwo?.profile?.name} ${response?.userTwo?.profile?.family}` :  `${response?.userOne?.profile?.name} ${response?.userOne?.profile?.family}`
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
                    <div  className="h-[66vh] md:h-[56vh]  px-10 w-full min-w-[340px]   overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray    flex flex-row gap-4">
                    <div className='w-full    flex-col flex gap-1 '>
                    </div>
                    </div>                    
                  </div>



                    {/* INPUTS_PART */}
                    <div className="h-[10vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">

                      <div className='basis-1/12 flex  px-2 justify-center items-center'>
                          
                          <div className='w-[6.5vh] h-[6.5vh] flex justify-center items-center'>
                              <div onClick={()=>setModels({...models,modalSelectorOpen : true})} className='w-[6.25vh] cursor-pointer h-[6.25vh] bg-beh-orange rounded-full  flex justify-center items-center'>
                                    <BiPlus className='w-[6vh] h-[6-vh] fill-white' />
                              </div>    
                            </div>
                      
                      </div>


                      <div className='basis-11/12 h-full flex justify-center items-center'>
                        <div className='w-[90%] sm:w-[95%] h-10 flex '>

                          <input value={fields.textInput} onChange={(e)=>setFields({...fields , textInput : e.target.value})} placeholder='اینجا بنویس ...' className='w-9/12 placeholder:text-md text-right px-3 md:w-10/12 h-full flex justify-center border-r-2 rounded-r-lg  border-y-2 border-beh-gray items-center   text-beh-gray  text-xl'/>
                       
                          
                        </div>
                      </div>

                      
                    </div>


                </div>
    }
                </>
    
  )
}

export default RemmitanceDetailes