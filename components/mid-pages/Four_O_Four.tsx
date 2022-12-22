import { useRouter } from "next/router"
import Four from "../../assets/Four.svg"

export function FourOFour () {
    const router = useRouter()
    return (
      <div className='flex justify-center items-center h-screen text-center'>
      <div className='w-2/5'> 
          <Four/>
          <div dir='rtl' >
            <p className='text-xl font-bold'>یافت نشد ...!</p>
            <p onClick={()=>router.replace('/')} className='text-xl text-gray pt-2'>بازگشت</p>
          </div>
      </div>
      </div>
    )
}