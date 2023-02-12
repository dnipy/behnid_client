import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../../clients/axios';
import { BACK_END } from '../../../clients/localStorage';
import ErrorComponent from '../../../components/alerts/error';
import { Chats, message, Profile, User } from '../../../types/async-prisma-types';
import { MessageListComponent } from './MessageListComponents';
import NoPeron from '../../../assets/NoPerson.png'


type responeType = Chats & {
  message: message[];
  userOne: User & {
      profile: Profile;
  };
  userTwo: User & {
      profile: Profile;
  };
}

function AllChats(props : {shouldBeOpened : boolean}) {

    const [response, setResponse] = useState<Array<any>>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const [id,setId] = useState<number | undefined>()
    const [chatListInput,setChatlistInput] = useState<string >('')
    const [chatType,setChatType] = useState(1)
    const router = useRouter()
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
          setResponse(res.data as Array<any>);
          console.log(res.data)
        }
      })
      .catch((err) => {
        setError(err);
        console.log({err})
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])

  return (
    <>

     {error ? <ErrorComponent handle={setError} message={error} /> : null }
    <div className={`h-[80vh] ${props.shouldBeOpened ? 'basis-5/6 lg:basis-1/3' : 'hidden lg:block lg:basis-1/3'}  mx-auto bg-white rounded-3xl`} >
                <div className="w-full flex justify-center h-[6rem] items-center ">
                    <div className="h-14 w-[90%] rounded-2xl bg-white flex">
                        <div  onClick={chatType != 1 ?  ()=>setChatType(1) : undefined}  className={`w-1/2 ${chatType == 1 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'} transition-all duration-150  shadow-md flex justify-center items-center text-white rounded-r-2xl`}>
                              <h1 className="text-center font-bold text-lg ">
                                شخصی
                              </h1>
                        </div>

                        <div onClick={chatType != 2 ?  ()=>setChatType(2) : undefined} className={`w-1/2 ${chatType == 2 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'} transition-all duration-150 shadow-md flex justify-center items-center text-white  rounded-l-2xl`}>
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

                <div className="w-full flex flex-col items-center h-[55vh] mt-2 overflow-y-auto">
                    {/* <MessageListComponent />
                    <MessageListComponent />
                    <MessageListComponent />
                    <MessageListComponent />
                    <MessageListComponent />
                    <MessageListComponent /> */}
                    {!loading && response ?  response.filter((elm : responeType)=>{
                        const {  userOne , userTwo , userTwoId } = elm
                        const user_id = Number(localStorage.getItem('user-id'))
                        let reciver = userTwo

                        if (user_id == userTwoId) {
                          reciver = userOne
                        }

                        return reciver.profile.name?.indexOf(chatListInput!) !== -1 

                    }).map((elm : responeType)=>{
                        const { id , userOne , userTwo , userOneId , userTwoId , message } = elm
                        const user_id = Number(localStorage.getItem('user-id'))
                        let reciver = userTwo

                        if (user_id == userTwoId) {
                          reciver = userOne
                        }
                      
                        return <MessageListComponent myId={user_id} lastMessageSender={message.at(0)?.senderId} lastdate={message.at(0)?.date ? String(message.at(0)?.date) : null } key={id} username={`${reciver.profile.name!} ${reciver.profile.family!}`} messageList={message} chatid={id} useravatar={reciver.avatar ? `${BACK_END}${reciver.avatar}` : NoPeron.src}  />
                    }) : 
                    <div className='w-full h-full flex justify-center items-center'>
                        <div>
                          <h1 className='font-semibold text-beh-gray text-lg'>
                            پیامی موجود نیست
                          </h1>
                        </div>
                    </div>
                    }
                </div>
            </div>
    </>
  )
}

export default AllChats