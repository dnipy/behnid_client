import Link from 'next/link'
import Router from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'

function Login() {
    const {isUser} = useContext(AuthContext)
    
    if (isUser()) {
            Router.replace('/profile')
    }
    
  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">بازیابی پسورد</h3>
                <form action="">

                    <div className="mt-4">
                        <div className='mb-3'>
                            <label className="block" htmlFor="email">شماره تلفن</label>
                                    <input type="text" placeholder="09120001234"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"/>
                        </div>
                        
                        
                            <button className="px-32 py-2 mx-4 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500">بازیابی پسورد</button>
                            <button  className="px-32 py-2 mx-4 mt-4 text-gray-500 rounded-lg hover:border border-gray-500  "><Link href='/'> بازگشت  </Link></button>
                        

                    </div>
                    
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login