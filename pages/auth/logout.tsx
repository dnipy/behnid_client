import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'

function Login() {
  const router = useRouter()

  
  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">خروج از حساب کاربری</h3>

                    <div className="mt-4">
                            <p className='text-center'>ایا از تصمیم خود اطمینان دارید؟</p>
                        
                            <button onClick={()=>{
                              localStorage.clear()
                              router.replace('/')
                            }
                            } className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">بله</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        
                      
                    </div>
                    
            </div>
        </div>

    </div>
  )
}

export default Login