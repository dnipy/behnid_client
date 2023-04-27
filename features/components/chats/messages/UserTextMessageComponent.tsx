import { useState } from "react"
import { BiCheck } from "react-icons/bi"
import { BsCheckAll, BsHeartFill } from "react-icons/bs"
import { ChatDetailesFields, ChatDetailesModels } from "../../../../types/chat-datailes"
import moment from 'moment-jalaali'

export const UserMessageComponent = ( props : { date :Date ,id : number , models : ChatDetailesModels , setModel  :React.Dispatch<React.SetStateAction<ChatDetailesModels>> ,fields: ChatDetailesFields , setFields : React.Dispatch<React.SetStateAction<ChatDetailesFields>>, text : string , does_seen?:boolean , replyedTO? : number , liked : boolean  })=>{
  const [liked , setliked] = useState(props.liked)
    
  return (
      <div className="w-full  my-3 ">
        <div onDoubleClick={()=>{
                              props.setModel({...props.models,showUpdateMessage : true , messageId : props.id , })
                              props.setFields({...props.fields , imageText : props.text  ,  })
                              console.log({
                                modal : props.models,
                                fields : props.fields
                              })
                            }} className='w-[70%] rounded-xl sm:w-[70%] min-h-[40px]  bg-beh-gray flex flex-row gap-2'>
        {liked &&
              <div className="relative h-full">
                <div className="absolute h-full ">
                  <BsHeartFill className="w-4 h-4 fill-beh-red mt-[30%] mr-1 " />
                </div>
              </div>
              }
          <div className='basis-11/12 px-2 md:px-5 py-2 h-full flex w-full text-right justify-center items-center'>
            <h1 className='text-white text-lg w-full'>
              {props.text}
            </h1>
          </div>

          <div className='basis-1/12 p-2 flex justify-center items-center'>
            {props.does_seen ? <BsCheckAll className='w-7 h-7 fill-beh-gray-light'  /> :   <BiCheck className='w-5 h-5 fill-beh-gray-light' /> }
              
          </div>
        </div>
          <div dir="rtl" className='w-[70%]   flex justify-end px-1 items-center'>
            <h1>
              <>
              {moment?.loadPersian({usePersianDigits : true})}
              { moment(props.date)?.locale(moment?.locale('fa'))?.fromNow()}  
              </>
            </h1>    
          </div>
      </div>
    )
  }