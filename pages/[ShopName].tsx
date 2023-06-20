import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { BiBlock, BiSend } from "react-icons/bi"
import SellerBack from "../assets/SellerBack.png"
import { ApiRequest, AuthorizedApiRequest } from "../clients/axios"
import { BACK_END } from "../clients/localStorage"
import ErrorComponent from "../components/alerts/error"
import Comment from "../components/comments"
import { LoadingComponent } from "../components/loading"
import { MiniProduct } from "../components/products/mini-product"
import { setLoading } from "../lib/features/loading.slice"
import { commentsForSellers, Profile, ratesForSellers, sellerProfile, User } from "../types/async-prisma-types"
import { NextSeo } from "next-seo"
import ComponentLoading from "../components/componentLoading"
import Footer from "../components/footer"


// type ResponseSingleSeller = sellerProfile & {
//   comments: (commentsForSellers & {
//       commentAuthor: User & {
//           profile: Profile;
//       };
//   })[];
//   rates: ratesForSellers[];
//   user: User & {
//       ...;
//   };
//   products: (Product & {
//       ...;
//   })[];
// }

export default function SingleSeller () {
  const router = useRouter()

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [cmloading, setCmloading] = useState(false);
  const [comment, setComment ] = useState('')
  const [id,setId] = useState<number | null>(null)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const {ShopName} = router.query

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  const sendComment = async()=>{
      if (!id) {
        console.log('no id', id)
        return
      }
      else {
        if (comment.length < 3) {
          setError('نظر کوتاه است')
          return
        }

        setCmloading(true)
        const body = {SellerID : Number(id) , comment : comment}
        await AuthorizedApiRequest.post('/sellers/add-comment',body).then((res)=>{
          if (res.data?.err ) {
            setError(res.data?.err)
          }
          else {
            setResponse({...response, comments : [res.data , ...response?.comments]})
            setComment('')
            scrollToBottom()
          }
        }).catch(()=>{
          setError("500")
        }).finally(()=>{

          setCmloading(false)
        })

      }

  }


  useEffect(()=>{
      if(!ShopName){
        return
      }

      setError('')
      setResponse([])
      setloading(true)



      ApiRequest
      .get(`/sellers/by-name?SellerName=${ShopName}`)
      .then((res) => {        
          if (res.data.err) {
            setError(res.data.err)
            console.log(res.data.err)

            router.push('/404')
          } 
          else {
            setResponse(res.data);
            setId(res?.data?.id)
            console.log(res.data)
          }
      })
      .catch((err) => {
        console.log(err)
        // router.replace('/500')
        setError('خطا در اتصال به سرور');

      })
      .finally(() => {  
        setloading(false);
      });

  },[ShopName])



  

  return (
    <>
      <NextSeo
        title={`فروشگاه ${response?.shopName ? response.shopName : ''}`}
      />
    {error ? <ErrorComponent message={error} handle={setError} /> : null}
    { 
      loading == true   ? 
        <LoadingComponent /> :
    <main dir="rtl" className="flex justify-center bg-white ">
        <div className="w-full lg:max-w-7xl absolute z-[5]">
            <div className="flex justify-center items-center rounded-b-[150px] md:rounded-b-[200px] " style={{backgroundImage : `url(${response?.site_header ? BACK_END+response?.site_header :SellerBack.src})` ,width : "100%" , height : "250px" }}></div>
        </div>
        <div className="w-full lg:max-w-7xl absolute z-[6] ">
            <div className="flex justify-center items-center rounded-b-[150px] md:rounded-b-[200px] w-full h-[251px] bg-beh-gray-dark/70 z-10 " ></div>
        </div>

        <div className="w-full lg:max-w-7xl  z-[7] ">
            <div className="text-center rounded-b-[200px] w-full mt-10 " >
              <h1 className="text-beh-orange text-3xl font-bold">
                فروشگاه {response?.shopName}
              </h1>

              <div className="flex  flex-row gap-5 flex-wrap" >

                  <div className="w-[310px]  p-[10px] mx-auto mt-10 flex justify-center" >
                    <div className="">

                      <img src={ response?.site_avatar ? BACK_END + response?.site_avatar :SellerBack.src} className='w-[280px] rounded-lg border-2 border-beh-orange bg-white h-[280px] mx-auto' alt=""  />
                      
                      <div className="w-[280] mx-auto h-[90px] flex flex-row">
                        <div className="w-[90px] h-[90px] p-2 flex justify-center items-center">
                            <img src={response?.user?.avatar  ? `${BACK_END}${response?.user?.avatar}` : SellerBack.src} className='w-[80px] h-[80px] rounded-full' alt="person-image" />
                        </div>
                        <div className="w-[190px] text-right px-2 my-auto">
                            <h1 className="font-bold text-xl">صاحب فروشگاه </h1>
                            <h1 className="font-bold text-lg text-beh-orange cursor-pointer">
                              {response?.user?.profile?.name} {response?.user?.profile?.family}
                            </h1>
                        </div>
                      </div>

                    </div>
                  </div>



                  <div className="w-full md:w-[68%] mt-10   p-[10px] mx-auto  " >
                    <div className="w-full">
                      <div className="w-full flex gap-4 min-h-[160px] flex-row flex-wrap">
                        {response?.site_optional_1 ? <img src={`${BACK_END}${response?.site_optional_1}`}  className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange " />  :   <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange "></div> }
                        {response?.site_optional_2 ? <img src={`${BACK_END}${response?.site_optional_2}`}  className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange mt-12 " />  :   <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange mt-12 "></div> }
                        {response?.site_optional_3 ? <img src={`${BACK_END}${response?.site_optional_3}`}  className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange " />  :   <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange "></div> }

                      </div>
                    </div>

                    <div className="w-full">
                      <div className="px-5 py-3 text-beh-gray-dark font-bold text-right">
                          <h1 className="text-beh-orange text-xl">
                              توضیحات فروشنده
                          </h1>
                          <h5>
                              {response?.shopIntro ? response.shopIntro : <h6 className="text-center">متنی یافت نشد</h6>}
                          </h5>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="bg-beh-bg py-5 px-2 my-10">

                <div className="flex h-[50px] my-5">
                  <div className="w-3/4  border-b-[3px] border-gray-300 ">
                    <h1 className="text-2xl text-orange-500 pr-2 font-bold ">محصولات</h1>
                  </div>
                  <div className="w-1/3">
                    {/* 1/3 */}
                  </div>
                </div>
 


                <div dir="rtl" className="flex flex-wrap justify-center  gap-x-5 gap-y-6 ">
                {loading == false && response?.products?.length > 0 ? (response?.products as Array<any>)?.map((elm :any)=>(
                    <MiniProduct AuthorId={elm?.userID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName} sendFrom={elm?.city?.name} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name} title={elm?.title}  />
                  )) : 
                    <div className="flex items-center justify-center" >
                      <div>
                        <BiBlock className="w-36 h-36 mx-auto fill-beh-gray" />
                        <h1 className="text-center text-lg font-semibold">محصولی توسط این فروشگاه عرضه نشده...!</h1>
                      </div>
                    </div>
                  }

            </div>

            {
             loading == false  && (response?.products as Array<any>)?.length > 9 ?
             <div className="inline-flex justify-center items-center w-full my-4">
                  <hr className="my-8 w-full h-1 bg-gray-300 rounded border-0 "/>    
                  <div onClick={()=>router.replace('/products')} className="absolute left-1/2 px-4 bg-white border-2 border-beh-orange hover:rounded-full transition-all duration-100 hover:duration-300 hover:text-orange-500  -translate-x-1/2 ssss:bg-gray-900 cursor-pointer">
                      <div className='px-5 py-[0.4rem] '>
                          نمایش بیشتر ...
                      </div>
                  </div>
              </div>
              :
              null
            }
            </div>

            <div className="my-10">
                <div className='basis-3/5 px-8 w-full' >
                <label className="relative block w-full">
                  <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} className='h-[100px]  w-full bg-[#636363] rounded-sm px-10 text-beh-gray-light text-3xl font-bold  placeholder:text-beh-gray-light placeholder:text-3xl ' placeholder='اینجا بنویس...' dir='rtl'/>
                    <div className="absolute inset-y-0 left-3 lg:left-8 pt-4 cursor-pointer "  onClick={cmloading ? undefined : sendComment}>
                      
                       
                        <span className="w-24 h-[80%] flex justify-center text-white  items-center bg-beh-yellow">
                        <span>
                              {cmloading ? <ComponentLoading /> : <BiSend className="rotate-180 h-7 w-7 fill-white" />  } 
                        </span>
                      </span>
                      


                    </div>
                  </label>
              </div>
            </div>
            
            <div ref={messagesEndRef} />
            <div className="my-20">
                {
                  (response.comments as Array<any>)?.map(elm=>(
                    <Comment key={elm?.id} text={elm?.message} name={elm?.commentAuthor?.profile?.name} avatar={elm?.commentAuthor?.avatar} />
                  ))
                }
            </div>
        </div>

      </main>
        }
        <Footer/>
        </>

  )
}