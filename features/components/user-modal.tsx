import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsCreditCardFill, BsEye } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import NoImg from '../../assets/NoImg.png'
import { AuthorizedApiRequest } from '../../clients/axios'
import { BACK_END } from '../../clients/localStorage'
import ErrorComponent from '../../components/alerts/error'
import FreeRequestComponent from '../../components/FreeRequestComponent'
import { City, Connections, FreeRequests, Product, sellerProfile, Unit, User } from '../../types/async-prisma-types'
import { ChatDetailesModels } from '../../types/chat-datailes'
import WarnComponent from '../../components/alerts/warn'
import { userModelResponseType } from '../../types/users'




function UserModal(props : {models : ChatDetailesModels  , setModels : React.Dispatch<React.SetStateAction<ChatDetailesModels>> , id : number}) {
  const [loading,setloading] = useState(false)
  const [connection,setConnection] = useState({followers : 0 , following : 0})
  const [error,setError] = useState('')
  const [info,setInfo] = useState('')
  const [response, setResponse] = useState<userModelResponseType | null>(null);
  const router = useRouter();

  useEffect(()=>{
    console.log('sent')

      setloading(true)
      setTimeout(() => {
        AuthorizedApiRequest
        .get(`/users/single?userID=${props.id}`)
        .then((res) => {
            console.log('sent')
            console.log(res.data)
            if (res.data?.err) {
              setError(res.data.err)
            }
            else {
              console.log(res.data)
              setResponse(res.data as userModelResponseType)

              setConnection({
                followers : res?.data?.connection?.follower?.length  ? res?.data?.connection?.follower?.length  : 0,
                following : res?.data?.connection?.following?.length ? res?.data?.connection?.following?.length : 0
              })
            }
        })
        .catch((err) => {
          setError('خطا');
          console.log({err})
        })
        .finally(() => {
          setloading(false)
        });
      }, 100);
  },[])



  const  FollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/follow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : true , })
            setConnection({...connection,followers : connection.followers+1})
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  const  unFollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/unfollow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : false})
            setConnection({...connection,followers : connection.followers-1})

          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  return (
    <>
    {error &&  <ErrorComponent handle={setError} message={error} />}
    {info && <WarnComponent handle={setInfo} message={info} />}
    <div className='fixed top-0 w-full lg:max-w-7xl mx-auto h-screen backdrop-blur-md bg-white/30 z-40 ' >
    {/* CENTER_DATA_PART */}
    <div className='fixed flex w-full lg:max-w-7xl ml-5 md:mx-auto   h-[95vh] justify-center items-center'>
        <div dir='rtl' className='w-[300px] -z-[2]  md:w-[600px] shadow-xl  min-w-[325px]  mx-auto  h-[86vh]   bg-white rounded-3xl overflow-y-auto  scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
        <div className="relative">
                                <div onClick={()=>props.setModels({...props.models , userProfileOpen : false})}  className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer top-1 right-1 rounded-full z-10 flex justify-center items-center ">
                                    <MdClose className="w-6 h-6 fill-white" />
                                </div>
                            </div>
        <div className="relative -z-[1]">
        

          <div className="absolute w-full h-[90px] bg-beh-green-super-light">

          </div>

          <div className="absolute w-full mt-[89px] h-[110px] bg-beh-gray">

           </div>
        </div>

        

        <div className="z-[2] w-full h-[199px] flex flex-row gap-x-1 shadow-xl">
          <div className="w-[40%] h-full ">


          <div className='mx-[10px] mt-6 flex justify-center md:mx-[20px] lg:mx-[35px]'>
                    <div >
                      <div className="z-[5] w-[115px] h-[115px] bg-white flex justify-center items-center rounded-full">
                        <div className=' z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                            <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'>
                              <img src={response?.avatar ? BACK_END+response.avatar : NoImg.src} className='w-full h-full rounded-full' />
                            </div>
                        </div> 
                      </div>
                    </div>
                    
                </div>


                <div className="w-full h-[50px] mx-auto my-1 gap-x-1 flex flex-row justify-center items-center ">
                    

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {connection.followers}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                        {connection?.following}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <BsCreditCardFill className="w-5 h-5 fill-white" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {response?.xp_score}
                          
                        </h1>
                      </div>
                    </div>
                </div>
          </div>


          <div className="w-[60%] h-full ">
            <div className="flex w-full h-[90px]">
              <div className={` ${response?.sellerProfile?.site_avatar ? 'w-3/5' : 'w-full'}  text-center h-full`}>
                  <h1 className={`font-bold text-lg text-white ${response?.sellerProfile?.shopName ? 'mt-2' : 'mt-5'} `}>
                    {response?.profile?.name ? response?.profile?.name : 'کاربر'} {response?.profile?.family ? response?.profile?.family : 'بدون نام'}
                  </h1>
                  
                  {
                    response?.sellerProfile?.shopName &&  
                          <h1 onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="pt-[0.15rem] cursor-pointer text-beh-gray-dark font-semibold">
                          {`صاحب فروشگاه ${response.sellerProfile?.shopName}`}
                          </h1>
                  }
                  
              </div>
              {response?.sellerProfile?.site_avatar &&
              <div onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="w-2/5 cursor-pointer p-1 h-full flex justify-center items-center">
                <div className="w-5/6 h-2/3 md:w-2/5 mx-2 border-4 border-beh-gray">
                  
                </div>
              </div>
              }

              
            </div>


            <div className="w-[80%]    mx-auto h-7 mt-2 mb-1s flex justify-end  ">
              <div onClick={response?.FollowedByME != true ? ()=> FollowUser(response?.id) : ()=> unFollowUser(response?.id) } className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-orange">
                <h1>{response?.FollowedByME != true ? 'دنبال کردن' : 'لغو دنبال کردن'}</h1>
              </div>
            </div>

            <div onClick={() => {
                navigator.clipboard.writeText(`https://behnid.com/user/${response?.id}`)
                setInfo('کپی شد!')
                }} className="w-[80%]  mx-auto h-7 my-1 flex justify-start  ">
              <div className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-[#0094C2]">
                <h1>اشتراک</h1>
              </div>
            </div>

            <div className="w-[80%]    mx-auto h-7 my-1 flex justify-end  ">
                <div onClick={response?.id ? ()=>router.push(`/chat/new-chat?id=${response?.id}`) : undefined} className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-yellow">
                  <h1>گفت و گو</h1>
                </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] px-3 py-2">
          <div className="flex h-[35px] my-5">
            <div className="w-full  border-b-[3px] border-gray-300 ">
              <h1 className="text-lg text-orange-500 pr-2 font-bold ">{response?.sellerProfile?.shopName ? 'آخرین محصولات' : 'اخرین درخواست ها'}</h1>
            </div>
            
          </div>

          {
             response?.sellerProfile?.shopName ?
                response?.sellerProfile?.products?.map((elm)=>(
                  <>
                  <div className=" w-[220px] my-3 mx-auto h-[100px] rounded-xl cursor-pointer bg-beh-orange shadow-2xl ">
                  <h1 className="text-white h-[20px] font-semibold text-center">نام محصول</h1>
                  <div className=" w-full  mt-[6px] rounded-xl h-[75px] flex flex-row bg-beh-gray">
                      <div className="w-[15%] h-full">
                        <div className="  w-full h-full">
                              <h1 className="rotate-90 text-beh-orange text-sm  py-6  ">
                                  رایگان
                              </h1>
                        </div>
                      </div>
                      <div className="w-[85%] h-full bg-white rounded-xl flex flex-row">
                          <div className=" w-full px-1   h-full">
                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%]  text-xs  pt-1">
                                      <h1>بارگیری</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>کرج</h1>
                                  </div>
                              </div>

                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%] text-xs  pt-1 ">
                                      <h1>قیمت</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>2,000,000</h1>
                                  </div>
                              </div>
                          </div>
                          <img src={NoImg.src} className="w-[75px] h-[75px] border-4 rounded-xl border-beh-gray-light" alt="" />
                      </div>
                  </div>
                  </div>
                  </>
                ))
              :
                response?.freeRequests?.map((elm)=>(
                <>
                  <FreeRequestComponent scale={true} onClick={()=>router.push(`/chat/new-chat?id=${elm?.authorID}`)} avatar={response?.avatar} username={response?.profile?.name + ' ' + response?.profile?.family} date={elm?.date.toString()} describe={elm?.describe} id={elm?.id} recive_location={elm?.city?.name ? elm?.city?.name : 'نامشخص'} title={elm?.name}  />
                  {response?.freeRequests?.length < 1 && <h1 className='text-center'> درخواستی یافت نشد </h1>}
                </>
                ))
          }

          {
            response?.sellerProfile?.shopName 
              ?
                <>
                  {response?.sellerProfile?.products?.length == 0 && <h1 className='text-center'> محصولی یافت نشد </h1>}
                </>
              :
              <>
                  {response?.freeRequests?.length == 0 && <h1 className='text-center '> درخواستی یافت نشد </h1>}
              </>
        }

        </div>

        </div>
    </div>
 </div>
  </>
  )
}


export function UserModalMine(props : { setModels : React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading,setloading] = useState(false)
  const [connection,setConnection] = useState({followers : 0 , following : 0})
  const [error,setError] = useState('')
  const [info,setInfo] = useState('')
  const [response, setResponse] = useState<userModelResponseType | null>(null);
  const router = useRouter();

  useEffect(()=>{
    console.log('sent')

      setloading(true)
      setTimeout(() => {
        AuthorizedApiRequest
        .get(`/users/single/mine`)
        .then((res) => {
            console.log('sent')
            console.log(res.data)
            if (res.data?.err) {
              setError(res.data.err)
            }
            else {
              console.log(res.data)
              setResponse(res.data as userModelResponseType)

              setConnection({
                followers : res?.data?.connection?.follower?.length  ? res?.data?.connection?.follower?.length  : 0,
                following : res?.data?.connection?.following?.length ? res?.data?.connection?.following?.length : 0
              })
            }
        })
        .catch((err) => {
          setError('خطا');
          console.log({err})
        })
        .finally(() => {
          setloading(false)
        });
      }, 100);
  },[])



  const  FollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/follow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : true , })
            setConnection({...connection,followers : connection.followers+1})
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  const  unFollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/unfollow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : false})
            setConnection({...connection,followers : connection.followers-1})

          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  return (
    <>
    {error &&  <ErrorComponent handle={setError} message={error} />}
    {info && <WarnComponent handle={setInfo} message={info} />}

    <div className='fixed top-0 right-0 left-0 w-[100vw] lg:max-w-7xl mx-auto  bg-white/30 z-40 ' >
    {/* CENTER_DATA_PART */}
    <div className='fixed flex w-full lg:max-w-7xl  md:mx-auto  mt-[2.5vh]  h-[95vh] justify-center items-center'>
        <div dir='rtl' className='w-[300px]    -z-[2]  md:w-[600px] shadow-2xl  min-w-[325px]  mx-auto  h-[86vh]   bg-white rounded-3xl overflow-y-auto  scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
        <div className="relative">
                                <div onClick={()=>props.setModels(false)}  className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer top-1 right-1 rounded-full z-10 flex justify-center items-center ">
                                    <MdClose className="w-6 h-6 fill-white" />
                                </div>
                            </div>
        <div className="relative -z-[1]">
        

          <div className="absolute w-full h-[90px] bg-beh-green-super-light">

          </div>

          <div className="absolute w-full mt-[89px] h-[110px] bg-beh-gray">

           </div>
        </div>

        

        <div className="z-[2] w-full h-[199px] flex flex-row gap-x-1 shadow-xl">
          <div className="w-[40%] h-full ">


          <div className='mx-[10px] mt-6 flex justify-center md:mx-[20px] lg:mx-[35px]'>
                    <div >
                      <div className="z-[5] w-[115px] h-[115px] bg-white flex justify-center items-center rounded-full">
                        <div className=' z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                            <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'>
                              <img src={response?.avatar ? BACK_END+response.avatar : NoImg.src} className='w-full h-full rounded-full' />
                            </div>
                        </div> 
                      </div>
                    </div>
                    
                </div>


                <div className="w-full h-[50px] mx-auto my-1 gap-x-1 flex flex-row justify-center items-center ">
                    

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {connection.followers}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                        {connection?.following}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <BsCreditCardFill className="w-5 h-5 fill-white" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {response?.xp_score}
                          
                        </h1>
                      </div>
                    </div>
                </div>
          </div>


          <div className="w-[60%] h-full ">
            <div className="flex w-full h-[90px]">
              <div className={` ${response?.sellerProfile?.site_avatar ? 'w-3/5' : 'w-full'}  text-center h-full`}>
                  <h1 className={`font-bold text-lg text-white ${response?.sellerProfile?.shopName ? 'mt-2' : 'mt-5'} `}>
                    {response?.profile?.name ? response?.profile?.name : 'کاربر'} {response?.profile?.family ? response?.profile?.family : 'بدون نام'}
                  </h1>
                  
                  {
                    response?.sellerProfile?.shopName &&  
                          <h1 onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="pt-[0.15rem] cursor-pointer text-beh-gray-dark font-semibold">
                          {`صاحب فروشگاه ${response.sellerProfile?.shopName}`}
                          </h1>
                  }
                  
              </div>
              {response?.sellerProfile?.site_avatar &&
              <div onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="w-2/5 cursor-pointer p-1 h-full flex justify-center items-center">
                <div className="w-5/6 h-2/3 md:w-2/5 mx-2 border-4 border-beh-gray bg-beh-gray-light">
                    <img src={BACK_END + response?.sellerProfile?.site_avatar } alt={`فروشگاه ${response.sellerProfile?.shopName}`} />
                </div>
              </div>
              }

              
            </div>


            <div className="w-[80%]    mx-auto h-7 mt-2 mb-1s flex justify-end  ">
              <div onClick={response?.FollowedByME != true ? ()=> FollowUser(response?.id) : ()=> unFollowUser(response?.id) } className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-orange">
                <h1>{response?.FollowedByME != true ? 'دنبال کردن' : 'لغو دنبال کردن'}</h1>
              </div>
            </div>

            <div className="w-[80%]    mx-auto h-7 my-1 flex justify-start  ">
              <div onClick={() => {
                navigator.clipboard.writeText(`https://behnid.com/user/${response?.id}`)
                setInfo('کپی شد!')
                }} className="w-[75%]  text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-[#0094C2]">
                <h1>اشتراک</h1>
              </div>
            </div>

            <div className="w-[80%]    mx-auto h-7 my-1 flex justify-end  ">
                <div onClick={response?.id ? ()=>router.push(`/chat/new-chat?id=${response?.id}`) : undefined} className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-yellow">
                  <h1>گفت و گو</h1>
                </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] px-3 py-2">
          <div className="flex h-[35px] my-5">
            <div className="w-full  border-b-[3px] border-gray-300 ">
              <h1 className="text-lg text-orange-500 pr-2 font-bold ">{response?.sellerProfile?.shopName ? 'آخرین محصولات' : 'اخرین درخواست ها'}</h1>
            </div>
            
          </div>

          {
             response?.sellerProfile?.shopName ?
                response?.sellerProfile?.products?.map((elm)=>(
                  <>
                  <div className=" w-[220px] my-3 mx-auto h-[100px] rounded-xl cursor-pointer bg-beh-orange shadow-2xl ">
                  <h1 className="text-white h-[20px] font-semibold text-center">نام محصول</h1>
                  <div className=" w-full  mt-[6px] rounded-xl h-[75px] flex flex-row bg-beh-gray">
                      <div className="w-[15%] h-full">
                        <div className="  w-full h-full">
                              <h1 className="rotate-90 text-beh-orange text-sm  py-6  ">
                                  رایگان
                              </h1>
                        </div>
                      </div>
                      <div className="w-[85%] h-full bg-white rounded-xl flex flex-row">
                          <div className=" w-full px-1   h-full">
                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%]  text-xs  pt-1">
                                      <h1>بارگیری</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>کرج</h1>
                                  </div>
                              </div>

                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%] text-xs  pt-1 ">
                                      <h1>قیمت</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>2,000,000</h1>
                                  </div>
                              </div>
                          </div>
                          <img src={NoImg.src} className="w-[75px] h-[75px] border-4 rounded-xl border-beh-gray-light" alt="" />
                      </div>
                  </div>
                  </div>
                  </>
                ))
              :
                response?.freeRequests?.map((elm)=>(
                <>
                  <FreeRequestComponent scale={true} onClick={()=>router.push(`/chat/new-chat?id=${elm?.authorID}`)} avatar={response?.avatar} username={response?.profile?.name + ' ' + response?.profile?.family} date={elm?.date.toString()} describe={elm?.describe} id={elm?.id} recive_location={elm?.city?.name ? elm?.city?.name : 'نامشخص'} title={elm?.name}  />
                  {response?.freeRequests?.length < 1 && <h1 className='text-center'> درخواستی یافت نشد </h1>}
                </>
                ))
          }

          {
            response?.sellerProfile?.shopName 
              ?
                <>
                  {response?.sellerProfile?.products?.length == 0 && <h1 className='text-center'> محصولی یافت نشد </h1>}
                </>
              :
              <>
                  {response?.freeRequests?.length == 0 && <h1 className='text-center '> درخواستی یافت نشد </h1>}
              </>
        }

        </div>

        </div>
    </div>
 </div>
  </>
  )
}


export function UserModalBoolean(props : {models : boolean  , setModels : React.Dispatch<React.SetStateAction<boolean>> , id : number}) {
  const [loading,setloading] = useState(false)
  const [connection,setConnection] = useState({followers : 0 , following : 0})
  const [error,setError] = useState('')
  const [info,setInfo] = useState('')
  const [response, setResponse] = useState<userModelResponseType | null>(null);
  const router = useRouter();

  useEffect(()=>{
    console.log('sent')

      setloading(true)
      setTimeout(() => {
        AuthorizedApiRequest
        .get(`/users/single?userID=${props.id}`)
        .then((res) => {
            console.log('sent')
            console.log(res.data)
            if (res.data?.err) {
              setError(res.data.err)
            }
            else {
              console.log(res.data)
              setResponse(res.data as userModelResponseType)

              setConnection({
                followers : res?.data?.connection?.follower?.length  ? res?.data?.connection?.follower?.length  : 0,
                following : res?.data?.connection?.following?.length ? res?.data?.connection?.following?.length : 0
              })
            }
        })
        .catch((err) => {
          setError('خطا');
          console.log({err})
        })
        .finally(() => {
          setloading(false)
        });
      }, 100);
  },[])



  const  FollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/follow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : true , })
            setConnection({...connection,followers : connection.followers+1})
          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  const  unFollowUser = (id : number | undefined)=>{
    if (!id) return
    setloading(true)
    const fbody = {
      id 
    }
    AuthorizedApiRequest
      .post('/connections/unfollow',fbody)
        .then((resp)=>{
          if (resp.data?.msg) {
            console.log(resp.data)
            setResponse({...response! , FollowedByME : false})
            setConnection({...connection,followers : connection.followers-1})

          }
          else {
            setError(resp.data?.err)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setloading(false)
        })
  }


  return (
    <>
    {error &&  <ErrorComponent handle={setError} message={error} />}
    {info && <WarnComponent handle={setInfo} message={info} />}
    <div className='fixed top-0 right-0 left-0 w-[100vw] lg:max-w-7xl mx-auto backdrop-blur-md  bg-white/30 z-40 ' >
    {/* CENTER_DATA_PART */}
    <div className='fixed flex w-full lg:max-w-7xl  md:mx-auto    h-[100vh] justify-center items-center'>
        <div dir='rtl' className='w-[300px]    -z-[2]  md:w-[600px] shadow-2xl  min-w-[325px]  mx-auto  h-[95vh]   bg-white rounded-3xl overflow-y-auto  scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>        <div className="relative">
                                
                            </div>
        <div className="relative -z-[1]">
        

          <div className="absolute w-full h-[90px] bg-beh-green-super-light">

          </div>

          <div className="absolute w-full mt-[89px] h-[110px] bg-beh-gray">

           </div>
        </div>

        

        <div className="z-[2] w-full h-[199px] flex flex-row gap-x-1 shadow-xl">
          <div className="w-[40%] h-full ">


          <div className='mx-[10px] mt-6 flex justify-center md:mx-[20px] lg:mx-[35px]'>
                    <div >
                      <div className="z-[5] w-[115px] h-[115px] bg-white flex justify-center items-center rounded-full">
                        <div className=' z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                            <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'>
                              <img src={response?.avatar ? BACK_END+response.avatar : NoImg.src} className='w-full h-full rounded-full' />
                            </div>
                        </div> 
                      </div>
                    </div>
                    
                </div>


                <div className="w-full h-[50px] mx-auto my-1 gap-x-1 flex flex-row justify-center items-center ">
                    

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {connection.followers}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <FiUsers className="w-5 h-5 text-white fill-beh-gray" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                        {connection?.following}
                        </h1>
                      </div>
                    </div>

                    <div className="w-[40px] h-[50px] ">
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <BsCreditCardFill className="w-5 h-5 fill-white" />
                      </div>
                      <div className="flex justify-center items-center h-1/2 w-full">
                        <h1 className="text-beh-orange text-center ">
                          {response?.xp_score}
                          
                        </h1>
                      </div>
                    </div>
                </div>
          </div>


          <div className="w-[60%] h-full ">
            <div className="flex w-full h-[90px]">
              <div className={` ${response?.sellerProfile?.site_avatar ? 'w-3/5' : 'w-full'}  text-center h-full`}>
                  <h1 className={`font-bold text-lg text-white ${response?.sellerProfile?.shopName ? 'mt-2' : 'mt-5'} `}>
                    {response?.profile?.name ? response?.profile?.name : 'کاربر'} {response?.profile?.family ? response?.profile?.family : 'بدون نام'}
                  </h1>
                  
                  {
                    response?.sellerProfile?.shopName &&  
                          <h1 dir="rtl" onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="pt-[0.15rem] cursor-pointer text-beh-gray-dark font-semibold">
                          {`صاحب فروشگاه ${response.sellerProfile?.shopName}`}
                          </h1>
                  }
                  
              </div>
              {response?.sellerProfile?.site_avatar &&
              <div onClick={()=>router.push(`/sellers/${response.sellerProfile?.id}`)} className="w-2/5 cursor-pointer p-1 h-full flex justify-center items-center">
                <div className="w-5/6 h-2/3 md:w-2/5 mx-2 border-4 bg-beh-gray-light border-beh-gray">
                  <img src={BACK_END + response.sellerProfile?.site_avatar} alt={`فروشگاه ${response.sellerProfile?.shopName}`} />
                </div>
              </div>
              }

              
            </div>


            <div className="w-[80%]    mx-auto h-7 mt-2 mb-1s flex justify-end  ">
              <div onClick={response?.FollowedByME != true ? ()=> FollowUser(response?.id) : ()=> unFollowUser(response?.id) } className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-orange">
                <h1>{response?.FollowedByME != true ? 'دنبال کردن' : 'لغو دنبال کردن'}</h1>
              </div>
            </div>

            <div onClick={() => {
                navigator.clipboard.writeText(`https://behnid.com/user/${response?.id}`)
                setInfo('کپی شد!')
                }} className="w-[80%]  mx-auto h-7 my-1 flex justify-start  ">
              <div className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-[#0094C2]">
                <h1>اشتراک</h1>
              </div>
            </div>

            <div className="w-[80%]    mx-auto h-7 my-1 flex justify-end  ">
                <div onClick={response?.id ? ()=>router.push(`/chat/new-chat?id=${response?.id}`) : undefined} className="w-[75%] text-white cursor-pointer text-center text-sm rounded-lg border-b-4 border-beh-gray-dark h-full bg-beh-yellow">
                  <h1>گفت و گو</h1>
                </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] px-3 py-2">
          <div className="flex h-[35px] my-5">
            <div className="w-full  border-b-[3px] border-gray-300 ">
              <h1 className="text-lg text-orange-500 pr-2 font-bold ">{response?.sellerProfile?.shopName ? 'آخرین محصولات' : 'اخرین درخواست ها'}</h1>
            </div>
            
          </div>

          {
             response?.sellerProfile?.shopName ?
                response?.sellerProfile?.products?.map((elm)=>(
                  <>
                  <div className=" w-[220px] my-3 mx-auto h-[100px] rounded-xl cursor-pointer bg-beh-orange shadow-2xl ">
                  <h1 className="text-white h-[20px] font-semibold text-center">نام محصول</h1>
                  <div className=" w-full  mt-[6px] rounded-xl h-[75px] flex flex-row bg-beh-gray">
                      <div className="w-[15%] h-full">
                        <div className="  w-full h-full">
                              <h1 className="rotate-90 text-beh-orange text-sm  py-6  ">
                                  رایگان
                              </h1>
                        </div>
                      </div>
                      <div className="w-[85%] h-full bg-white rounded-xl flex flex-row">
                          <div className=" w-full px-1   h-full">
                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%]  text-xs  pt-1">
                                      <h1>بارگیری</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>کرج</h1>
                                  </div>
                              </div>

                              <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                  <div className="h-full w-[40%] text-xs  pt-1 ">
                                      <h1>قیمت</h1>
                                  </div>
                                  <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                      <h1>2,000,000</h1>
                                  </div>
                              </div>
                          </div>
                          <img src={NoImg.src} className="w-[75px] h-[75px] border-4 rounded-xl border-beh-gray-light" alt="" />
                      </div>
                  </div>
                  </div>
                  </>
                ))
              :
                response?.freeRequests?.map((elm)=>(
                <>
                  <FreeRequestComponent scale={true} onClick={()=>router.push(`/chat/new-chat?id=${elm?.authorID}`)} avatar={response?.avatar} username={response?.profile?.name + ' ' + response?.profile?.family} date={elm?.date.toString()} describe={elm?.describe} id={elm?.id} recive_location={elm?.city?.name ? elm?.city?.name : 'نامشخص'} title={elm?.name}  />
                  {response?.freeRequests?.length < 1 && <h1 className='text-center'> درخواستی یافت نشد </h1>}
                </>
                ))
          }

          {
            response?.sellerProfile?.shopName 
              ?
                <>
                  {response?.sellerProfile?.products?.length == 0 && <h1 className='text-center'> محصولی یافت نشد </h1>}
                </>
              :
              <>
                  {response?.freeRequests?.length == 0 && <h1 className='text-center '> درخواستی یافت نشد </h1>}
              </>
        }

        </div>

        </div>
    </div>
 </div>
  </>
  )
}

export default UserModal