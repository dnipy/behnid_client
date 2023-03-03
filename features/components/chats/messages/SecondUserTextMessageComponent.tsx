import moment from "moment-jalaali"
import { useState } from "react"
import { BiHeart } from "react-icons/bi"
import { BsHeartFill } from "react-icons/bs"

export const SecondUserMessageComponent = (props : { date : Date, text : string , liked : boolean , replyedTO? : number , id : number , like : (message_id: number) => void})=>{
    const [liked , setliked] = useState(props.liked)
    return (
                          <div className="w-full my-3">
                                <div onDoubleClick={()=>{
                                  props.like(props.id)
                                  setliked(!liked)
                                }} className='w-[70%] rounded-md sm:rounded-none min-h-[70px] float-left  bg-beh-green-light flex flex-row gap-2'>
                                  
                                  {liked &&
                                  <div className="relative h-full">
                                    <div className="absolute h-full ">
                                      <BsHeartFill className="w-4 h-4 fill-beh-red mt-[30%] mr-1 " />
                                    </div>
                                  </div>
                                  }

                                  <div className='basis-full px-2 md:px-5 py-4 h-full flex w-full text-left justify-center items-center'>
                                    <h1 className='text-white text-lg w-full'>
                                        {props.text}
                                    </h1>
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