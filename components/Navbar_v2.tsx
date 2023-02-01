import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { BiShoppingBag , BiShow, BiUser } from 'react-icons/bi'
import { AuthContext } from '../contexts/Auth'
import { useRouter } from 'next/router'
import { ApiRequest } from '../clients/axios'
import ErrorComponent from './alerts/error'

function Navbar_v2() {
  const {isUser} = useContext(AuthContext)
  const router = useRouter();

  const [isLoginOpen , setIsLoginOpen] = useState(false)
  const [isRegisterOpen , setIsRegisterOpen] = useState(false)


  return (
    <>
    {isLoginOpen ? <LoginModal handleLogin={setIsLoginOpen}  handleRegister={setIsRegisterOpen} /> : null}
    {isRegisterOpen ? <RegisterModal handleLogin={setIsLoginOpen}  handleRegister={setIsRegisterOpen} /> : null}

    <nav dir='rtl'>
      <div className="mx-auto mb-2 max-w-7xl px-2 sm:px-6 lg:px-8 text-g shadow-md md:shadow-none">

        {/* TOP_PART */}
        <div className='h-[70px] flex flex-row justify-between md:justify-center items-center mb-1 gap-1 '>

          {/* Image-part  */}
          <div className='basis:1/2  md:basis-1/5 flex justify-center items-center cursor-pointer' onClick={()=> router.push('/')}>
              <Image  src={Logo} height='160' width='160' layout='fixed' alt='بهنید' />
          </div> 

          {/* search-part  */}
          <div className='hidden md:block md:basis-3/5 px-8' >
            <label className="relative block">
              <input type="text" className='h-[50px] w-full bg-beh-gray-light rounded-sm px-10 placeholder:text-beh-gray-dark placeholder:text-lg ' placeholder='جست و جو ...!' dir='rtl'/>
                <span className="absolute inset-y-0 right-3 flex items-center pl-3" >
                    <svg className="h-5 w-5 fill-beh-gray-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                        height="30" viewBox="0 0 30 30">
                        <path
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                        </path>
                    </svg>
                </span>
              </label>
          </div>

          {/* component-part */}
          <div className='basis:1/2  md:basis h-[50px]  flex justify-center items-center'>
            {
              isUser()
              ? 
              <LogedInComponent/>
              :
              <NotLogedInComponent handleLogin={setIsLoginOpen} handleRegister={setIsRegisterOpen} stateRegister={isRegisterOpen} stateLogin={isLoginOpen}/>

            }
          </div>

        </div>

        {/* BOTTOM_PART  */}
        <div className=' hidden sm:block text-md '>

          <div className='flex flex-row  text-beh-gray px-[6.75rem]'>

            <h1 className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              دسته بندی ها
            </h1>
   
            <h1 onClick={()=>router.push('/sellers')} className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              فروشندگان
            </h1>

            <h1 onClick={()=>router.push('/chat')} className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              پیام ها
            </h1>

            <h1 onClick={()=>router.push('/requests')}  className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              درخواست ها
            </h1>

            <h1 onClick={()=>router.push('/blog')} className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange   cursor-pointer transition-all duration-100 '>
                وبلاگ
            </h1>

          </div>

        </div>
      </div>
    </nav>
    </>
  )
}


const NotLogedInComponent = (props : {stateLogin : boolean , stateRegister : Boolean , handleRegister :  React.Dispatch<React.SetStateAction<boolean>> ,handleLogin : React.Dispatch<React.SetStateAction<boolean>>})=>{
  const router = useRouter();

  return (
    <div> 
    {/* TOP_PART_COMPONENT  */}
    <div className='flex flex-row gap-2 items-center ' >
        <div className="basis-1/3 flex justify-center items-center">
          <BiShoppingBag className='w-6 h-6 text-beh-orange' />
        </div>

        <div className="basis-2/3">
          <div className='bg-beh-gray-dark h-8 text-center text-white rounded-md cursor-pointer' onClick={()=>props.handleLogin(!props.stateLogin)}> 
            ورود
          </div>
        </div>
    </div>



    {/* BOTTOM_PART_COMPONENT  */}
    <div className='text-xs mt-1  '>
      <h1 >

        <span className=' col-span-1'>
        &nbsp;  هنوز
        </span>

        <span className=' col-span-1 hover:cursor-pointer text-beh-orange' onClick={()=>{
          props.handleRegister(true)
          props.handleLogin(false)
        }}>
          &nbsp;  ثبتنام  
       
        </span>

        <span className='col-span-1'>
        &nbsp;  نکردی؟!
        </span>
      
      </h1>
    </div>
  </div>
  )
}




const LogedInComponent = ()=>{
  const router = useRouter();
  const {logout} = useContext(AuthContext)

  return (
    <div> 
    {/* TOP_PART_COMPONENT  */}
    <div className='flex flex-row  items-center ' >
        <div className="basis-2/3">
          <div className=' text-center font-semibold cursor-pointer'  onClick={()=>{
            logout()
            window.location.replace('/')
            }}> 
            تنظیمات پروفایل
          </div>
        </div>
        <div className="basis-1/3 flex justify-center items-center" onClick={()=>localStorage.clear()}>
          <BiUser className='w-11 h-11 ' />
        </div>

    </div>
  </div>
  )
}


const LoginModal = (props : { handleRegister :  React.Dispatch<React.SetStateAction<boolean>> ,handleLogin : React.Dispatch<React.SetStateAction<boolean>>})=>{
  const [ShowPass,setShowPass] = useState(false)
  const [fields,setFields] = useState({phone : '' , pass : ''})
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const {login} = useContext(AuthContext)
  const router = useRouter()


  const sendHandle = async()=>{
    setError('')
    let fData = {phone : fields.phone ,password : fields.pass}
    console.log({fData})
    await ApiRequest
        .post('/auth/login',fData)
        .then((res) => {

            if (!res.data.err){
            console.log(res.data)
            localStorage.setItem('user-session',JSON.stringify(res?.data?.accessToken))
              login(res.data.accessToken)                   
                setTimeout(() => {
                    props.handleLogin(false)
                    window.location.replace('/')
                }, 1000);
            }
            else {
                setError(res?.data?.err)
            }

        })
        .catch((err) => {
            setError('500');
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        })

}



  return (
    <>
    {error ? <ErrorComponent message={error} handle={setError} /> : null}
    
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      {/* BACKGROUND_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-full h-[60vh] flex flex-row'>
               <div className="basis-[54%] h-[60vh] bg-beh-gray-dark"></div>
               <div className="basis-[46%] h-[60vh] bg-beh-orange"></div>
        </div>
      </div>

      {/* CENTER_DATA_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
          <div dir='rtl' className='w-full  lg:w-1/2  mx-auto h-[60vh] items-center flex justify-center'>
            <div>

              <div className=" flex flex-row gap-2 w-full  p-4 h-[100px]">
                <div className="basis-9/12">
                  <h1 className='font-bold text-2xl text-white'>ورود</h1>
                  <h6 className='font-semibold text-sm pt-1  text-white'>شماره تماس و رمز عبور خود را وارد کنید</h6>
                </div>
                <div className='basis-3/12 flex flex-row justify-center items-center' >
                  <div className="bg-white shadow-lg w-20 h-12 rounded-md flex justify-center items-center">
                      <BiUser className='w-8 h-8 text-beh-orange' />
                  </div>
                </div>
              </div>
              <div className='px-4'>
              <input value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value})} type="number" className='h-[50px] w-full rounded-lg px-8 my-2 placeholder:text-beh-gray-light placeholder:text-lg placeholder:font-semibold placeholder:text-left ' placeholder='09121210598' dir='rtl'/>               
              
              <label className="relative block">
                <input value={fields.pass} onChange={(e)=>setFields({...fields,pass : e.target.value})} type={ShowPass ? "text" : "password"}  className='h-[50px] w-full rounded-lg px-11 my-2 placeholder:text-beh-gray-light placeholder:text-lg placeholder:font-semibold placeholder:text-left  ' placeholder='رمز عبور' dir='rtl'/>
                <span className="absolute inset-y-0 left-1 flex items-center pl-3 cursor-pointer " onClick={()=>setShowPass(!ShowPass)} >
                    <BiShow className={` ${ShowPass ? 'text-black' : "text-beh-gray-light"} w-6 h-6`} />
                </span>
              </label>

              <button disabled={loading} onClick={sendHandle} className={`px-10 py-2 rounded-full text-lg font-bold text-white  ${loading ? 'bg-beh-gray-dark'  : 'bg-beh-orange'} mt-1`} >ورود به حساب</button>
              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp;  ثبتنام نکرده ام
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-orange' onClick={()=>{
                    props.handleRegister(true)
                    props.handleLogin(false)
                  }
                  }>
                    &nbsp;  (ثبتنام)
                
                  </span>

                
                </h1>
              </div>
              </div>
            </div>
          </div>
      </div>

    </div>
    </>
  )
}




const RegisterModal = (props : { handleRegister :  React.Dispatch<React.SetStateAction<boolean>> ,handleLogin : React.Dispatch<React.SetStateAction<boolean>>})=>{
  const [CodeSent,setCodeSent] = useState(false)
  const [fields,setFields] = useState({phone : '' , code : ''})
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const {login} = useContext(AuthContext)
  const router = useRouter()



  const RegisterHandle = async ()=>{
    setloading(true)
    let fData = {phone : fields.phone}
    await ApiRequest
    .post('/auth/register',fData)
    .then((res) => {
      console.log({res})
        if (res.data?.err){
          setError(res.data.err)
        }
        else {
          setCodeSent(true)
        }
        
      })
      .catch((err) => {
        setError(err?.response?.data?.err);
      })
      .finally(() => {
        setloading(false);
      })
  }


  const RegisterConfirmHandle = async ()=>{
    setloading(true)

    let fData = {phone : fields.phone ,code : fields.code}
    await ApiRequest
    .post('/auth/register-confirm',fData)
    .then((res) => {
        if (res.data.accessToken){
            localStorage.setItem('user-session',JSON.stringify(res.data?.accessToken))
            login(res.data?.accessToken)
            
            setTimeout(()=>{
              props.handleLogin(false)
              props.handleRegister(false)
              window.location.replace('/')
            },1500)
        }
        else {
            setError('ارور در تایید کد')
            console.log()
        }
    })
    .catch((err) => {
        setError('500');
    })
    .finally(() => {
        setloading(false);
    })
  }


  const sendHandle = async()=>{
    setError('')

    if (CodeSent) {
      RegisterConfirmHandle()
    }
    else {
      RegisterHandle()
    }
  }
    
    
    return (
      <>
    {error ? <ErrorComponent message={error} handle={setError} /> : null}
    
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      {/* BACKGROUND_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-full h-[60vh] flex flex-row'>
               <div className="basis-[54%] h-[60vh] bg-beh-gray-dark"></div>
               <div className="basis-[46%] h-[60vh] bg-beh-orange"></div>
        </div>
      </div>

      {/* CENTER_DATA_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
          <div dir='rtl' className='w-full  lg:w-1/2  mx-auto h-[60vh] items-center flex justify-center'>
            <div>

              <div className=" flex flex-row gap-2 w-full  p-4 h-[100px]">
                <div className="basis-9/12">
                  <h1 className='font-bold text-2xl text-white'>ثبتنام</h1>
                  <h6 className='font-semibold text-sm pt-1  text-white'>شماره تماس جهت ارسال کد </h6>
                </div>
                <div className='basis-3/12 flex flex-row justify-center items-center' >
                  <div className="bg-white shadow-lg w-20 h-12 rounded-md flex justify-center items-center">
                      <BiUser className='w-8 h-8 text-beh-orange' />
                  </div>
                </div>
              </div>
              <div className='px-4'>
              <input disabled={CodeSent} value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value})} type="number" className='h-[50px] w-full rounded-lg px-8 my-2 placeholder:text-beh-gray-light placeholder:text-lg placeholder:font-semibold placeholder:text-left ' placeholder='09121210598' dir='rtl'/>               
              
              <label className="relative block">
                <input disabled={!CodeSent} value={fields.code} onChange={(e)=>setFields({...fields,code : e.target.value})}   className='h-[50px] w-full rounded-lg px-11 my-2 placeholder:text-beh-gray-light placeholder:text-lg placeholder:font-semibold placeholder:text-right  ' placeholder='کد دریافت شده' dir='rtl'/>
                
              </label>

              <button disabled={loading} onClick={sendHandle} className={`px-10 py-2 rounded-full text-lg font-bold text-white  mt-1 ${loading ? 'bg-beh-gray-dark'  : 'bg-beh-orange'} `} >{CodeSent ? 'تایید کد' : 'ارسال کد'}</button>
              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp;  حساب کاربری دارم
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-orange' onClick={()=>{
                    props.handleLogin(true)
                    props.handleRegister(false)
                  }
                  }>
                    &nbsp;  (ورود)
                
                  </span>

                
                </h1>
              </div>
              </div>
            </div>
          </div>
      </div>

    </div>
    </>
  )
}




export default Navbar_v2