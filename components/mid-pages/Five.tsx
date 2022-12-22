import { useRouter } from "next/router"
import FiveSvg from "../../assets/Five.svg"

export function FiveOO () {
    const router = useRouter()
    return (
      <div className='flex justify-center items-center h-screen text-center'>
      <div className='w-2/5'> 
          <FiveSvg/>
          <div dir='rtl' >
            <p className='text-xl font-bold'>اررور در سرور بهنید</p>
            <p onClick={()=>router.replace('/')} className='text-xl text-gray pt-2'>بازگشت</p>
          </div>
      </div>
      </div>
    )
}