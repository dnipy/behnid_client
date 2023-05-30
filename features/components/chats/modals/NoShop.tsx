import { useRouter } from "next/router"
import Market from '../../../../assets/Market.png'
import Behnid from '../../../../assets/logo-croped.png'
import { SetStateAction } from "react"

export const NoShopModal = ()=>{
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


export const ShopNotAcceptedYetModal = (props : {state : boolean , setState : React.Dispatch<SetStateAction<boolean>>})=>{
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
                    <h1 className="text-3xl p-5 text-beh-orange text-center">
                      فروشگاه شما هنوز توسط تیم  <br /> بهنید برسی و تایید نشده است
                    </h1>
                  </div>
                  <div className="w-full flex justify-center">
                    <button onClick={()=>props.setState(false)} className="w-[250px] h-[60px] rounded-lg text-white text-2xl mx-auto my-auto bg-beh-green-super-light">
                      بستن
                    </button>
                  </div>
              </div>
          </div>
        </div>
    </div>
    )
}


export const ShopRejectedModal = (props : {state : boolean , setState : React.Dispatch<SetStateAction<boolean>> , setUp : React.Dispatch<SetStateAction<boolean>>})=>{
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
                  <h1 className="text-3xl p-5 text-beh-orange text-center">
                    پس از مشاهده دقیق توسط <br /> تیم بهنید فروشگاه شما <br /> به دلیل نقض قوانین رد شد
                  </h1>
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={()=>{
                    props.setUp(true)
                    props.setState(false)
                    }} className="w-[250px] h-[60px] rounded-lg text-white text-2xl mx-auto my-auto bg-beh-green-super-light">
                    ثبت نام فروشگاه
                  </button>
                </div>
            </div>
        </div>
      </div>
  </div>
  )
}
  