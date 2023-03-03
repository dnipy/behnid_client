import { ChatDetailesModels } from "../../../../types/chat-datailes"
import NoPerson from "../../../../assets/NoPerson.png"
import { BACK_END } from "../../../../clients/localStorage"
import { BsHeartFill } from "react-icons/bs"
import { useState } from "react"
import moment from "moment-jalaali"


export const SecondUserImageMessageComponent = (props : { date :Date , id : number , text : string , replyedTO? : number , src : string , models : ChatDetailesModels , setModel  :React.Dispatch<React.SetStateAction<ChatDetailesModels>> , liked : boolean , LikeMessage: (message_id: number) => void     })=>{
  const [liked , setliked] = useState(props.liked)
    
  return (
      <div className="w-full my-3 ">
        <div onDoubleClick={()=>{
          props.LikeMessage(props.id)
          setliked(!liked)
        }} className={` ${props.text ? 'sm:w-[70%] w-[70%]' : 'md:w-[50%] w-[70%] h-auto' }  rounded-md sm:rounded-none  float-left  bg-beh-green-light flex flex-row gap-2 `} >
                            
        {liked &&
          <div className="relative  my-2">
            <div className="absolute ">
              <BsHeartFill className="w-4 h-4 fill-beh-red md:mt-[10%] mt-[30%] mr-1 " />
            </div>
          </div>
        }

                                  
                                  
          <div className='basis-full px-2 md:px-5 py-4 h-full flex w-full flex-wrap text-right justify-center items-center'>

            <div className={` ${props.text ? 'max-w-[70%] order-2  w-full h-auto' : 'hidden'} `}>
                <h1 className='text-white text-lg w-full py-3'>
                    {props.text}
                </h1>
            </div>
  
  
            <div className=' mt-2 order-1  h-auto lg:order-2 w-[130px] md:h-auto flex justify-center items-center '>
                <img  alt={props.text ? props.text : 'تصویر ارسال شده'} onClick={()=>props.setModel({...props.models , fullPic : true , fullPicSrc : props.src })} className='w-[290px] h-auto rounded-md sm:rounded-none cursor-pointer md:w-[120px] md:h-[120px]' src={ BACK_END + props.src}/>
            </div>
  
          </div>
          
        </div>

        <div dir="rtl" className={`${props.text ? 'w-[70%]' : 'w-auto'} float-left  flex justify-start px-1 items-center`}>
              <h1>
                <>
                {moment.loadPersian({usePersianDigits : true})}
                {moment(props.date).locale(moment.locale('fa')).fromNow()}  
                </>
              </h1>    
        </div>
      </div>
  
  )
  }