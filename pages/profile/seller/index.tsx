import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../../clients/axios";
import ProfileCard from "../../../components/ProfileCard";
import Router, { useRouter } from "next/router";
import { Model } from "../../../components/Model";
import { LoadingComponent } from "../../../components/loading";
import { MiladiToShamsi } from "../../../utils/miladi_be_shamsi";
import { BACK_END } from "../../../clients/localStorage";
import Navbar_v2 from "../../../components/Navbar_v2";
import ErrorComponent from "../../../components/alerts/error";
import { BiCloset, BiMessageAltDetail, BiSend } from "react-icons/bi";
import {MdAddCircle, MdCheck, MdClose, MdHomeFilled, MdLocationOn, MdShoppingBag} from 'react-icons/md'
import { BsEye, BsFillTelephoneFill, BsHeartFill, BsSpeedometer } from "react-icons/bs";
import SuccesComponent from "../../../components/alerts/succes";
import { setLoading } from "../../../lib/features/loading.slice";
import { CityPickerModel, CityPickerModelForProfile } from "../../../features/components/city-picker-any";
import { NextSeo } from "next-seo";
import SetupShop from "../../../features/components/setup_shop";
import { CategoryPickerModel } from "../../../features/components/category_picker_any";
import { ShopNotAcceptedYetModal, ShopRejectedModal } from "../../../features/components/chats/modals/NoShop";
import ComponentLoading from "../../../components/componentLoading";


const Page : NextPage = ()  => {
  const [error, setError] = useState('');
  const [loading , setloading] = useState(true);
  const [setupModal , setSetupModal] = useState(false);
  const [IsSetingOpen , setIsSetingOpen] = useState(false);
  const [response, setResponse] = useState<any>([]);
  const [selectedImage,setSelectedImage] = useState<File | null>(null)
  const [topChanged,setTopChanged] = useState(false)
  const [bioChanged,setBioChanged] = useState(false)
  const [city,setCity] = useState({isOpened : false , city_name : ''})
  const [succed,setSucced] = useState('')
  const inputFile = useRef<HTMLInputElement | null>(null) 
  const [shopNotAccepted,setshopNotAccepted] = useState(false)
  const [shopRejected,setshopRejected] = useState(false)
  const [fields,setFields]= useState<{
      shopName : string,
      shopId : string,
      bio : string,
      bioChanged :  boolean,
      shopNameChanged : boolean,
      logo : File | Blob | undefined,
      optional_pics : File[] | Blob[] | undefined,
      banner : File | Blob | undefined
      showCatPicker : boolean
      cat_id : number
      cat_name : string
      selectedCats : []
      logoLoading : boolean
      bannerLoading : boolean
      optional_picsLoading : boolean
      logoDone : boolean
      bannerDone : boolean
      optional_picsDone : boolean
  }>({
      shopName : '',
      shopId : '',
      bio : '',
      bioChanged : false ,
      shopNameChanged : false,
      logo : undefined,
      optional_pics : undefined,
      banner : undefined,
      showCatPicker : false,
      cat_id : 1,
      cat_name : '',
      selectedCats : [],
      bannerLoading : false,
      logoLoading : false,
      optional_picsLoading : false,
      logoDone : false,
      bannerDone : false,
      optional_picsDone : false
  })

  const logoRef = useRef<HTMLInputElement | null>(null)
  const optional_picsRef = useRef<HTMLInputElement | null>(null)
  const bannerRef = useRef<HTMLInputElement | null>(null)

const onLogoChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
    if ( e.target.files &&  e.target?.files?.length > 0) {
      setFields({...fields,logoLoading : true })
      console.log(e.target.files)
      const body = new FormData()
      body.append('seller_site_avatar',e.target.files[0])

      AuthorizedApiRequestImage
      .post('/media/seller/add-site_avatar',body)
      .then((res) => {
          console.log(res)
          if (res.data?.err) {
              setError(res.data.err)
          }
          else {
            setTimeout(() => {
              setFields({ ...fields , logoLoading : false , logo : e.target?.files![0] , logoDone : true })
            }, 200);
            // console.log(fields.optional_pics)
            // console.log(e.target?.files![0])
            console.log(res)
          }
      })
      .catch((err) => {
          console.log(err)
          setError('خطا هنگام بروزرسانی لوگو')
      })
      .finally(() => {
          setFields({...fields,logoLoading : false})
      });
    }
}

const onBannerChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
  if ( e.target.files &&  e.target?.files?.length > 0) {
    setFields({...fields,bannerLoading : true })
    console.log(e.target.files)
    const body = new FormData()
    body.append('seller_site_header',e.target.files[0])
    // setFields({...fields, banner : e.target?.files[0]  })

    AuthorizedApiRequestImage
    .post('/media/seller/add-site_header',body)
    .then((res) => {
        console.log(res)
        if (res.data?.err) {
            setError(res.data.err)
        }
        else {
          setTimeout(() => {
            setFields({...fields , bannerLoading : false , banner : e.target?.files![0] , bannerDone : true})
          }, 200);
          // console.log(fields.optional_pics)
          // console.log(e.target?.files![0])
          console.log(res)
        }
    })
    .catch((err) => {
        console.log(err)
        setError('خطا هنگام بروزرسانی بنر')
    })
    .finally(() => {
        setFields({...fields,bannerLoading : false})
    });
  }
}


const onOptionalImagesChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
  if ( e.target.files &&  e.target?.files?.length > 0) {
    setFields({...fields,optional_picsLoading : true})
    let optionalImg : File[] | Blob[] | undefined = []
    const body = new FormData()

    for (let i in e.target.files) {
      optionalImg.push(e.target.files[i])
    }

    optionalImg?.at(0) && body.append('gallery_1',optionalImg[0])
    optionalImg?.at(1) && body.append('gallery_2',optionalImg[1])
    optionalImg?.at(2) && body.append('gallery_3',optionalImg[2])


    AuthorizedApiRequestImage
    .post('/media/seller/add-site-gallery',body)
    .then((res) => {
        console.log(res)
        if (res.data?.err) {
            setError(res.data.err)
        }
        else {
          setTimeout(() => {
            setFields({...fields ,optional_picsDone : true, optional_picsLoading : false , optional_pics : optionalImg?.slice(0,-2) ,  })
            console.log(fields)
          }, 200);
          // console.log(res)
        }
    })
    .catch((err) => {
        console.log(err)
        setError('خطا هنگام بروزرسانی گالری')
    })
    .finally(() => {
        setFields({...fields,optional_picsLoading : false})
    });
  }
}


  const router = useRouter()
  const {FirstTime} = router.query;

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
                  if (res.data?.data?.sellerProfile?.ActivityCategory[0]?.subCategory?.mainCategory?.id) {
                    console.log(res.data?.data?.sellerProfile?.ActivityCategory[0]?.subCategory?.mainCategory?.id)
                    setFields({...fields , cat_id : res.data?.data?.sellerProfile?.ActivityCategory[0]?.subCategory?.mainCategory?.id , cat_name : res.data?.data?.sellerProfile?.ActivityCategory[0]?.subCategory?.mainCategory?.name })
                  }
                  if (res.data?.data?.Role === "Seller"){
                    setSetupModal(false)
                  }
                  else{
                    setSetupModal(true) 
                  }
                  console.log(res.data?.data?.sellerProfile?.sellerStatus)

                  if (res.data?.data?.sellerProfile?.sellerStatus  === 'rejected') {
                    setshopRejected(true)
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

  const updateBio = async()=>{
      if (response?.sellerProfile?.shopIntro.length > 20 ) {
      setloading(true)
      setError('')
      console.log(response?.bio)
      AuthorizedApiRequest.post('/sellers/add-shop-intro',{intro : response?.sellerProfile?.shopIntro})
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
        setResponse({...response , bioChanged : false})
      })
    }
    else {
      setError("بیوگرافی خیلی کوتاه است")
    }
  }


  const updateShopName = async()=>{
    if (response?.sellerProfile?.shopName.length > 4 ) {
    setloading(true)
    setError('')
    AuthorizedApiRequest.post('/sellers/add-shop-name',{name : response?.sellerProfile?.shopName})
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
      setResponse({...response ,sellerProfile : { ...response?.sellerProfile , shopNameChanged : false }, })
    })
  }
  else {
    setError("نام فروشگاه خیلی کوتاه است")
  }
}



const updateShopCat = async()=>{
  if (fields.cat_id && fields.cat_name ) {
  setloading(true)
  setError('')
  const body = [{id : fields.cat_id}]
  AuthorizedApiRequest.post('/sellers/add-cat',{cat_list : body})
  .then((res)=>{
    console.log(res.data)
    if (res.data?.msg) {
      setSucced("با موفقیت ثبت شد")
    }
    if (res.data?.err ){
      setError(res.data?.err)
      setFields({...fields, cat_id : 1 , cat_name : ''})
    }
  }).catch(()=>{
      setError('!خطا در ارتباط با سرور . لطفا دوباره تلاش کنید')
  }).finally(()=>{
    setloading(false)
    setResponse({...response ,sellerProfile : { ...response?.sellerProfile , shopNameChanged : false }, })
  })

}
else {
  setError("دسته بندی انتخاب نشده است")
}
}

  return (
    <>
      <NextSeo
        title="فروشگاه من"
      />
      {/* <Navbar_v2/> */}
      { 
        typeof response == 'object' ? 
        <>
        {error && <ErrorComponent handle={setError} message={error} />  }
        {succed && <SuccesComponent handle={setSucced} message={succed} /> }
        {loading && <LoadingComponent/>  }
        {fields.showCatPicker && <CategoryPickerModel is_multi={true} onClick={updateShopCat} fildes={fields} setFileds={setFields} />}
        {setupModal && <SetupShop is_multi={true} onClick={updateShopCat} banner={response?.sellerProfile?.site_header && true} gallery={response?.sellerProfile?.site_optional_1 && true} logo={response?.sellerProfile?.site_avatar && true}  cat={response?.sellerProfile?.cat ? response?.sellerProfile?.cat : ''} />}
        {shopNotAccepted && <ShopNotAcceptedYetModal  state={shopNotAccepted} setState={setshopNotAccepted} />} 
        {shopRejected && <ShopRejectedModal setUp={setSetupModal}  state={shopRejected} setState={setshopRejected} />} 


        <main dir="rtl" className="flex justify-center min-h-screen bg-white  ">

          <div className="w-full lg:max-w-7xl absolute z-[6] ">
              <div className="flex justify-center items-center rounded-br-[300px] rounded-bl-none md:rounded-br-[200px] md:rounded-bl-none w-full h-[635px] bg-beh-bg z-10 " ></div>
          </div>

          <div className="w-full lg:max-w-7xl z-[7]">
            <div className="px-10">
                  {/* TOP_INTRO_PART */}
                  <div className="flex h-[50px] my-5 ">
                    <div className="w-full  border-b-[2px] border-gray-300 ">
                      <h1 className="text-xl text-orange-500 pr-2 font-bold ">پروفایل فروشنده</h1>
                    </div>
                   
                  </div>


                  {/* PROFILE_PART */}
                  <div className="mb-10 md:mb-2 flex justify-between  flex-row gap-1 lg:gap-2 flex-wrap">
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
                        {/* <div className='flex justify-center w-full '>
                          <input value={response?.profile?.name + ' ' + response?.profile?.family } 
                           type='text' disabled={true} placeholder='نام' className=' placeholder:font-semibold placeholder:text-white cursor-default border-b-4 border-beh-gray-light rounded-md bg-beh-gray-mid-ligth text-white  focus:bg-beh-gray min-w-[260px] h-[50px] flex items-center text-center'/>
                        </div> */}
                      </div>
                    </div>

                    {/* LEFT_PART */}
                    <div className="w-full md:w-[68%] px-2 py-2 md:py-8 mx-auto h-auto">
                      <div className="w-full">
                        <label className="relative block">
                            <textarea value={response?.sellerProfile?.shopIntro} onChange={(e)=>{
                              setResponse({...response, sellerProfile : { ...response?.sellerProfile , shopIntro : e.target?.value,  },  bioChanged : true})
                              }} className='min-h-[180px] mt-5 overflow-y-auto w-full bg-[#D9D9D9] placeholder:text-[#B8B8B8] placeholder:p-1 rounded-lg px-5 pt-10 pb-2  placeholder:break-words placeholder:text-lg ' placeholder='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد...' dir='rtl'/>
                            <span className="absolute h-10 inset-y-0 right-3 top-6 pl-3" >
                              <h1 className="font-bold text-lg bg-[#D9D9D9] ">
                                درباره فروشگاه   
                              </h1>
                            </span>

                            <span className="absolute h-10 inset-y-0 left-3 top-6 pl-3" >
                                {response?.sellerProfile?.shopIntro?.length > 20 && response?.bioChanged &&
                                <button onClick={updateBio} disabled={loading ? true : false}  className={` ${error ? 'bg-beh-gray cursor-not-allowed' : 'bg-beh-orange cursor-pointer'}  w-[60px] h-[30px] rounded-md flex justify-center text-white  items-center `}>
                                  <span>
                                    {loading ? <ComponentLoading /> : <BiSend className="rotate-180 w-6 h-6"/>  } 
                                  </span>
                                </button>
                              }
                            </span>
                        </label>
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
                        
                      </div>
                    </div>
                  </div>
                  <div className=" flex  justify-around mb-6 px-5  flex-row gap-5 flex-wrap">
                        <div className="w-[220px]">
                            <h1 className="text-center text-xl py-1">نام</h1>
                            <div className="w-full h-12 bg-beh-gray-mid-ligth border-b-4 border-beh-gray rounded-lg flex justify-center items-center " >
                              <h3 className="text-white">{response?.profile?.name}</h3>
                            </div>
                        </div>

                        <div className="w-[220px]">
                            <h1 className="text-center text-xl py-1">شناسه کاربری :</h1>
                            <div className="w-full h-12 bg-beh-gray-mid-ligth border-b-4 border-beh-gray rounded-lg flex justify-center items-center " >
                              <h3 dir="ltr" className="text-white ">#behuser-{response?.id}</h3>
                            </div>
                        </div>

                        <div className="w-[220px]">
                            <h1 className="text-center text-xl py-1">شهر :</h1>
                            <div className="w-full h-12 bg-beh-gray-mid-ligth border-b-4 border-beh-gray rounded-lg flex justify-center items-center " >
                              <h3 className="text-white">{response?.cityName ? response?.cityName : 'نامشخص'}</h3>
                            </div>
                        </div>

                        <div className="w-[220px]">
                            <h1 className="text-center text-xl py-1">شماره تماس : </h1>
                            <div className="w-full h-12 bg-beh-gray-mid-ligth border-b-4 border-beh-gray rounded-lg flex justify-center items-center " >
                              <h3 className="text-white">{response?.phone}</h3>
                            </div>
                        </div>
                  </div>


                  {/* INFO_PART */}
                  <div className="flex h-[50px] mt-10 ">
                    <div className="w-full  border-b-[2px] border-gray-300 ">
                      <h1 className="text-xl text-orange-500 pr-2 font-bold ">اطلاعات فروشگاه</h1>
                    </div>
                  </div>

                  <div className=" flex  justify-around mb-6 px-5  flex-row gap-5 flex-wrap">
                        <div className="w-[320px] my-5">
                        <label className="relative block">
                            <input value={response?.sellerProfile?.shopName} onChange={(e)=>{
                              setResponse({...response,sellerProfile : { ... response?.sellerProfile , shopName : e.target.value , shopNameChanged : true}})
                            }} type="text" className="w-full h-10 rounded-lg bg-[#D9D9D9] text-center text-xl placeholder:text-[#B8B8B8] placeholder:text-center placeholder:text-xl" placeholder="نام فروشگاه"/>
                            
                            
                            <span className="absolute h-10 inset-y-0 left-3 top-1 pl-3" >
                                {response?.sellerProfile?.shopName?.length > 4 && response?.sellerProfile?.shopNameChanged &&
                                <button onClick={updateShopName} disabled={loading ? true : false}  className={` ${error ? 'bg-beh-gray cursor-not-allowed' : 'bg-beh-orange cursor-pointer'}  w-[60px] h-[30px] rounded-md flex justify-center text-white  items-center `}>
                                  <span>
                                    {loading ? <ComponentLoading /> : <BiSend className="rotate-180 w-6 h-6"/>  } 
                                  </span>
                                </button>
                              }
                            </span>
                        </label>
                        </div>

                        <div className="w-[320px] my-5">
                            <div dir="ltr" className="flex justify-center items-center">
                              <div>
                                <h1 className="text-beh-orange text-xl font-bold">
                                  www.behnid.com/
                                </h1>
                              </div>
                              <div>
                                <input value={response?.sellerProfile?.shopURLname } disabled={true} type="text" className="w-[155px] md:w-[200px] h-10 rounded-lg bg-[#D9D9D9] text-center cursor-not-allowed text-xl placeholder:text-[#B8B8B8] placeholder:text-center placeholder:text-xl" placeholder="my-shop"/>
                              </div>
                            </div>
                            {/* <input type="text" className="w-full h-12 rounded-xl bg-beh-text-gray text-center text-xl placeholder:text-[#B8B8B8] placeholder:text-center placeholder:text-xl" placeholder="نام فروشگاه"/> */}
                        </div>

                        <div className="w-[320px] my-5 flex justify-center">
                        
                          <button onClick={()=>setFields({...fields , showCatPicker : true})}   className="text-white w-full bg-beh-yellow hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-beh-gray-dark font-medium rounded-lg text-md h-10 mx-auto px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            <span className="mx-auto flex justify-center items-center">
                           
                            {
                              fields.cat_name ? fields.cat_name : ' دسته بندی فروشگاه '
                            }
                            <svg className="w-4 h-4 ml-2 mx-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                            </span>
                          </button>
                        </div>

                        <div className="w-[320px] my-5 flex justify-center lg:w-[80%]">
                          <button onClick={()=>{
                            if (response?.sellerProfile?.sellerStatus === "unAuthorized") {
                              setshopNotAccepted(true)
                            }
                            else {
                              router.push(`/profile/seller/my-products`)
                            }
                          }} className="w-full h-10 rounded-lg bg-beh-green-light text-white text-center text-xl " >
                            <span className="mx-auto flex justify-center items-center">
                              <MdShoppingBag className="mx-2 w-4 h-4"/>
                              محصولات
                            </span>
                          </button>

                        </div>
                  </div>


                  {/* GRAPHIC_PART */}
                  <div className="w-full md:w-[90%] mx-auto">
                    
                  <div className="flex h-[50px] mt-16 ">
                    <div className="w-full  border-b-[2px] border-gray-300 ">
                      <h1 className="text-xl text-orange-500 pr-2 font-bold ">گرافیک فروشگاه</h1>
                    </div>
                  </div>

                  <div className=" flex  md:justify-around justify-center mb-6 py-10 px-2  flex-row gap-5 flex-wrap">
                        <div className="w-[200px] lg:order-1  flex justify-center items-center  h-[170px] ">
                          <div onClick={()=>logoRef?.current?.click()} className="w-full cursor-pointer h-full bg-beh-green-light rounded-xl flex justify-center items-center">
                              <div>
                              {( fields.logoDone ||response?.sellerProfile?.site_avatar )&& !fields.logoLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                              {!fields.logoDone && !response?.sellerProfile?.site_avatar && !fields.logoLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                              {fields.logoLoading && <ComponentLoading />}
                                <h1 className="text-center text-white">افزودن لوگو</h1>
                              </div>
                              <input type="file" accept="image/png, image/gif, image/jpeg" onChange={onLogoChange} ref={logoRef} className='hidden' />
                          </div>
                        </div>

                        <div className="w-[200px] lg:order-3  flex justify-center items-center h-[170px] ">
                          <div onClick={()=>optional_picsRef?.current?.click()}  className="w-full cursor-pointer h-full bg-beh-orange rounded-xl flex justify-center items-center">
                          <div>
                            {( fields.optional_picsDone || response?.sellerProfile?.site_optional_1)&& !fields.optional_picsLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                            {!fields.optional_picsDone && !response?.sellerProfile?.site_optional_1 && !fields.optional_picsLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                            {fields.optional_picsLoading && <ComponentLoading />}
                                                  <h1 className="text-center text-white">افزودن گالری</h1>
                              </div>
                              <input type="file" multiple max={3} accept="image/png, image/gif, image/jpeg" onChange={onOptionalImagesChange} ref={optional_picsRef} className='hidden' />

                          </div>
                        </div>

                        <div className="w-[600px] lg:order-2  flex justify-center items-center  h-[100px] md:h-[170px] ">

                        <div onClick={()=>bannerRef?.current?.click()} className="w-full cursor-pointer h-full bg-beh-orange rounded-xl flex justify-center items-center">
                              <div>
                              {( fields.bannerDone || response?.sellerProfile?.site_header )&& !fields.bannerLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                              {!fields.bannerDone && !response?.sellerProfile?.site_header && !fields.bannerLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                              {fields.bannerLoading && <ComponentLoading />}

                                <h1 className="text-center text-xl text-white">افزودن بنر</h1>
                              </div>
                              <input type="file" accept="image/png, image/gif, image/jpeg" onChange={onBannerChange} ref={bannerRef} className='hidden' />
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




export default Page