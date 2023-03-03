import { BiCheck, BiDollar } from "react-icons/bi"
import { BsCheckAll, BsHeartFill } from "react-icons/bs"
import { ChatDetailesModels } from "../../../../types/chat-datailes"
import { BACK_END } from "../../../../clients/localStorage"
import { useState } from "react"
import { MdPictureAsPdf } from "react-icons/md"
import moment from "moment-jalaali"


export const SecondUserPdfMessageComponent = ( props : { date : Date, id: number , text : string , does_seen?:boolean , replyedTO? : number , src : string ,  models : ChatDetailesModels , setModel  :React.Dispatch<React.SetStateAction<ChatDetailesModels>> ,liked : boolean ,LikeMessage: (message_id: number) => void    })=>{
  const [liked , setliked] = useState(props.liked)
    
  return (
                          <div className="w-full  my-3 ">
                            
                            <div onDoubleClick={()=>{
                                  props.LikeMessage(props.id)
                                  setliked(!liked)
                                }} className={` ${props.src ? 'sm:w-[150px] w-[70%]' : 'w-[300px] md:w-[150px]' } rounded-md sm:rounded-none  min-h-[70px]  float-left bg-beh-green-light `}>
                              
                            {liked &&
                                  
                                  <div className='max-w-[90%] md:max-w-[70%] pt-2 w-full '>
                                  <BsHeartFill className="w-4 h-4 fill-beh-red mr-1 " />
                                  </div>
                                
                              }

                              <div className='basis-full px-2  flex-row gap-2 md:px-5  h-full flex w-full flex-wrap text-right justify-center items-center'>
                                

{/*                                 
                                <div className='max-w-[70%] w-full h-auto'>
                                    <h1 className='text-white text-lg w-full py-3'>
                                        {props.text}
                                    </h1>
                                </div>
   */}
                                <div className={` ${props.src ? ' h-auto md:w-[130px] md:h-auto cursor-pointer flex justify-center items-center' : 'hidden'} mt-5  `}>
                                    {/* <img onClick={()=>props.setModel({...props.models , fullPic : true , fullPicSrc : props.src })} className='w-[290px] cursor-pointer h-auto rounded-md sm:rounded-none md:w-[120px] md:h-[120px]' src={BACK_END+props.src}/> */}
                                    <div onClick={()=>window.open(`${BACK_END}${props.src}`)}>
                                        <MdPictureAsPdf className="w-14 h-14 fill-white" />
                                    </div>
                                </div>
                                
                                <div className='w-full  bottom-4 my-2  flex justify-start items-center'>
{/*                                     
                                    <div >
                                      <div className="w-20 h-8 rounded-full justify-center items-center border-2  border-beh-gray-dark">
                                            <div className="flex justify-center gap-1 text-beh-gray-dark h-full items-center">
                                                <div className="pt-1">
                                                  <BiDollar />
                                                </div>
                                                <div>
                                                  <h1>حواله</h1>
                                                </div>
                                            </div>
                                      </div>
                                    </div> */}
                                    
                                
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