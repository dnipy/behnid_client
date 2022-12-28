import { useRouter } from "next/router"
import FiveSvg from "../../assets/Five.svg"

export function FiveOO () {
    const router = useRouter()
    return (
      <div className='flex justify-center items-center h-screen text-center'>
      <div className='w-2/5'> 
          <FiveSvg/>
          <div dir='rtl' >
            <p className='text-xl font-bold'>ارور در سرور بهنید</p>
            <p onClick={()=>router.replace('/')} className='text-xl w-1/2 ml-auto mr-auto text-gray pt-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded-sm pb-3 mt-2 transition-all duration-150 '>بازگشت</p>
          </div>
      </div>
      </div>
    )
}