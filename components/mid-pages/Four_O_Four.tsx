import { useRouter } from "next/router"
import Four from "../../assets/404.png"

export function FourOFour () {
    const router = useRouter()
    return (
      <div className='flex justify-center items-center h-screen bg-[#131A1E] text-center'>
      <div className='w-2/5'> 
          <div dir='rtl' >
          <img src={Four.src} className='mx-auto' />
            <p className='text-xl font-semibold text-white'>یافت نشد ...!</p>
            <p onClick={()=>router.replace('/')} className='text-xl w-1/2 ml-auto mr-auto text-gray pt-2 bg-beh-orange cursor-pointer text-white hover:bg-orange-400 hover:text-white rounded-sm pb-3 mt-2 transition-all duration-150 '>بازگشت</p>
          </div>
      </div>
      </div>
    )
}