import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../../clients/axios';
import { BACK_END } from '../../../clients/localStorage';
import ErrorComponent from '../../../components/alerts/error';
import { Chats, message, Profile, User } from '../../../types/async-prisma-types';
import { MessageListComponent } from './MessageListComponents';
import NoPeron from '../../../assets/NoPerson.png'
import { BiDollar, BiHome, BiLogOut, BiNotification, BiUser } from 'react-icons/bi';
import { ContactPickerModel } from './modals/contact_list_model';
import { MdNotifications } from 'react-icons/md';
import Remmitances from './remmitances';
import { AuthContext } from '../../../contexts/Auth';
import { socket } from '../../../clients/io';
import { BsPersonFill } from 'react-icons/bs';
import { AiFillProfile } from 'react-icons/ai';
import { responeType } from '../../../types/chats';
import ComponentLoading from '../../../components/componentLoading';
import { ChatDetailesType } from '../../../types/chat-datailes';



function AllChats(props : {shouldBeOpened : boolean , response :responeType[] , setResponse : React.Dispatch<React.SetStateAction<responeType[]>> , DetaileResponse: ChatDetailesType | null , setDetaileResponse: React.Dispatch<React.SetStateAction<ChatDetailesType | null>>}) {

    const [myId,setmyId] = useState<number | null >(null)
    const [loading, setloading] = useState(true);
    const [error, setError] = useState('');
    const [userPickerModal,setUserPickerModal] = useState(false)
    const [chatListInput,setChatlistInput] = useState<string >('')
    const [remmitance,setRemmitance] = useState(false)
    const [chatType,setChatType] = useState(1)
    const { response , setResponse } = props
    const router = useRouter()
    const {logout} = useContext(AuthContext)
    const NoImg = `${BACK_END}/uploads/chat_image_1672439444536.png`
  
  
    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])
  
  
    useEffect(()=>{
      AuthorizedApiRequest
      .get(`/chats/my-chats`)
      .then((res) => {
        if (res.data.err) {
          setError('ارور')
        }
        else {
          setResponse(res.data as responeType[]);
          console.log(res.data)
        }
      })
      .catch((err) => {
        // setError(err);
        console.log({err})
      })
      .finally(() => {
        setloading(false);
      });
    
    },[])

    
    // # SOCKETS //
    // useEffect(() => {
    //   if (!socket) return
  
    //   else {
    //     // console.log('id here')
    //     // socket.on('connect', () => { 
    //     //   setOnline(true)
    //     // })
    //     // socket.on('disconnect',()=>{
    //     //   setOnline(false)
    //     // })
    //     socket.on('update-seen-state',(data)=>{
    //       const { chatID } = data
    //       console.log('update-seen-state  == '+ data)
    //       let newResp = response?.map(elm=>{
    //         // elm?.message?.map(elm=>{
    //         //   if (elm.recieverId == myId) {
    //         //     elm.hasSeen == true
    //         //   }
    //         //   return elm
    //         // })
    //         const myid = window.localStorage.getItem('user-id')
    //         if (!myid) router.push('/')

    //         if (elm.id == chatID) {
    //           elm.message.forEach((msg)=>{
    //             if (msg.recieverId == Number(myid)) {
    //               msg.hasSeen == true
    //             }
    //             return msg
    //           })
    //         }
    //         return elm
    //       })
    //       setResponse(newResp)
    //     })
  
    //     return () => {
    //       // socket.off('connect');
    //       // socket.off('disconnect');
    //       socket.off('update-seen-state')
    //     };
    //   }
      
    // }, [socket])

  return (
    <>
     {error ? <ErrorComponent handle={setError} message={error} /> : null }
     {userPickerModal && <ContactPickerModel fildes={userPickerModal} setFileds={setUserPickerModal} />}
     
     <div className={`h-[92vh]  ${props.shouldBeOpened ? 'basis-5/6 lg:basis-1/3' : 'hidden lg:block lg:basis-1/3'}  mx-auto  `}>
        <div className='h-[70px] w-full my-2 gap-1 justify-center items-center  flex flex-row'>
            <div className='w-2/12 cursor-pointer flex justify-center items-center'>
              {/* <BiHome className='w-8 h-8 fill-beh-orange' onClick={()=>router.push('/')} /> */}
              <BiLogOut className='w-8 rotate-180 h-8 fill-beh-orange' onClick={()=>{
                setloading(true)
                logout()
                window.location.replace('/')
                setloading(false)
              }} />

            </div>

            <div  className='w-4/12 flex justify-center items-center'>
              <div onClick={()=>setUserPickerModal(true)} className='w-full cursor-pointer h-[40px] shadow-xl justify-center bg-beh-gray flex gap-1 items-center'>
                  <div>
                    {/* <BiUser className='w-5 h-5 fill-[#FFC499]' /> */}
                    <AiFillProfile className='w-5 h-5 fill-[#FFC499]' />
                  </div>

                  <div >
                    <h1 className='text-[#FFC499]'>مخاطبین</h1>
                  </div>
              </div>
            </div>

            <div className='w-3/12 flex justify-center items-center'>
              <div onClick={()=>setRemmitance(!remmitance)} className='w-full h-[40px] justify-center  cursor-pointer  shadow-xl bg-beh-gray flex gap-1 items-center'>
                  <div>
                    <BiDollar className='w-4 h-4 mt-1 fill-beh-green-super-light' />
                  </div>

                  <div className='text-beh-green-super-light text-sm' >
                    <h1>{remmitance ? 'چت' : 'حواله ها'}</h1>
                  </div>
              </div>
            </div>


            {/* <div className='w-3/12 flex justify-center items-center'>
              <div className='w-full h-[40px] justify-center cursor-not-allowed shadow-xl bg-beh-gray flex gap-1 items-center'>
                  <div>
                    <MdNotifications className='w-5 h-5 fill-beh-yellow' />
                  </div>

                  <div >
                    <h1 className='text-beh-yellow'>اعلان</h1>
                  </div>
              </div>
            </div> */}



            <div onClick={()=>router.push('/profile')} className='w-3/12 flex justify-center items-center'>
              <div className='w-full h-[40px] justify-center cursor-pointer shadow-xl bg-beh-gray flex gap-1 items-center'>
                  <div>
                    <BsPersonFill className='w-5 h-5 fill-beh-yellow' />
                  </div>

                  <div >
                    <h1 className='text-beh-yellow'>پروفایل</h1>
                  </div>
              </div>
            </div>

        </div>

        {
          !remmitance
            ? 
            <div className={`h-[80vh] shadow-xl ${props.shouldBeOpened ? 'basis-5/6 lg:basis-1/3' : 'hidden lg:block lg:basis-1/3'}  mx-auto bg-white rounded-3xl`} >
            <div className="w-full flex justify-center h-[6rem] items-center ">
                <div className="h-14 w-[90%] rounded-2xl bg-white flex">
                    <div  onClick={chatType != 1 ?  ()=>setChatType(1) : undefined}  className={`w-1/2 ${chatType == 1 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'} transition-all duration-150 cursor-default  shadow-md flex justify-center items-center text-white rounded-r-2xl`}>
                          <h1 className="text-center font-bold text-lg ">
                            شخصی
                          </h1>
                    </div>

                    <div  className={`w-1/2 ${chatType == 2 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'} transition-all cursor-not-allowed duration-150 shadow-md flex justify-center items-center text-white  rounded-l-2xl`}>
                          <h1 className="text-center font-bold text-lg ">
                            گروه
                          </h1>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center h-12">
              
            <label className="relative block w-full ">
              <input value={chatListInput} onChange={(e)=>setChatlistInput(e.target.value)} type="text" className='h-10 w-[90%] mr-[5%] border-2 border-beh-gray rounded-xl px-10 placeholder:text-beh-gray-dark placeholder:text-lg ' placeholder='جست و جو ...!' dir='rtl'/>
                <span className="absolute inset-y-0 right-[7%] flex items-center pl-3" >
                    <svg className="h-5 w-5 fill-beh-gray-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                        height="30" viewBox="0 0 30 30">
                        <path
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                        </path>
                    </svg>
                </span>
            </label>

            </div>

            <div className="w-full flex flex-col items-center h-[55vh] mt-2 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray">

                { !loading && response
                ?
                      response?.filter((elm : responeType)=>{
                        const {  userOne , userTwo , userTwoId } = elm
                        const user_id = Number(localStorage.getItem('user-id'))
                        let reciver = userTwo

                        if (user_id == userTwoId) {
                          reciver = userOne
                        } 

                        return reciver?.profile?.name?.indexOf(chatListInput!) !== -1 

                    })?.map((elm : responeType)=>{
                        const { id , userOne , userTwo , userOneId , userTwoId , message } = elm
                        const user_id = Number(localStorage.getItem('user-id'))
                        let reciver = userTwo

                        if (user_id == userTwoId) {
                          reciver = userOne
                        }
                      
                        return <MessageListComponent myId={user_id} lastMessageSender={message?.at(0)?.senderId} lastdate={message?.at(0)?.date ? String(message?.at(0)?.date) : null } key={id} username={`${ reciver?.profile?.name ?  reciver?.profile?.name : 'کاربر'} ${reciver?.profile?.family ? reciver?.profile?.family : 'بدون نام'}`} messageList={message} chatid={id} useravatar={reciver.avatar ? `${BACK_END}${reciver.avatar}` : NoPeron.src}  />
                    }) 
                  : 
                    <ComponentLoading />                }
            </div>
            </div> 
            :
            <Remmitances shouldBeOpened={props.shouldBeOpened} />
        }


     </div>

    </>
  )
}



export const AllChatNoMessageFound = ()=>{
    return(
      <div className='w-full h-full flex justify-center items-center'>
          <div>
            <h1 className='font-semibold text-beh-gray text-lg'>
              پیامی موجود نیست
            </h1>
          </div>
      </div>
    )
}
export default AllChats