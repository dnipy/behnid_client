import { useRouter } from "next/router"
import { message } from "../../../types/async-prisma-types"

export const MessageListComponent = (props : {myId : number ,lastMessageSender : number | undefined ,username : string , chatid : number , useravatar : string ,messageList: message[] , lastdate :string | null})=>{
  const router = useRouter()  
  return (
      <div onClick={()=>router.push(`/chat/${props.chatid}`)} className=" cursor-pointer hover:bg-beh-gray-light/10 hover:rounded-lg w-[90%] mx-auto h-24  border-b-2 border-beh-gray-dark flex flex-row ">
  
          <div className="flex justify-center items-center w-[60px]  h-full px-1">
              <div>
                {
                  props.messageList.at(-1)?.recieverId == props.myId? 
                  <>
                    <div className=" rounded-full w-7 h-7 bg-beh-green-light flex items-center justify-center">
                        <h1 className="font-bold text-white">
                            {props.messageList?.length}
                        </h1>
                    </div>
                    <h1 className="text-center" >2m</h1>
                  </>
                  : 
                  null
                }
                
              </div>
          </div>
  
  
  
          <div className="flex justify-end items-center text-left w-full h-full px-2 ">
            <div>
              <h1 className="font-bold text-lg px-1">
                {props.username}
              </h1>
  
              <h2>
                {props.messageList.at(-1)?.text?.slice(0,14)  ? `${props.messageList.at(-1)?.text?.slice(0,14)}...`: 'پیامی موجود نیست'}
              </h2>
            </div>
          </div>
  
          <div className="flex justify-center items-center  h-full p-1">
            <div className="w-[70px] h-[70px] rounded-full bg-beh-gray"> 
            <img className="w-[70px] h-[70px] rounded-full " src={props.useravatar} />
  
            </div>
          </div>
  
          
      </div>
    )
  }
  