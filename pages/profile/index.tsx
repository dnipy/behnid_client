import { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import ProfileCard from "../../components/ProfileCard";
import Router, { useRouter } from "next/router";
import { Model } from "../../components/Model";
import { LoadingComponent } from "../../components/loading";


const Page : NextPage = ()  => {
  const router = useRouter()


  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [model, setModel] = useState(false);
  const [modelText,setModelText] = useState('')


  const fetchData = () => {
      AuthorizedApiRequest
          .get('/profile/my-data')
          .then((res) => {
              if (res.data.err) {
                console.log(res.data.err)
              }
              else {
                  setResponse(res.data);
              }
          })
          .catch((err) => {
              setError(err);
              router.replace('/500')
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



  console.log(response)
  return (
    <>
      { typeof response == 'object' ? 



<div className="bg-gray-100 min-h-fit">

      {loading ?   <LoadingComponent/>   : 
    <>
    {
        model ? 
            <Model click={()=>setModel(false)} text={modelText}  />
            :
            null
    }
    <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          
            <div className="w-full md:w-3/12 md:mx-2">
            
                <div dir="rtl" className="bg-white p-3 border-t-4 border-orange-300">
                    <div className="image overflow-hidden">
                        <img className="h-auto w-full rounded-full mx-auto"
                            src={response?.avatar ? `https://behnid.com${response.avatar}` : "https://archive.org/download/no-photo-available/no-photo-available.png"}
                            alt=""/>
                    </div>
                    <h1 className="text-gray-900 text-center font-bold text-xl leading-8 pb-2 my-1">{response?.name}@</h1>
                    <h3 className="text-gray-600 text-center font-lg text-semibold leading-6">{response?.Role == "Seller" ?  "فروشنده" : "خریدار"}</h3>
                    <h5 className="text-gray-600 text-center text-xs text-semibold pb-2 leading-6">{ response?.sellerProfile?.sellerStatus == "pending" ? '( در انتظار تایید درخواست )'  : null}</h5>
                    <p className="text-sm text-center text-gray-500 hover:text-gray-600 leading-6">{response?.bio ? response.bio : '-'}</p>
                    <button
                        onClick={()=>Router.push('/profile/change-detaile-uniqe')}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        تغییر
                    </button>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>وضعیت</span>
                            <span className="mr-auto"><span
                                    className="bg-orange-400 py-1 px-2 rounded text-white text-sm">{response?.status ? 'فعال' : 'غیرفعال' }</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>عضو از تاریخ</span>
                            <span className="mr-auto">{(response?.date as string)?.slice(0,10)}</span>
                        </li>
                    </ul>
                </div>
              
                <div className="my-4"></div>
            

            </div>
            
            <div className="w-full md:w-9/12  h-auto">
            
                <div dir="rtl" className="bg-white p-3 shadow-sm rounded-sm text-right">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 ">
                        <span className="text-orange-400 px-1">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide px-1">توضیحات</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">نام</div>
                                <div className="px-4 py-2">{response?.profile?.name ? response.profile.name : '-'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">نام خانوادگی</div>
                                <div className="px-4 py-2">{response?.profile?.family ? response?.profile?.family : '-'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">شهر</div>
                                <div className="px-4 py-2">{response?.cityName ? response?.cityName : '-'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">شماره تماس</div>
                                <div className="px-4 py-2">{response?.phone ? response?.phone : '-'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">آدرس</div>
                                <div className="px-4 py-2">{response?.profile?.address ? (response?.profile?.address as string).slice(0,25) : '-'} ...</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">تماس محل کار</div>
                                <div className="px-4 py-2">{response?.profile?.workNumber ? response?.profile?.workNumber : '-'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">ایمیل</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">{response?.email ? response?.email : '-'}</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">نام کاربری</div>
                                <div className="px-4 py-2">{response?.name ? `${response?.name}@` : '-'}</div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={()=>Router.push('/profile/change-detaile')}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        تغییر اطلاعات
                    </button>
                </div>
       

                <div className="my-4"></div>

              
                <div dir="rtl" className=" text-right bg-white p-3 shadow-sm rounded-sm">

                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-orange-400 px-1">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide px-1">تیکت ها</span>
                        
                        
                    </div>
                    {response.tickets ?  
                      <div>
                        {
                            (response.tickets as Array<any>).map((elm)=>(
                                <div key={elm?.id} className="grid grid-cols-6 py-2">
                                <div className="px-4 py-2 col-span-4 "> {elm.id} - {(elm.message as string).slice(0,30)}...</div>
                                
                                <div className="px-4 py-2 ">{elm.status == "pending" ? <p className="text-yellow-500">در صف انتظار</p> : <p onClick={()=>{
                                    setModel(true)
                                    setModelText(elm?.response  ? elm.response : '')
                                }} className="cursor-pointer hover:bg-green-600 hover:text-white rounded-md text-center py-2 text-green-600 col-span-1">پاسخ داده شده</p> }</div>
                            
                                <p onClick={()=>deleteTicket(elm.id as number)} className=" cursor-pointer hover:bg-red-600 hover:text-white rounded-md text-center py-2 text-red-600 col-span-1 ">حذف</p>
                            </div>
                          ))
                        }
                      </div>
                    : <p className="text-center" > تیکتی موجود نیست </p>  }
                </div>



                <div className="my-4"></div>
                <div dir="rtl" className=" text-right bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                          <span className="text-orange-400 px-1">
                              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                          </span>
                          <span className="tracking-wide px-1">کنترل</span>   
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-10">
                        <ProfileCard title="آواتار"  describe="تغییر عکس پروفایل حساب شما" link="/profile/add-avatar"/>

                        {response?.sellerProfile?.sellerStatus == 'accepted' ? 
                            <ProfileCard title="محصولات"  describe="لیست تمام محصولات معرفی شده توسط شما" link="/profile/all-products"/> 
                            :
                            null
                        }

                        {response?.sellerProfile?.sellerStatus == 'accepted' ? 
                            <ProfileCard title="افزودن محصول"  describe="اضافه کردن محصول به فروشگاه خود" link="/profile/add-product"/>
                            :
                            null
                        }

                        {/* {response?.sellerProfile.sellerStatus == 'accepted' ? 
                            <ProfileCard title="عکس محصول"  describe="افزودن یا تغییر تصویر محصول" link="/profile/add-product"/> 
                            :
                            null
                        } */}
                        
                        {response?.sellerProfile ? 
                            null
                            :
                            <ProfileCard title="فروشندگی"  describe="تغییر حساب به حساب فروشنده" link="/profile/become-seller"/>
                        }


                        <ProfileCard title="درخواست ها"  describe="لیست تمام در خواست های آزاد شما" link="/profile/all-requests"/> 
                        <ProfileCard title="افزودن درخواست"  describe="افرودن درخواست آزاد در لیست درخواست ها" link="/profile/add-free-request"/> 




                        <ProfileCard title="افزودن تیکت"  describe="افزودن تیکت به سمت پشتیبانی" link="/profile/add-ticket"/> 
                        <ProfileCard title="تغییر پسورد"  describe="تغییر رمز عبور حساب کاربری" link="/profile/change-password"/> 
                        <ProfileCard title="مخاطبین"  describe="مخاطبین ذخیره شده در بهنید" link="/chat/my-contact"/> 
                        <ProfileCard title="افزودن مخاطب"  describe="اضافه کردن مخاطب در بهنید" link="/profile/add-contact"/> 


                    </div>
                </div>
               
            </div>
        </div>
    </div>
    </>
    }
</div>




:null}
    </>
  )
}  

export default Page