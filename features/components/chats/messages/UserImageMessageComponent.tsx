import { BiCheck, BiDollar } from "react-icons/bi"
import { BsCheckAll } from "react-icons/bs"
import { ChatDetailesFields, ChatDetailesModels } from "../../../../types/chat-datailes"
import { BACK_END } from "../../../../clients/localStorage"
import { useState } from "react"
import moment from "moment-jalaali"


export const UserImageMessageComponent = ( props : { date : Date,  fields: ChatDetailesFields , setFields : React.Dispatch<React.SetStateAction<ChatDetailesFields>> , id : number , text : string , does_seen?:boolean , replyedTO? : number , src : string ,  models : ChatDetailesModels , setModel  :React.Dispatch<React.SetStateAction<ChatDetailesModels>> ,liked : boolean ,LikeMessage: (message_id: number) => void   })=>{
    
  const [liked , setliked] = useState(props.liked)
  
  return (
                          <div className="w-full  my-3  ">
                            <div onDoubleClick={()=>{
                              props.setModel({...props.models,showUpdateMessage : true , ShowImageSrc : props.src , messageId : props.id , })
                              props.setFields({...props.fields , imageText : props.text  ,   })
                              console.log({
                                modal : props.models,
                                fields : props.fields
                              })
                            }}  className={` ${props.text ? ' w-[70%] ' : ' w-[50%]'}   rounded-md sm:rounded-none  min-h-[70px]  bg-beh-gray flex flex-row gap-2`}>
                              <div className='basis-full px-2 md:px-5 py-4 h-full gap-x-2 flex w-full flex-wrap text-right justify-center items-center'>
                                
                                <div className=" w-[130px]  rounded-md sm:rounded-none  min-h-[70px]  ">
                                    <img alt={props.text ? props.text : 'تصویر ارسال شده'} onClick={()=>props.setModel({...props.models , fullPic : true , fullPicSrc : props.src })} className='w-[290px] cursor-pointer h-auto rounded-md sm:rounded-none md:w-[120px]  mx-auto md:h-[120px]' src={BACK_END+props.src}/>
                                </div>
                                
                                <div className={` ${props.text ?  'max-w-[70%] w-full h-auto'  : 'hidden' }`}>
                                <h1 className='text-white text-lg w-full py-3'>
                                        {props.text}
                                    </h1>
                                </div>
  
                                  
                                <div className='w-full  bottom-4  flex justify-end items-center'>
                                    {props.does_seen ? <BsCheckAll className='w-7 h-7 fill-beh-gray-light'  /> :   <BiCheck className='w-5 h-5 fill-beh-gray-light' /> }  
                                  </div>
                           
  
                              </div>
                              
                            </div>

                            <div dir="rtl" className={`${props.text ? ' w-[70%] ' : ' w-[50%]'}   flex justify-end px-1 items-center`} >
                              <h1>
                                <>
                                {moment.loadPersian({usePersianDigits : true})}
                                { moment(props.date).locale(moment.locale('fa')).fromNow()}  
                                </>
                              </h1>    
                            </div>
                          </div>
  
    )
  }