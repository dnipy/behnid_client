import React, { useState } from 'react'
import { BiSend, BiUser } from 'react-icons/bi'
import { AiFillCustomerService, AiFillInstagram, AiFillPhone, AiFillSafetyCertificate } from 'react-icons/ai'
import useAxios from '../hooks/useAxios'
import { useRouter } from 'next/router'
import ErrorComponent from './alerts/error'
import Behnid from '../assets/logo-croped.png'
import ComponentLoading from './componentLoading'
import { BsInstagram, BsTelegram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { isValidEmail } from '../utils/isValidEmail'

function Footer() {
    const router = useRouter()
    const [cmloading,setCmloading] = useState(false)
    const [error,setError] = useState<string | null>(null)
    const [cmSent,SetcmSent] = useState(false)
    const [email,setEmail] = useState('')
    
    const sendComment = ()=>{
      setCmloading(true)
      setTimeout(() => {
        setCmloading(false)
        SetcmSent(true)
      }, 1000);
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      if (!isValidEmail(event.target.value)) {
        setError('ایمیل معتبر نیست!');
      } else {
        setError(null);
      }
  
      setEmail(event.target.value);
    };
  return (
    <>
      <footer dir='rtl' >
        <div className="mx-auto my-10 text-beh-gray-dark z-10   mb-2  max-w-7xl  sm:px-6 min-h-[300px] lg:px-8 text-g shadow-md md:shadow-none">
        <div className='relative'>
          <div className="w-full lg:max-w-7xl absolute ">
              <div className="flex justify-center z-0 items-center h-[30px] bg-beh-gray-light " ></div>
              <div className="flex justify-center -mt-2w z-0 items-center h-[60px] rounded-b-[80%] bg-beh-gray-light " ></div>

          </div>
        </div>
          {/* TOP_PART */}
          <div className='flex  z-10 w-full justify-center px-12 py-4  flex-row flex-wrap gap-5'>
            <div className='w-[320px] my-auto  z-10 '>
                    <img src={Behnid.src} alt="لوگوی بهنید" />
                    <p>آدرس: البرز کرج بلوار شهید بهشتی میدان سپاه ساختمان اصیل طبقه 4 واحد 405</p>
            </div>
            <div className='w-[440px] h-[180px] z-10 md:h-[280px] text-beh-gray-dark my-auto flex justify-center items-center rounded-lg  bg-[#141414]'>
                    <div className='w-[90%] flex justify-center' >
                      <div className='w-[95%]'>
                        <h1 className='text-left py-1 text-xl text-white '>عضویت در خبرنامه</h1>
                        <label className="relative block w-full">
                          <input type="text" value={email} onChange={handleChange} placeholder='وارد کردن ایمیل' className=' w-full text-left placeholder:text-left px-4  h-[50px] rounded-md'/>
                          <div className="absolute inset-y-0 right-3 lg:right-8 top-[5px]   cursor-pointer "  onClick={cmloading ? undefined : sendComment}>
                            <button disabled={error ? true : false}  className={` ${error ? 'bg-beh-gray cursor-not-allowed' : 'bg-beh-orange cursor-pointer'}  w-[100px] h-[40px] rounded-md flex justify-center text-white  items-center `}>
                              <span>
                                {cmloading ? <ComponentLoading /> : <h1 className='text-xl'>عضویت</h1>  } 
                              </span>
                            </button>
                          </div>
                        </label>
                        <h1 className='text-beh-red my-1'>
                          {error && error}
                        </h1>
                      </div>
                    </div>
            </div>
          </div>

          {/* SOCIAL_PART */}
          <div className='flex w-full justify-center px-12 py-4  flex-row flex-wrap gap-5'>
            <div className='w-[320px] my-auto text-beh-orange  '>
              <h1 className='lg:text-right'>شبکه های اجتماعی</h1>
              <div className='h-[40px]  w-[80%] flex justify-between items-center gap-3'>
                <div className='cursor-pointer hover:text-beh-gray-dark'>
                  <BsYoutube className='w-6 h-6' />
                </div>

                <div className='cursor-pointer hover:text-beh-gray-dark'>
                  <BsInstagram className='w-6 h-6' />
                </div>

                <div className='cursor-pointer hover:text-beh-gray-dark'>
                  <BsTelegram className='w-6 h-6' />
                </div>

                <div className='cursor-pointer hover:text-beh-gray-dark'>
                  <BsTwitter className='w-6 h-6' />
                </div>
              </div>
            </div>
            <div className='w-[440px]   my-auto flex justify-center lg:justify-end items-end h-full rounded-lg '>
            <div className='h-full  top-4 flex justify-around items-center gap-3'>
                <div>
                  <h1 onClick={()=>window.location.replace('http://blog.behnid.com/')} className='pt-3 cursor-pointer hover:text-beh-orange' >
                    وبلاگ
                  </h1>
                </div>

                <div>
                  <h1  onClick={()=>router.push('/products')} className='pt-3 cursor-pointer hover:text-beh-orange' >
                    محصولات
                  </h1>
                </div>

                <div>
                  <h1 onClick={()=>router.push('/')} className='pt-3 cursor-pointer hover:text-beh-orange' >
                    صفحه اصلی
                  </h1>
                </div>

                <div>
                  <h1 className='pt-3 cursor-pointer hover:text-beh-orange' >
                    درباره ما
                  </h1>
                </div>
              </div>
            </div>
          </div>


          {/* HR_PART */}
          <div className='px-12 md:px-28'>
          <hr  />
          </div>


          {/* BOTTOM_PART */}
          <div className='flex w-full justify-center px-12 py-4  flex-row flex-wrap gap-5'>
            <div className='w-[320px] my-auto   '>
              <div className='h-[40px]  w-full md:w-[80%] flex justify-center md:justify-end items-center gap-5'>
                <div>
                  <h1 className='pt-3 cursor-pointer hover:text-beh-orange' >
                    قوانین وبسایت
                  </h1>
                </div>

                <div>
                  <h1 className='pt-3 cursor-pointer hover:text-beh-orange' >
                    شرایط همکاری
                  </h1>
                </div>

              </div>
            </div>
            <div className='w-[440px]   my-auto flex justify-end items-end h-full rounded-lg '>
            <div className='h-full  top-4 flex justify-end items-center gap-3'>
              <p className='text-end text-beh-gray'>
              &nbsp;  تمامی حقوق و کپی رایت متعلق به تیم
                <span className='text-beh-orange font-bold'>
                &nbsp; بهنید &nbsp;
                </span>
                 می باشد
              </p>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}


function OldFooter() {
  const {response,error,setError} = useAxios('/blog/last-four')
  const router = useRouter()

return (
  <>
{error ? <ErrorComponent handle={setError} message='ارور هنگام دریافت اطلاعات بلاگ' /> : null}
  <div>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4 text-center">
              <h4 dir='rtl' className="text-3xl fonat-semibold text-blueGray-700">بهنید بازار ایمن در جیب شما</h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-800">
                با ثبتنام در پلتفرم ایمن بهنید تمام معاملات سنگین خود را راحت کنید
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button name='redirect-buttons' className="bg-orange-400  text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <AiFillCustomerService className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
                </button>

                <button name='redirect-buttons' className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <AiFillPhone className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
                </button>

                <button name='redirect-buttons'  className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <AiFillInstagram className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
                </button>

                <button name='redirect-buttons' className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <AiFillSafetyCertificate className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
                </button>
                  
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6 text-center">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-xl font-semibold mb-4 pb-2 border-b border-b-orange-400">اخرین مطالب بلاگ</span>
                  <ul  className="list-unstyled">
                  
                  {(response as Array<any>).map((elm : any)=>(
                              <li key={elm.id}>
                                  <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href={`/blog/${elm.id}`}>{elm.title}</a>
                              </li>
                                  
                                  ))}

                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4 text-center">
                  <span className="block uppercase text-blueGray-500 text-xl  font-semibold mb-4 pb-2 border-b border-b-orange-400 ">  صفحات ثابت</span>
                  <ul className="list-unstyled">
                    <li>
                      <p onClick={()=>router.replace('/')} dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" >تماس با ما</p>
                    </li>
                    <li>
                      <p onClick={()=>router.replace('/')} dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" >سوالات متداول</p>
                    </li>
                    <li>
                      <p onClick={()=>router.replace('/')} dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" >ارتباط با ما</p>
                    </li>
                    <li>
                      <p onClick={()=>router.replace('/')} dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" >درگاه ایمن</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300"/>
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2021</span> 
                <a href="https://instagram.com/behnid_com" className="text-blueGray-500 hover:text-blueGray-800"> by behbazar</a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
  </div>
  </>
)
}

export default Footer