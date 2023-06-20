import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Dispatch, useEffect, useRef, useState } from "react";
import {  ApiRequest, AuthorizedApiRequest } from "../../../clients/axios";
import { BACK_END } from "../../../clients/localStorage";
import NoPerson from '../../../assets/NoPerson.png'
import NoImg from '../../../assets/NoImg.png'
import ErrorComponent from "../../../components/alerts/error";
import { LoadingComponent } from "../../../components/loading";
import { City, commentsForProductsComments, keywordForProducts, OFF, packType, Product, ProductStatus, sellerProfile, Unit, User } from "../../../types/async-prisma-types";
import { packTypeCheck } from "../../../utils/PackType";
import Comment from "../../../components/comments";
import SuccesComponent from "../../../components/alerts/succes";
import { NextSeo } from "next-seo"
import SpamProduct from "../../../features/components/report/spam-product";
import { SelectedCitiesModel } from "../../../features/components/selected_cities";
import { ToRial } from "../../../utils/separate_numbers";
import Footer from "../../../components/footer";



type SingleProduct = Product & {
  comments: {
    commentAuthor: {
      avatar: string;
      name: string;
      id: number;
      profile: {
          name: string;
          address: string;
      };
    };
    date: Date;
    message: string;
    repliedComments: commentsForProductsComments[];
  }[];

  categorie: {
    name: string;
    subCategory: {
        name: string;
        mainCatName: string;
    };
  };
  author: sellerProfile & {
    user: User & {
        profile: {
            name: string;
            family: string;
        };
    };
}
  city: City;
  keywords: keywordForProducts[];
  off: OFF[];
  packType: packType;
  productStatus: ProductStatus;
  sendArea: City[];
  unit: Unit;
}



const Page : NextPage = ()  => {
  const router = useRouter()
  const {id} = router.query
  const [comment,setComment] = useState('')
  const [response, setResponse] = useState<null | SingleProduct>(null);
  const [error, setError] = useState('');
  const [Succes, setSucces] = useState('');
  const [unit, setUnit] = useState('')
  const [loading, setloading] = useState(true);
  const [openSpam,setOpenSpam] = useState(false)
  const [SelectedCityOpen,setSelectedCityOpen] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }




  useEffect(()=>{
    if(!id){
      return
    }
    setError('')
    setResponse(null)
    setloading(true)
    ApiRequest
    .get(`/products/single?id=${id}`)
    .then((res ) => {

      if (res.data.err) {
        setError(res.data.err)
        router.replace('/404')
      }
      else {
        setResponse(res.data);
        console.log(res.data)
        setUnit(res.data?.unit?.name!)
      }
    })
    .catch((err) => {
      setError(err);
      // router.replace('/404')
    })
    .finally(() => {
      setloading(false);
    });
  
},[id])





  const addComment = async()=>{ 
    if (comment.length < 3) {
      setError('نظر کوتاه است')
      return
    }
    setloading(true)
    
    await AuthorizedApiRequest.post('/comments/onProduct', {
      productID : id,
      message : comment
    }).then(res=>{
      if (res.data?.err ) {
        setError(res.data?.err)
      }
      else {
        console.log(res.data)
        setResponse({...response!, comments : [res.data , ...response?.comments!]})
        setComment('')
        scrollToBottom()
      }
    }).catch(e=>{
      setError('خطا در ارتباط با سرور')
    })
    .finally(()=>{
      setloading(false)
    })
  }


  const saveProduct = async()=>{ 
    setloading(true)
    
    await AuthorizedApiRequest.post('/profile/add-to-intresting-products', {
      id : id,
    }).then(res=>{
      if (res.data?.err ) {
        setError(res.data?.err)
      }
      else {
          setSucces(res.data?.msg)
      }
    }).catch(e=>{
      setError('خطا در ارتباط با سرور')
    })
    .finally(()=>{
      setloading(false)
    })
  }


return (
    <> 
      <NextSeo
      title={response?.title ? response?.title : 'محصول بهنید'}
       />
      {loading && <LoadingComponent/>}
      {error && <ErrorComponent  message={error} handle={setError} />}
      {Succes && <SuccesComponent handle={setSucces} message={Succes} />}
      {openSpam && <SpamProduct openState={openSpam} setOpenState={setOpenSpam} />}
      {SelectedCityOpen && <SelectedCitiesModel cities={response?.sendArea ? response?.sendArea : undefined} fildes={SelectedCityOpen} setFileds={setSelectedCityOpen} />}
       <main dir="rtl" className="flex justify-center">
        <div className="w-full lg:max-w-7xl ">
          {/* TOP_PART */}
          <TopPart setopenSpam={setOpenSpam} saveProduct={saveProduct} main={response?.categorie?.subCategory?.mainCatName} sub={response?.categorie?.subCategory?.name} cat={response?.categorie?.name} title={response?.title ? response?.title : ''} />

          {/* PAGE_START */}
          <div>
            {/* GRAY_BG_PART */}
            <div className="relative w-full ">
              <div className="absolute w-full z-[0] h-[970px] md:h-[850px] lg:h-[450px] bg-beh-gray">
              </div>
            </div>


            {/* PAGE_CONTENT */}
            <div className="relative z-10 w-full min-w-[340px]">
              <div>

                {/* TOP_PART */}
                <div className="w-full flex flex-wrap ">
                      <div className="w-full lg:w-[33.333%] lg:min-w-[380px] pl-3 pr-3 lg:pr-0 py-3 ">

                        {/* RIGHT_PART */}
                        <div className=" flex justify-center lg:justify-start flex-wrap gap-1">
                          <div className="w-[80%]  order-2 sm:order-1 md:w-[240px] h-[120px] flex justify-center items-center bg-beh-orange">
                            <div className="text-white text-center text-lg">
                              <h1 className="font-bold">
                                فروشگاه {response?.author?.shopName  ? response?.author?.shopName : 'بدون نام'}
                              </h1>
                              <h1 className="text-lg">
                                {response?.author?.user?.profile?.name} {response?.author?.user?.profile?.family}
                              </h1>
                            </div>
                          </div>
                          <div className="w-[120px] order-1 sm:order-2 h-[120px] flex justify-center items-center ">
                                <div className="w-[95px] h-[95px] rounded-full flex justify-center items-center bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue">
                                    <img src={NoPerson.src} alt={`فروشگاه${response?.author?.shopName}`} className='w-[90px] h-[90px] rounded-full' />
                                </div>
                          </div>
                        </div>
                        
                        <div className="w-full  text-white text-sm order-2 sm:order-1 text-center lg:px-4  lg:text-right h-[80px] flex justify-center items-center mt-1 ">
                          
                            <div className="w-full">                              
                              <div>
                                <h1>امتیاز فروشگاه : -</h1>
                              </div>
                              <div>
                                <h1>مدت پاسخگویی : -</h1>
                              </div>
                            </div>
                        </div>


                        <div className="w-full    text-white text-sm order-2 sm:order-1 text-center lg:px-4  lg:text-right flex justify-center items-center mt-1 ">
                          
                          <div className="w-[340px] h-[340px] bg-beh-gray shadow-xl flex justify-center items-center rounded-md border-2 border-beh-gray-light">                              
                            <img src={response?.image ? `${BACK_END}${response.image}` : NoImg.src} className='w-[330px] rounded-md h-[330px]'  alt="" />
                          </div>
                      </div>
                      </div>
                      



                      {/* LEFT_PART */}
                      <div className="w-full lg:w-[63%] p-3  h-full">
                        <div className="w-full">
                          {/* FOUR_PART */}
                          <div>
                            {/* WHITE_BG */}
                            <div className="relative mt-5 z-5 w-full">
                              <div className="absolute mx-auto w-full h-16 bg-white"></div>  
                            </div>

                            {/* CONTENT_PART */}
                            <div className="relative">
                              <div className="absolute mx-auto mt-5 w-full h-16  gap-3 flex flex-row">
                                  <div className="basis-1/2 lg:basis-1/4 flex justify-center ">
                                      <div>
                                      <h1 className="text-center">
                                        حداقل سفارش
                                      </h1>
                                      <div className="min-w-[150px] mt-1 h-[40px] text-white bg-beh-orange flex justify-center items-center rounded-xl">
                                          <h1> {response?.minOrder && ToRial(String(response?.minOrder))}  {unit}</h1>
                                        </div>
                                      </div>

                                    <div>
                                    </div>
                                  </div>

                                  <div className="basis-1/2 lg:basis-1/4 flex justify-center ">
                                      <div>
                                        <h1 className="text-center">
                                            محل بارگیری
                                        </h1>
                                        <div className="w-[150px] mt-1 text-white h-[40px] bg-beh-orange flex justify-center items-center rounded-xl">
                                          <h1>{response?.city?.name ? response?.city?.name : 'نامشخص'}</h1>
                                        </div>
                                      </div>

                                    <div>
                                    </div>
                                  </div>

                                  <div className="hidden lg:basis-1/4 lg:flex justify-center ">
                                      <div>
                                        <h1 className="text-center">
                                          زمان ارسال
                                        </h1>
                                        <div className="w-[150px] text-white mt-1 h-[40px] bg-beh-orange flex justify-center items-center rounded-xl">
                                            <h1>{response?.deliveryTime ? response.deliveryTime : '1'} روز</h1>
                                        </div>
                                      </div>

                                    <div>
                                    </div>
                                  </div>

                                  <div className="hidden lg:basis-1/4 lg:flex justify-center ">
                                      <div>
                                      <h1 className="text-center">
                                          قیمت هر ( {unit} )
                                      </h1>
                                      <div className="w-[150px]  text-white mt-1 h-[40px] bg-beh-orange flex justify-center items-center rounded-xl">
                                          <h1>{response?.price ? `${ToRial(String(response?.price))} تومان` : 'توافقی'}</h1>
                                        </div>
                                      </div>

                                    <div>
                                    </div>
                                  </div>
                              </div>  
                            </div>
                          </div>

                          {/* TWO_PART */}
                          <div>
                            {/* WHITE_BG */}
                            <div className="relative lg:hidden z-5 w-full">
                              <div className="absolute top-36 mx-auto w-full h-16 bg-white"></div>  
                            </div>

                            {/* CONTENT_PART */}
                            <div className="relative lg:hidden">
                              <div className="absolute top-[8.5rem]  mx-auto mt-5 w-full h-16  gap-3 flex flex-row">
                                  <div className="flex basis-1/2 lg:basis-1/4 lg:hidden justify-center ">
                                  <div>
                                          <h1 className="text-center">
                                            زمان ارسال
                                          </h1>
                                          <div className="w-[150px] text-white mt-1 h-[40px] bg-beh-orange flex justify-center items-center rounded-xl">
                                              <h1>{response?.deliveryTime ? response.deliveryTime : '1'} روز</h1>
                                          </div>
                                        </div>
                                    <div>
                                    </div>
                                  </div>

                                  <div className="flex basis-1/2 lg:basis-1/4 lg:hidden justify-center ">
                                  <div>
                                        <h1 className="text-center">
                                            قیمت هر ( {unit} )
                                        </h1>
                                        <div className="w-[150px]  text-white mt-1 h-[40px] bg-beh-orange flex justify-center items-center rounded-xl">
                                            <h1>{response?.price ? `${response?.price} تومان` : 'توافقی'}</h1>
                                          </div>
                                        </div>

                                    <div>
                                    </div>
                                  </div>
                              </div>  
                            </div>
                          </div>
                          
                          {/* INFO_PART */}
                          <div>
                            {/* CONTENT_PART */}
                            <div className="relative  ">
                              <div className="absolute  top-[15.5rem] lg:top-[5.5rem]  mx-auto mt-5 w-full  flex-wrap   gap-3 flex flex-row">
                                  
                                <div className=" px-8 w-full flex justify-center flex-wrap lg:justify-end items-center gap-3">
                                    <div className="order-2 lg:order-1  ">
                                        <div onClick={()=>setSelectedCityOpen(true)} className="min-w-[140px] cursor-pointer px-10 h-[40px] bg-beh-orange rounded-xl text-center text-white flex justify-center items-center">
                                          <h1>
                                            مشاهده محدوده ارسال
                                          </h1>
                                        </div>
                                    </div>


                                    <div className="text-center order-1 lg:order-2 ">
                                      <h1 className="text-beh-gray-dark lg:text-white ">
                                        قیمت مصرف کننده
                                      </h1>

                                      <div className="w-[150px] mt-1 h-[30px] bg-white flex justify-center items-center rounded-lg">
                                        <h1 className="text-beh-orange font-bold">
                                          {response?.customerPrice ?ToRial(String(response?.customerPrice)) : '0'}
                                        </h1>                                   
                                      </div>
                                      
                                      <h1 className="pt-1 text-beh-gray-dark lg:text-white ">
                                        قیمت تولید کننده
                                      </h1>
                                      <div className="w-[150px] mt-1 h-[30px] bg-white flex justify-center items-center rounded-lg">
                                        <h1 className="text-beh-orange font-bold">
                                          {response?.producerPrice ? ToRial(String(response.producerPrice)) : '0'}
                                        </h1>                         
                                      </div>

                                    </div>
                                </div>
                              </div>  
                            </div>
                          </div>


                          {/* DESCRIBE_PART */}
                          <div>
                            {/* CONTENT_PART */}
                            <div className="relative  ">
                              <div className="absolute  top-[27.5rem] sm:top-[23.5rem] lg:top-[12.5rem]  mx-auto mt-5 w-full  flex-wrap   gap-3 flex flex-row">
                                  <div className="w-[90%] mx-auto">
                                      <h1 className="text-beh-orange  text-2xl">
                                          توضیحات فروشنده
                                      </h1>

                                      <h1 className="my-3 h-28 lg:text-white">
                                          {response?.describe}
                                      </h1>

                                      <div onClick={()=> router.push(`/chat?id=new-chat?id=${response?.author?.userID}`)} className="w-full  text-2xl my-2 cursor-pointer font-bold bg-beh-green-super-light flex justify-center items-center text-white h-16 rounded-xl">
                                        <h1>
                                          شروع گفت و گو
                                        </h1>
                                      </div>
                                  </div>
                              </div>
                            </div>
                          </div>

                         
                        </div>

                        
                      </div>
                      
                </div>





              </div>
            </div>
          </div>

          <div className="my-10 relative mt-[44rem] lg:mt-10">
                <div className='basis-3/5 px-8 w-full' >
                <label className="relative block w-full">
                  <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} className='h-[100px]  w-full bg-[#636363] rounded-sm px-10 text-beh-gray-light text-3xl font-bold  placeholder:text-beh-gray-light placeholder:text-3xl ' placeholder='اینجا بنویس...' dir='rtl'/>
                    <div className="absolute inset-y-0 left-8 pt-4 cursor-pointer "  onClick={addComment}>
                      <span className="w-24 h-12 flex justify-center items-center bg-beh-yellow">
                        <span>

                        <svg className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                            height="30" viewBox="0 0 30 30">
                            <path
                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                            </path>
                        </svg>
                        </span>
                      </span>
                      <span className="text-lg text-white text-center pr-6">
                        ارسال
                      </span>
                    </div>
                  </label>
              </div>
            </div>
            
            <div ref={messagesEndRef} />
            <div className="my-20">
                {
                  response?.comments.map(elm=>(
                    <Comment key={elm.commentAuthor?.id} text={elm?.message} name={elm?.commentAuthor?.profile?.name} avatar={elm?.commentAuthor?.avatar} />
                  ))
                }
            </div>
        </div>
      </main>
      <Footer />
    </>
  )
}  



const TopPart = (props : {  setopenSpam :  React.Dispatch<React.SetStateAction<boolean>>  ,saveProduct :()=>Promise<void>  , main : string | undefined , sub : string | undefined , cat : string | undefined , title : string}) => {
    return (
      <>
        <div className=" my-8 flex flex-row flex-wrap md:flex-nowrap gap-3  w-full">

        <div className="basis-full lg:basis-2/3 px-2">
        <h1 className="text-xl ">
            <span className="text-beh-orange px-2">
              {props.main}&nbsp;  
            </span>

            <span>
              {'>'}
            </span>


            <span className="text-beh-orange px-1">
              {props.sub}&nbsp; 
            </span>

            <span>
            {'>'}
            </span>


            <span className="text-beh-orange px-1">
              {props.cat}&nbsp; 
            </span>

            <span>
            {'>'}
            </span>



            <span className="text-beh-orange px-1">
              {props.title}&nbsp; 
            </span>
          
          </h1>
        </div>

        <div className="  gap-x-2 lg:basis-1/3 lg:flex h-full w-full flex flex-row md:block md:w-auto justify-center items-center">

            <div onClick={props.saveProduct} className="w-[100px] my-2 cursor-pointer flex items-center text-center justify-center h-[35px] bg-beh-green-light text-white rounded-md">
              <h1 >
                ذخیره
              </h1>
            </div>

            <div onClick={()=>props.setopenSpam(true)} className="w-[200px] my-2 cursor-pointer flex items-center text-center justify-center h-[35px] bg-beh-red text-white rounded-md">
              <h1 >
                گزارش تخلف این محصول
              </h1>
            </div>


        </div>
        </div>
      </>
    )
}


export default Page




