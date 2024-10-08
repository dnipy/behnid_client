import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import { useRouter } from "next/router";
import { LoadingComponent } from "../../components/loading";
import { BACK_END } from "../../clients/localStorage";
import ErrorComponent from "../../components/alerts/error";
import { BiMessageAltDetail, BiSend } from "react-icons/bi";
import {MdClose, MdCommentBank, MdHomeFilled, MdLocationOn, MdMail, MdScreenshot, MdSettings, MdShoppingCart} from 'react-icons/md'
import { BsFillTelephoneFill, BsHeartFill, BsSpeedometer } from "react-icons/bs";
import SuccesComponent from "../../components/alerts/succes";
import { setLoading } from "../../lib/features/loading.slice";
import {  CityPickerModelForProfile } from "../../features/components/city-picker-any";
import { NextSeo } from "next-seo"
import Market from "../../assets/Market.png"
import Behnid from '../../assets/logo-croped.png'


const Page : NextPage = ()  => {
  
  const [error, setError] = useState('');
  const [loading , setloading] = useState(true);
  const [IsSetingOpen , setIsSetingOpen] = useState(false);
  const [response, setResponse] = useState<any>([]);
  const [selectedImage,setSelectedImage] = useState<File | null>(null)
  const [topChanged,setTopChanged] = useState(false)
  const [bioChanged,setBioChanged] = useState(false)
  const [city,setCity] = useState({isOpened : false , city_name : ''})
  const [succed,setSucced] = useState('')
  const [noshop,setNoshop] = useState(false)
  const inputFile = useRef<HTMLInputElement | null>(null) 

  const router = useRouter()
  const {FirstTime} = router.query;

  const onButtonClick = () => {
    inputFile?.current?.click();
  };

  const onImageChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setloading(true)
    setError('')
    const body = new FormData()


    if ( e.target.files &&  e.target?.files?.length > 0) {
      console.log(e.target.files)
      setSelectedImage(e.target.files[0])

      body.append('profile_image',e.target.files[0] as Blob)
        console.log(e.target.files[0])
    
        AuthorizedApiRequestImage 
        .post('/media/photo/avatar',body)
        .then((res) => {
            console.log(res)
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
              setSucced('تصویر با موفقیت ثبت شد')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });
    }
    else {
      setError('فایل انتخاب کنید')
      setloading(false)
    }
  }

  const sendImageHandle = async ()=>{
    setloading(true)
    setError('')
    const body = new FormData()
    if(selectedImage){
        body.append('profile_image',selectedImage as Blob)
        console.log(selectedImage)
    
        AuthorizedApiRequestImage 
        .post('/media/photo/avatar',body)
        .then((res) => {
            console.log(res)
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
              setSucced('تصویر با موفقیت ثبت شد')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });


      }else {
          setError('فایل انتخاب کنید')
          setloading(false)
      }
    }



  useEffect(()=>{
      if (FirstTime) {
          //   alert('first time')
          window.location.replace('/profile')
      }
  },[])





    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])





  const fetchData = () => {
      AuthorizedApiRequest
          .get('/profile/my-data')
          .then((res) => {
              if (res.data.err || typeof(res.data?.msg) == 'object') {
                res.data?.err ? setError(res.data?.err) : setError('ارور در هنگام لود دیتا')  
                // console.log(res.data.err)
              }
              else {
                  console.log(res.data?.data)
                  setResponse(res.data?.data);
                  if (res.data?.data?.cityName) {
                    setCity({...city , city_name : res.data?.data?.cityName })
                  }
                  setloading(false)
              }
          })
          .catch((err) => {
              setError('خطا در اتصال به سرور');
              // router.push('/500')
              console.log(err)
          })
          .finally(() => {
              setTimeout(() => {
                  setloading(false);
              }, 1000)
            });
  };

  useEffect(() => {
      fetchData();
  }, []);



  const deleteTicket = (id : number)=>{
      AuthorizedApiRequest.post('/tickets/delete',{id})
      .then((res)=>{
        console.log(res.data)
        router.reload()
      }).catch(()=>{
          console.log('err at delete ticket')
      })
  }

  const updateProfile = async()=>{
    setloading(true)
    AuthorizedApiRequest.post('/profile/update-profile-detailes',{name : response?.profile?.name , family  :response?.profile?.family})
    .then((res)=>{
      console.log(res.data)
      if (res.data?.msg) {
        setSucced("با موفقیت ثبت شد")
      }
      if (res.data?.err ){
        setError(res.data?.err)
      }
    }).catch(()=>{
        setError('!خطا در ارتباط با سرور . لطفا دوباره تلاش کنید')
    }).finally(()=>{
      setloading(false)
    })
  }


  const updateCity = async(cityID : number)=>{
    setloading(true)
    AuthorizedApiRequest.post('/profile/update-city',{cityID : cityID })
    .then((res)=>{
      console.log(res.data)
      if (res.data?.msg) {
        setSucced("با موفقیت ثبت شد")
      }
      if (res.data?.err ){
        setError(res.data?.err)
      }
    }).catch(()=>{
        setError('!خطا در ارتباط با سرور . لطفا دوباره تلاش کنید')
    }).finally(()=>{
      setloading(false)
    })
  }


  const updatePublic = async()=>{
    setloading(true)
    AuthorizedApiRequest.post('/profile/update-publics',{ address : response?.profile?.address , workNumber : response?.profile?.workNumber , instaAcc : response?.profile?.instaAcc })
    .then((res)=>{
      console.log(res.data)
      if (res.data?.msg) {
        setSucced("با موفقیت ثبت شد")
      }
      if (res.data?.err ){
        setError(res.data?.err)
      }
    }).catch(()=>{
        setError('!خطا در ارتباط با سرور . لطفا دوباره تلاش کنید')
    }).finally(()=>{
      setloading(false)
    })
  }



  const updateBio = async()=>{
      if (response?.bio?.length > 20 ) {
      setloading(true)
      setError('')
      console.log(response?.bio)
      AuthorizedApiRequest.post('/profile/update-bio',{bio : response?.bio})
      .then((res)=>{
        console.log(res.data)
        if (res.data?.msg) {
          setSucced("با موفقیت ثبت شد")
        }
        if (res.data?.err ){
          setError(res.data?.err)
        }
      }).catch(()=>{
          setError('!خطا در ارتباط با سرور . لطفا دوباره تلاش کنید')
      }).finally(()=>{
        setloading(false)
        setBioChanged(false)
      })
    }
    else {
      setError("بیوگرافی خیلی کوتاه است")
    }
  }

  const sellerButtonHandle = ()=>{
    if (response?.Role == "Seller"){
      router.push("/profile/seller")
    }
    else {
      setNoshop(true)
    }
  }


//   console.log(response)
  return (
    <>
      {/* <Navbar_v2/> */}
      { 
        typeof response == 'object' ? 
        <>
        <NextSeo title="پروفایل" />
        {error && <ErrorComponent handle={setError} message={error} />  }
        {succed && <SuccesComponent handle={setSucced} message={succed} /> }
        {loading && <LoadingComponent/>  }
        {IsSetingOpen && <AccuntSeting state={IsSetingOpen} handle={setIsSetingOpen} /> }
        {city.isOpened && <CityPickerModelForProfile handleSubmit={updateCity} fields={city} setFields={setCity}   /> }
        {noshop && <NoShopModal />}



        <main dir="rtl" className="flex justify-center min-h-screen bg-white  ">

          <div className="w-full lg:max-w-7xl absolute z-[6] ">
              <div className="flex justify-center items-center rounded-b-[300px] md:rounded-b-[200px] w-full h-[451px] bg-beh-bg z-10 " ></div>
          </div>

          <div className="w-full lg:max-w-7xl z-[7]">
            <div className="px-10">
                  {/* TOP_INTRO_PART */}
                  <div className="flex h-[50px] my-5 ">
                    <div className="w-full  border-b-[2px] border-gray-300 ">
                      <h1 className="text-xl text-orange-500 pr-2 font-bold ">پروفایل کاربری</h1>
                    </div>
                   
                  </div>


                  {/* PROFILE_PART */}
                  <div className="mb-10 flex justify-between  flex-row gap-5 flex-wrap">
                    {/* RIGHT_PART  */}
                    <div className=" w-full lg:w-[360px] p-2 mx-auto ">
                      {/* RIGHT_TOP_PART */}
                      <div className=" w-full   pt-10">
                        <div className="flex w-full  h-[220px] justify-center">
                          <div className="max-w-sm  h-full">
                            <div className='flex justify-around h-full w-[280px] gap-2 p-1' >

                              <div  className="h-[80%] basis-5/6 bg-white shadow-lg rounded-md flex justify-center">
                                <div>
                                  {response.avatar && !selectedImage  ? <img className="w-[170px] h-[170px]" src={`${BACK_END}${response.avatar}`} /> : null}
                                  {/* {selectedImage ? <div className='absolute w-[170px] text-center bg-beh-red font-semibold text-white cursor-pointer' onClick={()=>setSelectedImage(null)}>حذف</div> : null} */}
                                  {/* {selectedImage ? <div className={`absolute w-[170px] ${loading ? 'cursor-default' : 'cursor-pointer'} text-center bg-beh-green-light font-semibold text-white `} onClick={ loading ? undefined : sendImageHandle}>{loading ? 'صبر کنید' : 'تایید'}</div> : null} */}
                                  {selectedImage ?  <img className="w-[170px] h-[170px]" src={URL.createObjectURL(selectedImage)} /> : null}
                                </div>
                              </div>
                              <div onClick={onButtonClick} className="h-[80%] basis-1/6 cursor-pointer bg-beh-green-light flex items-center rounded-md">
                                <div className="rotate-90 " >
                                
                                <input type='file' onChange={onImageChange} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFile} style={{display: 'none'}}/>
                                  <h1 className='font-semibold text-white text-lg' >{response?.avatar ? 'تغییر' : 'انتخاب'}</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-center w-full '>
                          <input value={response?.profile?.name} onChange={(e)=>{
                            setResponse({...response , profile : {  ...response?.profile , name : e.target.value}})
                            setTopChanged(true)
                          }}
                           type='text' placeholder='نام' className=' placeholder:font-semibold placeholder:text-white border-b-4 border-beh-gray rounded-md bg-beh-orange/60 focus:bg-beh-orange min-w-[260px] h-[50px] flex items-center text-center'/>
                        </div>
            
            
                        <div className='flex flex-row flex-wrap mt-4 justify-around gap-x-2 gap-y-3'>
                            <div className='mx-auto'>
                              <input  value={response?.profile?.family} onChange={(e)=>{
                            setResponse({...response , profile : {  ...response?.profile , family : e.target.value}})
                            setTopChanged(true)
                          }} type='text' placeholder='نام خانوادگی' className=' placeholder:font-semibold placeholder:text-white border-b-2 border-beh-gray rounded-md bg-beh-orange/60 focus:bg-beh-orange min-w-[260px] h-[50px] flex items-center text-center'/>                 
                            </div>
            
                            <div className='mx-auto'>
                              <input  value={response?.phone}  type='text'  placeholder='شماره تماس' className=' placeholder:font-semibold placeholder:text-white border-b-2 cursor-default border-beh-gray rounded-md bg-beh-gray min-w-[260px] h-[50px] flex items-center text-white text-center'/>
                            </div>
                        </div>
            

            
                        <div className='flex flex-row flex-wrap w-full mt-5 justify-between gap-x-2 gap-y-3'>
                            <div className='mx-auto w-[80%] md:w-[94%]'>
                              <div  onClick={ topChanged && !loading && response?.profile?.name?.length > 3 && response?.profile?.family?.length > 3 ?  updateProfile  : undefined } className={`placeholder:font-semibold    border-b-2 border-beh-gray rounded-md ${ topChanged && !loading && response?.profile?.name?.length > 3 && response?.profile?.family?.length > 3  ? 'cursor-pointer bg-beh-green-light text-white ' : 'text-beh-gray-dark bg-beh-gray-light cursor-not-allowed'}  w-[100%] h-[50px] flex justify-center items-center text-center`}>
                                <h1>تایید</h1>
                              </div>
                            </div>
                        </div>
            
                      
                      
                      </div>

                      {/* RIGHT_BOTTOM_PART */}
                      <div className=" w-full my-5  pt-10">
                        <div className="w-full bg-[#555555]  rounded-3xl">

                          <div onClick={()=>router.push('/chat')} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg border-b-[5px] px-3 border-b-beh-gray-dark font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiSend className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    چت روم
                                  </h1>
                              </div>
                          </div>


                          {/* <div onClick={response?.Role != "Buyer" ? ()=>router.push('/profile/seller/add-story') : ()=>setError('ابتدا صفحه تنظیمات فروشگاه خود را تنظیم کنید')} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg border-b-[5px] px-3 border-b-beh-gray-dark font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdScreenshot className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    افزودن استوری
                                  </h1>
                              </div>
                          </div> */}


                          <div onClick={()=>router.push('/profile/requests')} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg border-b-[5px] px-3 border-b-beh-gray-dark font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdMail className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    درخواست ها
                                  </h1>
                              </div>
                          </div>


                          <div onClick={sellerButtonHandle} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg border-b-[5px] px-3 border-b-beh-gray-dark font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdShoppingCart className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    تنظیمات فروشگاه
                                  </h1>
                              </div>
                          </div>


                          <div onClick={()=>setIsSetingOpen(true)} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg   border-b-[5px] px-3 border-b-beh-gray-dark   font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdSettings className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    تنظیمات حساب
                                  </h1>
                              </div>
                          </div>



                          <div onClick={()=>router.push('/profile/intresting-products')} className="cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg  px-3  font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BsHeartFill className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    علاقمندی ها
                                  </h1>
                              </div>
                          </div>


                          {/* <div onClick={()=>router.push('/profile/add-ticket')} className=" cursor-pointer hover:text-beh-green-light w-full h-[70px]  text-white text-lg  px-3  font-bold flex items-center">
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdCommentBank className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                      پشتیبانی
                                  </h1>
                              </div>
                          </div> */}

                        </div>
                      </div>

                    </div>

                    {/* LEFT_PART */}
                    <div className="w-full md:w-[68%] px-2 py-10 mx-auto h-80 ">
                      <div className="w-full">
                        <h1 className="font-bold text-lg  ">
                            درباره من
                        </h1>


                        <textarea value={response?.bio} onChange={(e)=>{
                            setBioChanged(true)
                            setResponse({...response , bio : e.target.value})
                        }}  placeholder="تکمیل نشده..." className=" placeholder:text-black mt-5 bg-beh-green-light w-full h-[280px] rounded-xl overflow-x-auto text-xl p-4 text-white " ></textarea>
                          
            
                        {
                          bioChanged ? 
                            <div className='flex flex-row flex-wrap w-full mt-5 justify-between gap-x-2 gap-y-3'>
                                <div className='mx-auto w-[90%] md:w-[94%]'>
                                  <div  onClick={updateBio} className={`placeholder:font-semibold   border-b-2 border-beh-gray rounded-md cursor-pointer bg-beh-green-light text-white  w-[100%] h-[50px] flex justify-center items-center text-center`}>
                                    <h1>تایید</h1>
                                  </div>
                                </div>
                            </div>
                              :
                              null  
                        }
                        

                       <div className="w-full h-[300px] my-12">
                         <div className="relative ">
                            <div className="absolute w-full mt-[25px] rounded-xl bg-beh-orange h-[250px]"></div>
                         </div>

                         <label className="relative  px-10 block">
                            <input value={response?.profile?.address} onChange={(e)=>{
                              setResponse({...response , profile : {...response?.profile , address : e.target.value}  })
                            }} type="text" className=' w-full h-[50px] rounded-xl bg-beh-gray  text-lg text-white  px-12 placeholder:text-white placeholder:text-lg ' placeholder='آدرس' dir='rtl'/>
                              <span className="absolute inset-y-0 right-14 flex items-center pl-3" >
                                <MdHomeFilled className="w-6 h-6 text-white" />
                              </span>
                          </label>



                          <label className="relative  px-10 mt-3 block">
                            <input value={city.city_name} onClick={()=>setCity({...city , isOpened : true})} type="text" className=' w-full h-[50px] rounded-xl bg-beh-gray  text-lg text-white  px-12 placeholder:text-white placeholder:text-lg ' placeholder='شهر' dir='rtl'/>
                              <span className="absolute inset-y-0 right-14 flex items-center pl-3" >
                                  <MdLocationOn className="w-6 h-6 text-white" />
                              </span>
                          </label>


                          <label className="relative  px-10 mt-3 block">
                            <input value={response?.profile?.workNumber} onChange={(e)=>{
                              setResponse({...response , profile : {...response?.profile , workNumber : e.target.value}  })
                            }} type="number" className=' w-full h-[50px] rounded-xl bg-beh-gray  text-lg text-white  px-12 placeholder:text-white placeholder:text-lg ' placeholder='تماس محل کار' dir='rtl'/>
                              <span className="absolute inset-y-0 right-14 flex items-center pl-3" >
                                  <BsFillTelephoneFill className="w-6 h-6 text-white" />
                              </span>
                          </label>


                          
                          <label className="relative  px-10 mt-3 block">
                            <input value={response?.profile?.instaAcc} onChange={(e)=>{
                              setResponse({...response , profile : {...response?.profile , instaAcc : e.target.value}  })
                            }} type="text" className=' w-full h-[50px] rounded-xl bg-beh-gray  text-lg text-white  px-12 placeholder:text-white placeholder:text-lg ' placeholder='اکانت اینستاگرام ( @ لازم نیست )' dir='rtl'/>
                              <span className="absolute inset-y-0 right-14 flex items-center pl-3" >
                                  <BiMessageAltDetail className="w-6 h-6 text-white" />
                              </span>
                          </label>


                          
                          <label className="relative  px-10 mt-3 block">
                            <div onClick={updatePublic} className=" cursor-pointer flex items-center justify-center rounded-lg px-12 h-[50px] text-xl bg-beh-green-super-light">
                              <h1 className="font-bold text-white">
                                تایید
                              </h1>
                            </div>
                          </label>

                       </div>
                      </div>
                    </div>


                  </div>
            </div>

          </div>
      </main>
            </>
        :
        null
      }
    </>
  )
}  



const AccuntSeting = (props : { state? : boolean , handle :(value: React.SetStateAction<boolean>) => void})=>{
  const [passchange,setPassChange] = useState(false)
  const [deactivechange,setdeactiveChange] = useState(false)

  return(
    <>
    <div className='fixed w-screen h-screen backdrop-blur-md bg-white/20 z-40 ' >
    {passchange && <ChangePassSeting handle={setPassChange}  state={passchange}  />}
    {deactivechange && <DeactiveSeting handle={setdeactiveChange} state={deactivechange} />}

      <div className="flex h-screen  justify-center items-center">
          <div className="w-[320px] " >
            <div onClick={()=>props.handle(false)} className="w-full  flex justify-end ">
              <div className="border-beh-gray border-4 flex justify-center items-center rounded-full h-12 w-12">
                <MdClose  className="fill-beh-gray w-10 h-10 "/>
              </div>
            </div>
            <div onClick={()=>{
              setdeactiveChange(false)
              setPassChange(true)
            }} className="w-full cursor-pointer h-[80px] rounded-md flex justify-center items-center bg-beh-yellow text-center font-bold my-3 text-beh-gray-dark text-3xl" >
              <h1> تغییر رمز </h1>
            </div>

            <div  onClick={()=>{
              setdeactiveChange(true)
              setPassChange(false)
            }} className="w-full cursor-pointer h-[80px] rounded-md flex justify-center items-center bg-beh-red text-center font-bold my-3 text-white text-3xl" >
              <h1> غیرفعال کردن حساب </h1>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

const DeactiveSeting = (props : { state? : boolean , handle :(value: React.SetStateAction<boolean>) => void})=>{
  const [pass,setPass] = useState('')
  const [error,setError] = useState('')
  const [response,setResponse] = useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  
  const Submit = async ()=>{
    setError('')
    setResponse('')
    if (pass.length < 8) {
      setError('پسورد نباید کمتر از 8 رقم باشد')
      return
    }
    else {
      setLoading(true)
      await AuthorizedApiRequest
        .post('/auth/deactive',{password : pass})
          .then((resp)=>{
            if (resp.data?.err){
              setError(resp.data.err)
            }
            if (resp.data?.msg) {
              setResponse(resp.data?.msg)
              setTimeout(() => {
                window.localStorage.clear()
                router.push('/')
              }, 500);
            }
          })
          .catch((err)=>{
            setError('ارور در ارتباط با سرور')
          })
          .finally(()=>{
            setLoading(false)
          })
    }
  }
  return(
    <>
    {error && <ErrorComponent handle={setError} message={error} />}
    {response && <SuccesComponent handle={setResponse} message={response} /> }
    {loading && <LoadingComponent />}
    <div className='fixed w-screen h-screen backdrop-blur-md bg-white/20 z-40 ' >
      <div className="flex h-screen  justify-center items-center z-50">
          <div className="w-[330px] " >
            
            <div className="w-full h-[400px] bg-beh-red rounded-3xl">
              <div onClick={()=>props.handle(false)} className="w-full p-2  flex justify-end ">
                <div className="border-black border-4 flex justify-center items-center rounded-full h-12 w-12">
                  <MdClose  className="fill-black w-10 h-10 "/>
                </div>
              </div>

              <div className="my-10 px-16">
                  <input value={pass} onChange={(e)=>setPass(e.target.value)} type="text" className="w-full text-xl text-center px-4 h-16" />
                  <h1 className="text-center text-2xl font-bold text-black">رمز عبور</h1>
              </div>

              <div className="my-10 px-16">
                  <div onClick={ Submit } className="w-full text-xl text-center px-4 h-16 bg-beh-gray cursor-pointer hover:bg-beh-green-light hover:shadow-xl duration-100 flex items-center justify-center shadow-md">
                    <h1 className="text-center text-2xl font-bold text-white">تایید</h1>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

const ChangePassSeting = (props : { state? : boolean , handle :(value: React.SetStateAction<boolean>) => void})=>{
  const [fields,setFields] = useState({pass_1 : '' , pass_2 : '', pass_3 : ''})
  const [error,setError] = useState('')
  const [response,setResponse] = useState('')
  const [loading,setLoading] = useState(false)
  

  const Submit = async()=>{
    setError('')
    setResponse('')
    if (fields.pass_2.length < 8) {
        setError('پسورد نباید کمتر از 8 رقم باشد')
        return
    }
    if (fields.pass_2 === fields.pass_3){
        setError('')
        setLoading(true)

        let fData = {password : fields.pass_1 , newPassword : fields.pass_2 }
        console.log({fData})
        await AuthorizedApiRequest
        .post('/auth/change-password',fData)
        .then((res) => {
            console.log(res)
            if (res.data?.err){
                setError(res.data.err)
            }
            if (res.data?.msg) {
              setResponse(res.data?.msg)
              props.handle(false)
            }
        })
        .catch((err) => {
            setError(err?.response?.data?.err);
        })
        .finally(() => {
            setLoading(false);
        })
        
    }
    else {
        setError('پسورد جدید و تکرار آن باید مساوی باشد')
        console.log(fields.pass_2,fields.pass_3)
    }
}
  return(
    <>
    {error && <ErrorComponent handle={setError} message={error} />}
    {response && <SuccesComponent handle={setResponse} message={response} /> }
    {loading && <LoadingComponent />}


    <div className='fixed w-screen h-screen backdrop-blur-md bg-white/20 z-40 ' >
      <div className="flex h-screen  justify-center items-center z-50">
          <div className="w-[330px] " >
            
            <div className="w-full h-[600px] bg-beh-yellow rounded-3xl">
            <div onClick={()=>props.handle(false)} className="w-full p-2  flex justify-end ">
              <div className="border-beh-gray border-4 flex justify-center items-center rounded-full h-12 w-12">
                <MdClose  className="fill-beh-gray w-10 h-10 "/>
              </div>
            </div>
            <div className="mb-10 mt-5 px-16">
                  <input value={fields.pass_1} onChange={(e)=>setFields({...fields , pass_1 : e.target.value})} type="text" className="w-full text-xl text-center px-2 h-16" />
                  <h1 className="text-center text-2xl font-bold text-black">رمز قدیمی</h1>
              </div>
              <div className="my-10 px-16">
                  <input value={fields.pass_2} onChange={(e)=>setFields({...fields , pass_2 : e.target.value})} type="text" className="w-full text-xl text-center px-2 h-16" />
                  <h1 className="text-center text-2xl font-bold text-black">رمز جدید</h1>
              </div>
              <div className="my-10 px-16">
                  <input value={fields.pass_3} onChange={(e)=>setFields({...fields , pass_3 : e.target.value})} type="text" className="w-full text-xl text-center px-2 h-16" />
                  <h1 className="text-center text-2xl font-bold text-black">تکرار رمز جدید</h1>
              </div>

              <div className="my-10 px-16">
                  <div onClick={Submit} className="w-full text-xl text-center px-4 h-16 bg-beh-gray cursor-pointer hover:bg-beh-green-light hover:shadow-xl duration-100 flex items-center justify-center shadow-md">
                    <h1 className="text-center text-2xl font-bold text-white">تایید</h1>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}


const NoShopModal = ()=>{
  const router = useRouter()
  return(
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
    
    {/* CENTER_DATA_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' style={{backgroundImage : `url(${Market.src})`}} className='w-[380px] bg-[#f5f5f5]  md:w-[500px] shadow-2xl border-4 border-beh-orange  bg-no-repeat bg-center  mx-auto h-[70vh]  rounded-3xl overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
           
            <div className="w-full h-[20vh]  bg-white">
                <img src={Behnid.src} className="w-auto mx-auto h-[20vh] " height={'140px'} width='auto' alt="" />
            </div>
            <div className="w-full h-[48vh] flex flex-col justify-around gap-10 items-center ">
                <div className="w-full">
                  <h1 className="text-3xl text-beh-orange text-center">
                    شما فروشگاهی ندارید
                  </h1>
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={()=>router.push('/profile/seller')} className="w-[250px] h-[60px] rounded-lg text-white text-2xl mx-auto my-auto bg-beh-green-super-light">
                    ساخت فروشگاه
                  </button>
                </div>
            </div>
        </div>
      </div>
  </div>
  )
}

export default Page