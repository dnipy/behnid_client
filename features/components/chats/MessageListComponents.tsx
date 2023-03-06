import { useRouter } from "next/router"
import { message } from "../../../types/async-prisma-types"

export const MessageListComponent = (props : {myId : number ,lastMessageSender : number | undefined ,username : string , chatid : number , useravatar : string ,messageList: message[] , lastdate :string | null})=>{
  const router = useRouter()
  const {id} = router.query

  return (
      <div onClick={()=>router.push(`/chat/${props.chatid}`)} className={` ${props.chatid == Number(id) ? 'bg-beh-orange text-white rounded-lg'  : "hover:bg-beh-gray-light/10 cursor-pointer" }    hover:rounded-lg w-[90%] mx-auto h-24  border-b-2 border-beh-gray-dark flex flex-row `}>
  
          <div className="flex justify-center items-center w-[60px]  h-full px-1">
              <div>
                {
                  props.messageList.at(0)?.recieverId == props.myId  && props.messageList.at(0)?.hasSeen != true ? 
                  <>
                    <div className=" rounded-full w-7 h-7 bg-beh-green-light flex items-center justify-center">
                        <h1 className="font-bold text-white">
                            {props.messageList?.filter(elm => elm.hasSeen != true).length}
                        </h1>
                    </div>
                    {/* <h1 className="text-center" >2m</h1> */}
                  </>
                  : 
                  null
                }
                
              </div>
          </div>
  
  
  
          <div className="flex justify-start items-center text-right w-full h-full px-2 ">
            <div>
              <h1 className="font-bold text-right  text-lg px-1">
                {props.username}
              </h1>
  
              <h2 className="px-1">
                {props.messageList.at(0)?.text  ? `${props.messageList.at(0)?.text?.slice(0,14)}...`: props.messageList.length > 0 ? ' مشاهده فایل' : 'پیامی موجود نیست'}
              </h2>

            </div>
          </div>
  
          <div className="flex justify-center items-center  h-full p-1">
            <div className="w-[70px] overflow-hidden h-[70px] rounded-full flex justify-center items-center bg-beh-gray"> 
              {props.useravatar &&  <img width='100%' height='100%' className="max-w-[70px] max-h-[70px] w-auto h-auto relative  " alt={`عکس پروفایل ${props.username}`} src={props.useravatar} />}
            </div>
          </div>
  
          
      </div>
    )
}
  