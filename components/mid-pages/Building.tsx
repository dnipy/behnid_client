import { useRouter } from "next/router"
import BuildingSvg from "../../assets/building.svg"

export function Building () {
    const router = useRouter()
    return (
      <div className='flex justify-center items-center h-screen text-center'>
      <div className='w-2/5'> 
          <BuildingSvg/>
          <div dir='rtl' >
            <p className='text-xl font-bold'>در حال ساخت و سازیم ...!</p>
            <p onClick={()=>router.replace('/')} className='text-xl text-gray pt-2'>بازگشت</p>
          </div>
      </div>
      </div>
    )
}