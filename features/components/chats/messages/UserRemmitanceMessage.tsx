import { BiCheck, BiDollar } from "react-icons/bi"
import { BsCheckAll, BsHeartFill } from "react-icons/bs"
import { ChatDetailesModels } from "../../../../types/chat-datailes"
import { BACK_END } from "../../../../clients/localStorage"
import { useState } from "react"


export const UserRemmitanceMessageComponent = ( props : { id: number , text : string , does_seen?:boolean , replyedTO? : number , src : string ,  models : ChatDetailesModels , setModel  :React.Dispatch<React.SetStateAction<ChatDetailesModels>> ,liked : boolean ,LikeMessage: (message_id: number) => void    })=>{
  const [liked , setliked] = useState(props.liked)
    
  return (
                          <div className="w-full  my-3 ">
                            
                            <div className={` ${props.text ? 'sm:w-[70%] w-[70%]' : 'w-[300px] md:w-[150px]' }  rounded-md sm:rounded-none  min-h-[70px]  bg-beh-gray `}>
                              
                            {liked &&
                                  
                                  <div className='max-w-[90%] md:max-w-[70%] pt-2 w-full '>
                                  <BsHeartFill className="w-4 h-4 fill-beh-red mr-1 " />
                                  </div>
                                
                              }

                              <div className='basis-full px-2  flex-row gap-2 md:px-5  h-full flex w-full flex-wrap text-right justify-center items-center'>
                                
                                <div className={` ${props.text ? ' h-auto md:w-[130px] md:h-auto flex justify-center items-center' : 'hidden'} mt-5  `}>
                                    <img onClick={()=>props.setModel({...props.models , fullPic : true , fullPicSrc : props.src })} className='w-[290px] cursor-pointer h-auto rounded-md sm:rounded-none md:w-[120px] md:h-[120px]' src={BACK_END+props.src}/>
                                </div>
                                
                                <div className='max-w-[90%] md:max-w-[70%] w-full h-auto'>
                                    <h1 className='text-white text-lg w-full p-4'>
                                        {props.text}
                                    </h1>
                                </div>
  
                                <div className='w-full  bottom-4 my-2  flex justify-between items-center'>
                                    
                                    <div >
                                      <div className="w-20 h-8 rounded-full justify-center items-center border-2  border-beh-green-light">
                                            <div className="flex justify-center gap-1 text-beh-green-light h-full items-center">
                                                <div className="pt-1">
                                                  <BiDollar />
                                                </div>
                                                <div>
                                                  <h1>حواله</h1>
                                                </div>
                                            </div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      {props.does_seen ? <BsCheckAll className='w-7 h-7 fill-beh-gray-light'  /> :   <BiCheck className='w-5 h-5 fill-beh-gray-light' /> }  
                                    </div>

                                  </div>
                              </div>
                              
                            </div>
                          </div>
  
    )
  }