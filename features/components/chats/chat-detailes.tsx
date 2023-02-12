import React, { useEffect, useRef, useState } from 'react'
import { BiCheck, BiPlus, BiUser } from 'react-icons/bi'
import { BsCheckAll } from 'react-icons/bs'

function ChatDetailes(props : {shouldBeOpened : boolean}) {
  const [fields,setFields] = useState()
  const divref = useRef<any>()

  const scrollToBottom = () => {
    divref.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    scrollToBottom()
  },[])

  return (
    <div className={`h-[80vh] ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto  bg-white rounded-3xl`}>
                <div className="w-full   ">

                    {/* CHAT_HEADER */}
                    <div className="h-[14vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">
                        <div className='basis-11/12 h-full flex justify-center items-center'>
                          <div className='w-[98%] sm:w-[95%] h-14 flex  rounded-lg bg-beh-orange shadow-xl'>
                                <div className='basis-1/12  p-2 h-full flex justify-center items-center'>
                                  <BiUser className='fill-white w-10 h-10' />
                                </div>
                                <div className='w-11/12 h-full flex justify-center items-center text-center text-white  text-xl'>
                                  <div >
                                      <h1 >
                                        سعیده سبحانی
                                      </h1>
                                  </div>
                                </div>
                          </div>
                        </div>

                        <div className='basis-1/12 flex justify-end px-2 items-center'>
                            <div className='rounded-full w-[12vh] h-[12vh] bg-beh-gray'>

                            </div>
                        </div>
                    </div>





                    {/* MESSAGES_PART */}
                    <div className="h-[56vh]  px-10 w-full min-w-[340px]   overflow-y-auto  flex flex-row gap-4">
                      <div className='w-full    flex-col flex gap-1 '>
                        <UserMessageComponent text='safsd' />
                        <UserMessageComponent text='safsd' />
                        <SecondUserMessageComponent text='safsd'  />
                        <SecondUserMessageComponent text='safsd'  />
                        <div ref={divref} ></div>
                      </div>
                    </div>
                    

                  </div>



                    {/* INPUTS_PART */}
                    <div className="h-[10vh] w-full min-w-[340px] rounded-2xl  flex flex-row gap-4">

                      <div className='basis-1/12 flex  px-2 justify-center items-center'>
                          
                          <div className='w-[6.5vh] h-[6.5vh] flex justify-center items-center'>
                              <div className='w-[6.25vh] h-[6.25vh] bg-beh-orange rounded-full flex justify-center items-center'>
                                    <BiPlus className='w-[6vh] h-[6-vh] fill-white' />
                              </div>    
                            </div>
                      
                      </div>

                      <div className='basis-11/12 h-full flex justify-center items-center'>
                        <div className='w-[90%] sm:w-[95%] h-10 flex '>

                          <input placeholder='اینجا بنویس ...' className='w-9/12 placeholder:text-md text-right px-3 md:w-10/12 h-full flex justify-center border-r-2 rounded-r-lg  border-y-2 border-beh-gray items-center   text-beh-gray  text-xl'/>
                       
                          <div className='basis-3/12 md:w-2/12 bg-beh-green-light h-full flex rounded-l-lg shadow-lg justify-center text-white items-center'>
                            <h1>
                              ارسال
                            </h1>
                          </div>
                        </div>
                      </div>

                      
                    </div>


                </div>
    
  )
}


const UserMessageComponent = ( props : { text : string , does_seen?:boolean  })=>{
  return (
                        <div className="w-full  my-3 ">
                          <div className='w-[80%] sm:w-[70%] min-h-[70px]  bg-beh-gray flex flex-row gap-2'>
                            <div className='basis-11/12 px-10 py-4 h-full flex w-full text-right justify-center items-center'>
                              <h1 className='text-white text-sm w-full'>
                                {props.text}
                              </h1>
                            </div>
                            <div className='basis-1/12 p-2 flex justify-center items-center'>
                                {/* <BiCheck className='w-5 h-5 fill-beh-gray-light' /> */}
                                <BsCheckAll className='w-7 h-7 fill-beh-gray-light'  />
                            </div>
                          </div>
                        </div>

  )
}

const SecondUserMessageComponent = (props : {text : string})=>{
  return (
                        <div className="w-full  my-3  ">
                              <div className='w-[70%] min-h-[70px] float-left  bg-beh-green-light flex flex-row gap-2'>
                                <div className='basis-1/12  flex p-2 justify-center items-center'>
                                    {/* <BiCheck className='w-5 h-5 fill-beh-gray-light' /> */}
                                    <BsCheckAll className='w-7 h-7 fill-beh-gray-light'  />
                                </div>

                                <div className='basis-11/12 px-10 py-4 h-full flex w-full text-left justify-center items-center'>
                                  <h1 className='text-white text-sm w-full'>
                                      {props.text}
                                  </h1>
                                </div>
                                
                              </div>
                          </div>
  )
}


export default ChatDetailes