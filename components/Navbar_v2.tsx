import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Logo from "../assets/logo-croped.png"
import { BiPulse, BiShoppingBag , BiShow, BiUser } from 'react-icons/bi'
import { AuthContext } from '../contexts/Auth'
import { useRouter } from 'next/router'
import { ApiRequest } from '../clients/axios'
import ErrorComponent from './alerts/error'
import { FiInfo, FiShoppingBag, FiXCircle } from 'react-icons/fi'
import SuccesComponent from './alerts/succes'
import { MdCode, MdLock, MdSecurity } from 'react-icons/md'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import ComponentLoading from './componentLoading'
import { HiUser } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { UserModalMine } from '../features/components/user-modal'

function Navbar_v2() {
  const {isUser} = useContext(AuthContext)
  const router = useRouter();

  const [isLoginOpen , setIsLoginOpen] = useState(false)
  const [isRegisterOpen , setIsRegisterOpen] = useState(false)
  const [isResetPassOpen , setIsResetPassOpen] = useState(false)
  const [isUserOpen , setIsUserOpen] = useState(false)




  return (
    <>
    {isLoginOpen ? <LoginModal handleLogin={setIsLoginOpen}  handleRegister={setIsRegisterOpen} handleReset={setIsResetPassOpen} /> : null}
    {isUserOpen && <UserModalMine setModels={setIsUserOpen}  />}
    {isRegisterOpen ? <RegisterModal handleLogin={setIsLoginOpen}  handleRegister={setIsRegisterOpen}  /> : null}
    {isResetPassOpen ? <ResetPasswordModal handleLogin={setIsLoginOpen} handleRegister={setIsRegisterOpen} handleReset={setIsResetPassOpen} /> : null}
    <nav dir='rtl'>
      <div className="mx-auto mb-2 max-w-7xl px-2 sm:px-6 lg:px-8 text-g shadow-md md:shadow-none">

        {/* TOP_PART */}
        <div className='h-[70px] flex flex-row justify-between md:justify-center items-center mb-1 gap-1 '>

          {/* Image-part  */}
          <div className='basis:1/2  md:basis-1/5 flex justify-center items-center cursor-pointer' onClick={()=> router.push('/')}>
              <Image  src={Logo}  width={`105.8`} height={`51`} layout='fixed' alt='بهنید' />
          </div> 

          {/* search-part  */}
          <div className='hidden md:block md:basis-3/5 px-8' >
            {/* <label className="relative block">
              <input type="text" className='h-[50px] w-full bg-beh-gray-light rounded-sm px-10 placeholder:text-beh-gray-dark placeholder:text-lg ' placeholder='جست و جو ...!' dir='rtl'/>
                <span className="absolute inset-y-0 right-3 flex items-center pl-3" >
                    <svg className="h-5 w-5 fill-beh-gray-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                        height="30" viewBox="0 0 30 30">
                        <path
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                        </path>
                    </svg>
                </span>
              </label> */}
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

          <div className='flex flex-row justify-between text-beh-gray px-[6.75rem]'>

            {/* <h1 className='px-3 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              دسته بندی ها
            </h1> */}
   
   <div className='flex flex-row  '>

            <h1 onClick={()=>router.push('/products')} className='px-6 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              محصولات
            </h1>

            <h1 onClick={()=>router.push('/chat')} className='px-6 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              پیام ها
            </h1>

            <h1 onClick={()=>router.push('/requests')}  className='px-6 py-1 border-l-beh-gray-light border-l-2 hover:text-beh-orange  cursor-pointer transition-all duration-100'>
              درخواست ها
            </h1>

            <h1 onClick={()=>window.location.replace('http://blog.behnid.com')} className='px-6 py-1 border-l-beh-gray-light  hover:text-beh-orange   cursor-pointer transition-all duration-100 '>
                وبلاگ
            </h1>
   </div>
   
   {isUser() ?
   <div className='w-auto flex flex-row gap-2'>
            <button onClick={()=>setIsUserOpen(!isUserOpen)} className='bg-beh-green-super-light text-beh-gray-dark flex flex-row gap-2 justify-center items-center w-[100px] h-[40px] shadow-md rounded-sm text-lg'>
              <span>
                <FiInfo />
              </span>
              <span>
                صفحه من
              </span>
            </button>

            <button onClick={()=>router.push('/profile/add-product')} className='bg-beh-orange text-white flex flex-row gap-1 justify-center items-center w-[100px] h-[40px] shadow-md rounded-sm text-lg'>
              <span>
                <BsPlus className='w-8 h-8' />
              </span>
              <span>
                 محصول
              </span>
            </button>
   </div>
   : null
}


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
          &nbsp;  ثبت نام  
       
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
    <div className='flex flex-row gap-1  items-center ' >
        <div className="basis-1/3">
          <div className=' text-center pt-6  text-beh-red font-semibold cursor-pointer'  onClick={()=>{
            logout()
            window.location.replace('/')
            }}> 
            {/* تنظیمات پروفایل */}
            &nbsp;  خروج &nbsp; 
          </div>
        </div>
        <div className="basis-1/3 flex justify-center items-center cursor-pointer" onClick={()=>router.push('/products')}>
          <FiShoppingBag className='w-8  h-8 text-beh-orange' />
        </div>
        <div className="basis-1/3 flex justify-center items-center cursor-pointer" onClick={()=>router.push('/profile')}>
          <HiUser  className='w-9 h-9  fill-beh-gray-dark' />
        </div>

    </div>
  </div>
  )
}


const LoginModal = (props : { handleReset : React.Dispatch<React.SetStateAction<boolean>> , handleRegister :  React.Dispatch<React.SetStateAction<boolean>> ,handleLogin : React.Dispatch<React.SetStateAction<boolean>>})=>{
  const [ShowPass,setShowPass] = useState(false)
  const [fields,setFields] = useState({phone : '' , pass : ''})
  const [error, setError] = useState('');
  const [succes,setSucces]= useState('');
  const [loading, setloading] = useState(false);
  const {login} = useContext(AuthContext)
  const router = useRouter()


  const sendHandle = async()=>{
    setError('')
    if (fields.pass.length < 8) {
      setError('پسورد نباید کمتر از 8 رقم باشد')
      return
    }
    if (fields.phone.length != 11) {
      setError('شماره تلفن باید 11 رقم باشد')
      return
    }
    setloading(true)
    let fData = {phone : fields.phone ,password : fields.pass}
    console.log({fData})
    await ApiRequest
        .post('/auth/login',fData)
        .then((res) => {

            if (!res.data.err){
            console.log(res.data)
            localStorage.setItem('user-session',JSON.stringify(res?.data?.accessToken))
              login(res.data.accessToken)   
                setSucces('ورود موفق')                
                setTimeout(() => {
                    props.handleLogin(false)
                    window.location.replace('/chat')
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

  const sendActive = ()=>{
    if (loading) {
      return true
    }
    if (fields.pass.length < 8 || fields.phone.length != 11){
      return true
    }

    return false
  } 



  return (
    <>
    {error ? <ErrorComponent message={error} handle={setError} /> : null}
    {succes && <SuccesComponent handle={setSucces} message={succes} />}
    
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      {/* BACKGROUND_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-full min-h-[350px] h-[60vh] flex flex-row'>
               <div className="basis-[54%] min-h-[350px] h-[60vh] bg-beh-gray-dark"></div>
               <div className="basis-[46%] min-h-[350px] h-[60vh] bg-beh-orange"></div>
        </div>
      </div>

      {/* CENTER_DATA_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
          <div dir='rtl' className='w-full  lg:w-1/2  mx-auto h-[60vh] items-center flex justify-center'>
            <div>

            <div className='absolute scale-125 -mt-5 bg-beh-red p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handleLogin(false)}>
                <FiXCircle />
              </div>

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
              <input value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value.slice(0,11)})} type="number" className={`h-[50px] w-full rounded-lg px-8 my-2 bg-white/70 focus:bg-white placeholder:text-beh-gray-mid-ligth placeholder:text-lg placeholder:font-semibold placeholder:text-right `} placeholder='شماره تماس' dir='rtl'/>               
              
              <label className="relative block">
                <input value={fields.pass} onChange={(e)=>{
                  let value = e.target.value
                  value = value.replace(/[^A-Za-z0-9!@#\$%\^\&*\)\(+=._-]/ig, '')

                  setFields({...fields,pass : value})

                }
                } type={ShowPass ? "text" : "password"}  className='h-[50px] w-full rounded-lg px-11 my-2 bg-white/70 focus:bg-white placeholder:text-right placeholder:text-beh-gray  placeholder:text-lg placeholder:font-semibold   ' placeholder='رمز عبور' dir='rtl'/>
                <span className="absolute inset-y-0 left-1 flex items-center pl-3 cursor-pointer " onClick={()=>setShowPass(!ShowPass)} >
                    <BiShow className={` ${ShowPass ? 'text-black' : "text-beh-gray"} w-6 h-6`} />
                </span>
              </label>

              <button  onClick={loading ? ()=>{} : sendHandle} className={`px-10 py-2 rounded-full text-lg font-bold text-white   bg-beh-orange mt-1`} >
                {loading ? <ComponentLoading/> : 'ورود به حساب'}
              </button>
              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp;  ثبت نام نکرده ام
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-green-light ' onClick={()=>{
                    props.handleRegister(true)
                    props.handleLogin(false)
                  }
                  }>
                    &nbsp;  (ثبت نام)
                
                  </span>

                
                </h1>
              </div>

              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp; رمز عبورم را 
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-green-light ' onClick={()=>{
                    props.handleReset(true)
                    props.handleRegister(false)
                    props.handleLogin(false)
                  }
                  }>
                    &nbsp;  فراموش 
                
                  </span>
                  <span className=' col-span-1'>
                  &nbsp; کرده ام
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
  const [succes,setSucces]= useState('');
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
            setSucces('ورود موفق')                
            setTimeout(()=>{
              props.handleLogin(false)
              props.handleRegister(false)
              window.location.replace('/chat')
            },1000)
        }
        else if (res.data.err) {
            setError(res.data?.err)
            console.log()
        }
    })
    .catch((err) => {
        setError('ارور در اعتبار سنجی شماره تلفن');
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
    {succes && <SuccesComponent handle={setSucces} message={succes} />}
    
    <div  className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      {/* BACKGROUND_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-full min-h-[380px]  h-[60vh] flex flex-row'>
               <div className="basis-[54%] min-h-[380px] h-[60vh] bg-beh-gray-dark"></div>
               <div className="basis-[46%] min-h-[380px] h-[60vh] bg-beh-orange"></div>
        </div>
      </div>

      {/* CENTER_DATA_PART */}
      <div className='fixed  flex w-screen h-screen justify-center items-center'>
          <div dir='rtl' className='w-full  lg:w-1/2  mx-auto h-[60vh] items-center flex justify-center'>
            <div>
              <div className='absolute scale-125 -mt-5 bg-beh-red p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handleRegister(false)}>
                <FiXCircle />
              </div>

              <div className=" flex flex-row gap-2 w-full  p-4 h-[100px]">
                <div className="basis-9/12">
                  <h1 className='font-bold text-2xl text-white'>ثبت نام</h1>
                  <h6 className='font-semibold text-sm pt-1  text-white'>شماره تماس جهت ارسال کد </h6>
                </div>
                <div className='basis-3/12 flex flex-row justify-center items-center' >
                  <div className="bg-white shadow-lg w-20 h-12 rounded-md flex justify-center items-center">
                      <BiUser className='w-8 h-8 text-beh-orange' />
                  </div>
                </div>
              </div>
              <div className='px-4'>
              <input disabled={CodeSent} value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value.slice(0,11)})} type="number" className={`h-[50px] w-full rounded-lg ${!CodeSent ? 'bg-white/70 focus:bg-white placeholder:text-beh-gray' : 'placeholder:text-beh-gray-light cursor-not-allowed'}  px-8 my-2  placeholder:text-lg placeholder:font-semibold placeholder:text-right `} placeholder='شماره تلفن' dir='rtl'/>               
              
              <label className="relative block">
                <input   type='number' disabled={!CodeSent} value={fields.code} onChange={(e)=>setFields({...fields,code : e.target.value.slice(0,6)})}   className='h-[50px] w-full rounded-lg px-11 my-2 placeholder:text-beh-gray-light placeholder:text-lg placeholder:font-semibold placeholder:text-right  ' placeholder='کد دریافت شده' dir='rtl'/>
                
              </label>

              <button disabled={loading} onClick={fields.phone.length == 11 ? sendHandle : ()=>setError('شماره وارد شده باید 11 رقم باشد')} className={`px-10 py-2 rounded-full text-lg font-bold text-white  mt-1 ${loading ? 'bg-beh-gray-dark'  : 'bg-beh-orange'} `} >
                {
                loading ? 
                <ComponentLoading/>
                :
                <>
                {CodeSent ? 'تایید کد' : 'ارسال کد'}
                </>
                }
              </button>
              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp;  حساب کاربری دارم
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-green-light' onClick={()=>{
                    props.handleRegister(false)
                    props.handleLogin(true)
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






const ResetPasswordModal = (props : { handleReset : React.Dispatch<React.SetStateAction<boolean>> , handleRegister :  React.Dispatch<React.SetStateAction<boolean>> ,handleLogin : React.Dispatch<React.SetStateAction<boolean>>})=>{
  const [ShowPass,setShowPass] = useState(false)
  const [fields,setFields] = useState({phone : '' ,code : '', pass : '' , pass_confirm : ''})
  const [CodeSent,setCodeSent] = useState(false)
  const [error, setError] = useState('');
  const [succes,setSucces]= useState('');
  const [loading, setloading] = useState(false);
  const {login} = useContext(AuthContext)
  const router = useRouter()


  const sendHandle = async()=>{
    setError('')
    setSucces('')
    if (fields.phone.length != 11) {
      setError('شماره تلفن باید 11 رقم باشد')
      return
    }
    setloading(true)
    let fData = {phone : fields.phone }
    await ApiRequest
        .post('/auth/reset-password',fData)
        .then((res) => {

            if (res.data?.msg){
              console.log(res.data)
              // localStorage.setItem('user-session',JSON.stringify(res?.data?.accessToken))
              // login(res.data.accessToken)   
              setSucces(res.data?.msg)                
              setTimeout(() => {
                  setCodeSent(true)
              }, 300);
            }
            else if (res.data?.err) {
                setError(res?.data?.err)
            }

        })
        .catch((err) => {
            setError('خطا در ارتباط با سرور');
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        })

}




  const VerifyAndUpdateHandle = async()=>{
    setError('')
    setSucces('')
    if (fields.code.length != 6 ) {
      setError('کد دریافتی باید 6 رقم باشد')
      return
    }

    if (fields.pass.length < 8){
      setError('رمز عبور نباید کمتر از 8 رقم باشد')
      return
    }

    if (fields.pass != fields.pass_confirm) {
      setError('رمز عبور و تایید رمز باید برابر باشند')
      return
    }
    
    setloading(true)
    let fData = {
      phone : fields.phone,
      code : fields.code,
      pass : fields.pass
    }
    await ApiRequest
    .post('/auth/reset-password-confirm',fData)
    .then((res) => {

        if (res.data?.msg){
          console.log(res.data)
          // localStorage.setItem('user-session',JSON.stringify(res?.data?.accessToken))
          // login(res.data.accessToken)   
          setSucces(res.data?.msg)                
          setTimeout(() => {
              props.handleReset(false)
              props.handleLogin(true)
          }, 300);
        }
        else if (res.data?.err) {
            setError(res?.data?.err)
            console.log(res.data)
        }

    })
    .catch((err) => {
        setError('خطا در ارتباط با سرور');
        console.log(err)
    })
    .finally(() => {
        setloading(false);
    })

  }



  return (
    <>
    {error ? <ErrorComponent message={error} handle={setError} /> : null}
    {succes && <SuccesComponent handle={setSucces} message={succes} />}
    
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      {/* BACKGROUND_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
        <div dir='rtl' className='w-full min-h-[550px] h-[60vh] flex flex-row'>
               <div className="basis-[54%] min-h-[550px] h-[60vh] bg-beh-gray-dark"></div>
               <div className="basis-[46%] min-h-[550px] h-[60vh] bg-beh-orange"></div>
        </div>
      </div>

      {/* CENTER_DATA_PART */}
      <div className='fixed flex w-screen h-screen justify-center items-center'>
          <div dir='rtl' className='w-full  lg:w-1/2  mx-auto h-[60vh] items-center flex justify-center'>
            <div>

            <div className='absolute scale-125 -mt-5 bg-beh-red p-[0.1rem] rounded-full cursor-pointer ' onClick={()=> props.handleReset(false)}>
                <FiXCircle />
              </div>

              <div className=" flex flex-row gap-2 w-full  p-4 h-[100px]">
                <div className="basis-9/12">
                  <h1 className='font-bold text-2xl text-white'>بازیابی پسورد</h1>
                  <h6 className='font-semibold text-sm pt-1  text-white'>شماره تماس خود را وارد کنید</h6>
                </div>
                <div className='basis-3/12 flex flex-row justify-center items-center' >
                  <div className="bg-white shadow-lg w-20 h-12 rounded-md flex justify-center items-center">
                      <BiUser className='w-8 h-8 text-beh-orange' />
                  </div>
                </div>
              </div>
              <div className='px-4'>
              <input disabled={CodeSent} value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value.slice(0,11)})} type="number" className={`h-[50px] w-full rounded-lg px-8 my-2 ${!CodeSent ? 'bg-white/70 focus:bg-white' : 'bg-white/40'}  placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold placeholder:text-right `} placeholder='شماره تلفن' dir='rtl'/>               
              
              {/* CODE  */}
              <label className="relative gap-x-2 flex">
                <div className='h-[50px] w-2/5 flex justify-center items-center rounded-lg px-11 my-1 '>
                    {/* <h1 className='text-white text-lg'>
                      کد دریافتی
                    </h1> */}
                    <AiFillSafetyCertificate className={` ${fields.code.length == 6 ? 'fill-beh-orange' : 'fill-white'} w-6 h-6`} />
                </div>

                <input  value={fields.code} onChange={(e)=>{
                  let value = e.target.value
                  value = value.replace(/[^A-Za-z0-9!@#\$%\^\&*\)\(+=._-]/ig, '')

                  setFields({...fields,code : value.slice(0,6)})

                }
                } type='number' disabled={!CodeSent}  className={`h-[50px] w-3/5 rounded-lg px-11 my-2 ${CodeSent ? 'bg-white/70 focus:bg-white' : 'bg-white/40'}  placeholder:text-center placeholder:text-beh-gray  placeholder:text-lg placeholder:font-semibold   `} placeholder='کد دریافتی' dir='rtl'/>

              </label>

              
              {/* PASSWORD  */}
              <label className="relative gap-x-2 flex">

                <div className='h-[50px] w-2/5 flex justify-center items-center rounded-lg px-11 my-1 '>
                    {/* <h1 className='text-white text-lg'>
                      رمز جدید
                    </h1> */}
                    <MdLock className={` ${fields.pass.length > 7 ? 'fill-beh-orange' : 'fill-white'} w-6 h-6`} />

                </div>

                <input  value={fields.pass} onChange={(e)=>{
                  let value = e.target.value
                  value = value.replace(/[^A-Za-z0-9!@#\$%\^\&*\)\(+=._-]/ig, '')

                  setFields({...fields,pass : value})

                }
                } type={ShowPass ? "text" : "password"}  disabled={!CodeSent} className={`h-[50px] ${CodeSent ? 'bg-white/70 focus:bg-white' : 'bg-white/40'}  w-3/5 rounded-lg px-11 my-2   placeholder:text-beh-gray  placeholder:text-center placeholder:font-semibold   `} placeholder='رمز عبور' dir='rtl'/>
                <span className="absolute inset-y-0 left-1 flex items-center pl-3 cursor-pointer " onClick={()=>setShowPass(!ShowPass)} >
                    <BiShow className={` ${ShowPass ? 'text-black' : "text-beh-gray"} w-6 h-6`} />
                </span>
              </label>



              {/* PASSWORD TWO */}
              <label className="relative gap-x-2 flex">

                <div className='h-[50px] w-2/5 flex justify-center items-center rounded-lg px-11 my-1 '>
                    {/* <h1 className='text-white text-lg'>
                      تکرار رمز
                    </h1> */}

                    <MdLock className={`${fields.pass_confirm.length > 7 && fields.pass_confirm == fields.pass ? 'fill-beh-orange' : 'fill-white'} w-6 h-6`} />

                </div>

                <input value={fields.pass_confirm} onChange={(e)=>{
                  let value = e.target.value
                  value = value.replace(/[^A-Za-z0-9!@#\$%\^\&*\)\(+=._-]/ig, '')

                  setFields({...fields,pass_confirm : value})

                }
                } type={ShowPass ? "text" : "password"}  disabled={!CodeSent} className={`h-[50px] w-3/5 rounded-lg px-11 my-2 ${CodeSent ? 'bg-white/70 focus:bg-white' : 'bg-white/40'}   placeholder:text-beh-gray  placeholder:text-center placeholder:font-semibold   `} placeholder='تکرار رمز' dir='rtl'/>
                <span className="absolute inset-y-0 left-1 flex items-center pl-3 cursor-pointer " onClick={()=>setShowPass(!ShowPass)} >
                    <BiShow className={` ${ShowPass ? 'text-black' : "text-beh-gray"} w-6 h-6`} />
                </span>
              </label>



              <button  onClick={ !CodeSent ?  fields.phone.length == 11 ? sendHandle : ()=>setError('شماره تلفن باید 11 رقم باشد و با 09 شروع شود') : VerifyAndUpdateHandle} className={`px-10 py-2 rounded-full text-lg font-bold text-white  ${loading ? 'bg-beh-gray-dark'  : 'bg-beh-orange'} mt-1`} >
                {loading ? <ComponentLoading/> : <>
                  {CodeSent ? 'تغییر رمز' : 'ارسال کد'}
                </>}
              </button>
              <div className='mt-1 text-white text-md px-3   '>
                <h1 >

                  <span className=' col-span-1'>
                  &nbsp; حساب کاربری دارم
                  </span>

                  <span className=' col-span-1 hover:cursor-pointer text-beh-green-light ' onClick={()=>{
                    props.handleLogin(true)
                    props.handleReset(false)
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