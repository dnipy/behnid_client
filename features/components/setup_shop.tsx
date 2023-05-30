import React, { useRef, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { MdAddCircle, MdCheck } from 'react-icons/md'
import ErrorComponent from '../../components/alerts/error'
import ComponentLoading from '../../components/componentLoading'
import { CategoryPickerModel } from './category_picker_any'
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from '../../clients/axios'
import { useRouter } from 'next/router'

function SetupShop(props:{cat?:string , gallery?: boolean , logo?:boolean , banner?:boolean , onClick?: ()=>void}) {
    const [error,setError] = useState('')
    const [response,setResponse] = useState<string | null>(null)
    const [loading,setLoading] = useState(false)
    const [fields,setFields]= useState<{
        shopName : string,
        shopId : string,
        bio : string,
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
    const router = useRouter()

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


    const handleSend = async ()=>{
        if (fields.bio.length < 20) {
          setError('بیوگرافی باید حداقل 20 حرف داشته باشی')
          return
        }
        setLoading(true)
        const body = {
          shopName : fields.shopName,
          shopId : fields.shopId,
          bio : fields.bio
        }


        AuthorizedApiRequest
        .post('/sellers/add-shop',body)
        .then((res) => {
            console.log({res})
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
              setResponse('موفق')
              setTimeout(() => {
                router.reload()
              }, 200);
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false);
        });

    }
  return (
    <>
    {error && <ErrorComponent handle={setError} message={error} />}
    {fields.showCatPicker && <CategoryPickerModel onClick={props.onClick ? props.onClick : undefined} fildes={fields} setFileds={setFields} />}
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
    
    {/* CENTER_DATA_PART */}
    <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-[380px]  shadow-2xl md:w-[600px] min-w-[370px]  mx-auto h-[90vh]  bg-white rounded-3xl overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
            <div>      

                {/* CITY_SELECT_PART */}
                <div dir="ltr" className="w-full my-4 px-4 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray h-[85vh]  ">
                  <div dir="rtl">
                    <h1 className="font-bold text-center text-beh-red">
                      شما فروشگاهی ندارید!! با استفاده از پنل زیر میتوانید بسازید
                    </h1>

                    <div className="mt-5 mb-2">
                      <div className="w-full flex flex-row justify-center flex-wrap gap-5">
                            <div className="w-[300px] my-auto order-2 lg:order-1">
                              <div dir="ltr" className="flex justify-center items-center">
                                <div>
                                  <h1 className="text-beh-orange text-xl font-bold">
                                    behnid.com/
                                  </h1>
                                </div>
                              <div>
                              <input value={fields.shopId} onChange={(e)=>{
                                  let value = e.target.value
                                  value = value.replace(/[^A-Za-z]/ig, '')

                                setFields({...fields,shopId : value})
                              }} type="text" className="w-[155px] md:w-[200px] h-10 rounded-lg bg-[#D9D9D9] text-center text-xl placeholder:text-[#B8B8B8] placeholder:text-center placeholder:text-xl" placeholder="Latin-ID"/>
                          </div>
                        </div>
                      </div>

                      <div className="w-[280px] md:w-[200px] my-auto order-1 md:order-2">
                        <input value={fields.shopName} onChange={(e)=>setFields({...fields,shopName : e.target.value})} type="text" className="w-full h-10 rounded-lg bg-[#D9D9D9] text-center text-xl placeholder:text-[#B8B8B8] placeholder:text-center placeholder:text-xl" placeholder="نام فارسی فروشگاه"/>            
                      </div>

                    </div>
                    <div className="w-full my-5 px-5">
                        <label className="relative block">
                            <textarea value={fields.bio} onChange={(e)=>setFields({...fields,bio : e.target.value})} className='min-h-[200px] overflow-y-auto w-full bg-[#D9D9D9] placeholder:text-[#B8B8B8] placeholder:p-1 rounded-sm px-5 pt-10 pb-2  placeholder:break-words placeholder:text-lg ' placeholder='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد...' dir='rtl'/>
                            <span className="absolute h-10 inset-y-0 right-3 top-2 pl-3" >
                              <h1 className="font-bold text-lg bg-[#D9D9D9] ">
                                درباره فروشگاه   
                              </h1>
                            </span>
                        </label>
                    </div>

                    <div className="w-full my-5 px-5 flex flex-row flex-wrap gap-5 justify-center">
                      {/* RIGHT_ROW */}
                      <div className="w-[240px] md:w-[180px] ">
                        <div className="w-full my-2 flex justify-center">
                            <button onClick={()=>setFields({...fields,showCatPicker : true})} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-beh-yellow hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-beh-gray-dark font-medium rounded-lg text-md h-10 mx-auto px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                
                                {
                                  fields.cat_name ? fields.cat_name.slice(0.16) : 
                                    props.cat ? props.cat : 'دسته بندی فروشگاه'
                                }

                                
                                <svg className="w-4 h-4 ml-2 mx-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                        </div>

                        <div className="w-full my-2 flex justify-center">
                            <div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="w-full cursor-pointer text-white bg-beh-green-super-light h-[120px] hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-beh-gray-dark font-medium rounded-lg text-md  mx-auto px-4 py-2.5 text-center flex flex-col justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <BsEye className="w-12 mx-auto h-12 fill-white"/>
                                <h1>
                                    نمونه فروشگاه
                                </h1>
                            </div>
                        </div>
                      </div>

                      {/* LEFT_ROW */}
                      <div className="w-[320px] flex flex-col justify-around gap-5 md:gap-0 ">
                          
                      <div className="w-full h-9 bg-beh-green-light rounded-xl  items-center">
                        <button onClick={()=>logoRef?.current?.click()} className=" w-full text-center h-full flex flex-row justify-center items-center  text-white">
            
                          <span className="px-1" >
                            {( fields.logoDone || props.logo )&& !fields.logoLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                            {!fields.logoDone && !props.logo && !fields.logoLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                            {fields.logoLoading && <ComponentLoading />}
                          </span>

                          <span>
                            افزودن لوگو
                          </span>
                        </button>
                        <input accept="image/png, image/gif, image/jpeg" onChange={onLogoChange} maxLength={1} type="file" ref={logoRef} className='hidden' />
                      </div>

                      <div className="w-full h-9 bg-beh-orange rounded-xl  items-center">
                        <button onClick={()=>bannerRef?.current?.click()} className=" w-full text-center h-full flex flex-row justify-center items-center  text-white">
            
                          <span className="px-1" >
                            {( fields.bannerDone || props.banner )&& !fields.bannerLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                            {!fields.bannerDone && !props.banner && !fields.bannerLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                            {fields.bannerLoading && <ComponentLoading />}
                                                  
                          </span>

                          <span>
                            افزودن بنر
                          </span>
                        </button>
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={onBannerChange} maxLength={1} ref={bannerRef} className='hidden' />
                      </div>

                      <div className="w-full h-9 bg-beh-orange rounded-xl  items-center">
                        <button onClick={()=>optional_picsRef?.current?.click()} className=" w-full text-center h-full flex flex-row justify-center items-center  text-white">
            
                          <span className="px-1" >
                            
                            {( fields.optional_picsDone || props.gallery )&& !fields.optional_picsLoading && <MdCheck className="w-5 mx-auto h-5  fill-white"/>  }
                            {!fields.optional_picsDone && !props.gallery && !fields.optional_picsLoading && <MdAddCircle className="w-5 mx-auto h-5  fill-white"/>  }
                            {fields.optional_picsLoading && <ComponentLoading />}
                  
                          </span>

                          <span>
                            افزودن گالری
                          </span>
                        </button>
                        <input type="file" multiple max={3} accept="image/png, image/gif, image/jpeg" onChange={onOptionalImagesChange} ref={optional_picsRef} className='hidden' />
                      </div>
                      </div>
                    </div>

                    <div className="w-full my-5 px-5 flex flex-row flex-wrap gap-5 justify-center">

                    <div className="w-full h-12 bg-beh-green-super-light rounded-xl  items-center">
                        <button onClick={!loading ? handleSend : undefined} disabled={loading}  className="text-center text-xl font-semibold h-full w-full  text-white">
                            {
                                loading
                                    ?
                                <ComponentLoading />
                                    :
                                'ساخت فروشگاه'
                            }
                        </button>
                      </div>

                    </div>
                  </div>
                  </div>
                </div>
             
            </div>
        </div>
    </div>
</div>
</>
)
}

export default SetupShop