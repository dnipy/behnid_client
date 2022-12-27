import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AuthorizedApiRequest } from '../clients/axios'
import { AuthContext } from '../contexts/Auth'
import { useAppSelector } from '../hooks/redux'
import { OpenAndClose, OpenAndCloseCat, OpenAndCloseMob, OpenAndCloseNotif, setCatNum } from '../lib/features/navbar.slice'
import { BiUser, BiLogIn } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Navbar() {
    const {isUser} = useContext(AuthContext)
    const router = useRouter()

    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(()=>{
      AuthorizedApiRequest
      .get(`/profile/my-avatar`)
      .then((res) => {
        if (res.data.err) {
          setError('ارور')
        }
        else {
  
          setResponse(res.data);
          console.log(res.data)
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])

    const selector = useAppSelector((state)=> state.navbar)
    const dispatch = useDispatch()

  return (
    <>
    <nav className="bg-orange-400 shadow-sm  ">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
            <button onClick={()=>dispatch(OpenAndCloseMob())}  type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">منو اصلی</span>
          
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
           
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
            {/* <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
            <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/> */}
            {/* <Image className="hidden h-8 w-auto lg:block" src={behnid}  alt='logo' /> */}
            </div>
            <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
                <p onClick={()=> router.replace('/products')} className=" cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">محصولات</p>

                <p onClick={()=> router.replace('/requests')} className="cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">درخواست ها</p>

                {/* <a href="#" onClick={()=>dispatch(OpenAndCloseCat())} className="text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">دسته بندی ها</a> */}
                {selector.categories ? 
                    <div dir='rtl' className="absolute left-1/4 z-10 mt-10 w-1/2 origin-top-left rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                        <a onClick={()=>dispatch(OpenAndCloseCat())} href='#' className="block px-4 py-2 text-sm text-gray-700" role="menuitem" >x</a>
                        <div className="flex flex-row mb-3">
                            <div className="basis-1/3 border-l-4  border-l-orange-400" > 

                                <a href="#" onClick={()=> dispatch(setCatNum(1))}  className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-0">مواد غذایی</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(2))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-1">پوشاک</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(3))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-2">لوازم تحریر اداری</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(4))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-0">سنگین</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(5))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-1">شرکتی</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(6))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-2">خروجی</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(7))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-0">مشاهده پروفایل</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(8))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-1">تنظیمات پروفایل</a>
                                <a href="#" onClick={()=> dispatch(setCatNum(9))} className="block px-8 py-2 text-sm text-gray-700 hover:text-orange-400" role="menuitem"  id="user-menu-item-2">خروج</a>
                        
                            </div>
                            <div className="basis-2/3 p-6" > 
                                <h1>{selector.catNum}</h1>
                            </div>
                        </div>
                    </div> :
                    null
                }
                <p onClick={()=> router.replace('/chat')} className="cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">پیام ها</p>
                <p onClick={()=> router.replace('/sellers')} className=" cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">فروشندگان</p>

            </div>
            </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button onClick={()=> dispatch(OpenAndCloseNotif())} type="button" className="rounded-full  p-1 text-gray-900  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                <span className="sr-only">View notifications</span>
            
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            </button> */}







            <div className="relative ml-3">
            <div onClick={()=> dispatch(OpenAndClose())} >
                <button  type="button" className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                {/* <span className="sr-only">Open user menu</span> */}
                {
                    isUser() ?

                    <div>
                    
                    {
                        response?.avatar  ? 
                            <img className="h-8 w-8 rounded-full" src={response?.avatar ? `https://behnid.com${response.avatar}` : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt=""/>
                            :
                            <BiUser className='w-8 h-8 text-gray-800 '  />
                            // onClick={()=>router.replace('/auth/login')}
                    }
                    
                    </div> :
                    
                    <BiLogIn className='w-8 h-8 text-gray-800 pr-1' onClick={()=>router.replace('/auth/login')} />
                }
                </button>
            </div>

            {selector.notif ? 
                <div dir='rtl' className="absolute right-10 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-0">مشاهده</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-1">علامت به عنوان خوانده</Link>
                </div> :
                null
            }


            {selector.value ? 
                <div dir='rtl' className="absolute right-0 z-10 mt-2 w-[10rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                
                    <b>
                    <p onClick={()=> router.replace('/profile')}   className=" cursor-pointer block pt-4 px-2 py-1 text-sm text-gray-700   text-center" role="menuitem"  id="user-menu-item-0">مشاهده پروفایل</p><br></br>
                    </b>
                    
                    <b>
                    <p onClick={()=> router.replace('/profile/change-detaile')}  className=" cursor-pointer block px-2 py-1 text-sm text-center text-gray-700" role="menuitem"  id="user-menu-item-1">تنظیمات پروفایل</p><br></br>
                    </b>
                    
                    <b>                  
                    <p onClick={()=> router.replace('/auth/logout')}  className=" cursor-pointer block px-2 py-1 text-sm text-gray-700 text-center" role="menuitem"  id="user-menu-item-2">خروج</p><br></br>
                    </b>

                    </div> :
                null
            }
            </div>
        </div>
        </div>
    </div>

    {selector.mobileExp ? 
    
    <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
        <Link href="#" className="text-gray-900  text-center hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium" >محصولات</Link>

        <Link href="#" className="text-gray-900  text-center hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">درخواست ها</Link>

        <Link href="#" className="text-gray-900  text-center hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">پیام ها</Link>

        {/* <a href="#" className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a> */}
        </div>
    </div>
    : 
    null
    }
    </nav>
</>
  )
}

export default Navbar