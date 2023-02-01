import { useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../clients/axios";
import ErrorComponent from "../../components/alerts/error";
import SuccesComponent from "../../components/alerts/succes";

export const SetupProfileComponent = (props : { handleClose :  React.Dispatch<React.SetStateAction<boolean | null>> }) => {
    const [fields,setFields] = useState({name : '' , lastname : '' , pass : '' , pass_confirm : '' })
    const [error, setError] = useState('');
    const [succes,setSucces] = useState('')
    const [loading , setloading] = useState(false);
    const [selectedImage,setSelectedImage] = useState<File | null>(null)
    const [policyChecked,setPolicyChecked] = useState(false)
  
    const inputFile = useRef<HTMLInputElement | null>(null) 
  
    const onButtonClick = () => {
      inputFile?.current?.click();
    };
  
    const onImageChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
      if ( e.target.files &&  e.target?.files?.length > 0) {
        console.log(e.target.files)
        setSelectedImage(e.target.files[0])
      }
    }
  
    const sendHandle = async()=>{
      setError('')
      setloading(true)
      if (fields.pass == fields.pass_confirm) {
        let fData = fields
        console.log({fData})
        await AuthorizedApiRequest
                  .post('/auth/profile-setup',fData)
                  .then((res) => {
                      console.log(res)
                      if(res.data?.msg) {
                          console.log(res.data.msg)
                          props.handleClose(true)
                      }
                      else {
                          setError(res.data.err)
                     }
                  })
                  .catch((err) => {
                      setError(err?.response?.data?.err);
                  })
                  .finally(() => {
                      setloading(false);
                  })
  
        }
        else {
          setError('پسورد و تایید پسورد باید یکسان باشد')
        }
        setloading(false)
      }
  
  
    const sendImageHandle = async ()=>{
      setloading(true)
      setError('')
      const body = new FormData()
      if(selectedImage){
          body.append('profile_image',selectedImage as Blob)
          console.log(selectedImage)
      
          AuthorizedApiRequestImage 
          .post('/media/photo/avatar',body)
          .then((res) => {
              console.log(res)
              if (res.data.err) {
                  setError(res.data.err)
              }
              else {
                setSucces('تصویر با موفقیت ثبت شد')
              }
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              setloading(false);
          });
  
  
        }else {
            setError('فایل انتخاب کنید')
        }
      }
    
  
    return (
      <>
      {error ? <ErrorComponent message={error} handle={setError} /> : null}
      {succes ? <SuccesComponent message={succes} handle={setSucces} /> : null}
      
      <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
        <div className="h-[90vh] w-10/12  mx-auto mt-[5vh] flex justify-center items-center">
          <div className='min-w-[370px] lg:w-[600px] h-full bg-white overflow-y-auto shadow-2xl ' >
            <div className="bg-beh-gray-dark w-full h-[280px]  pt-10">
              <div className="flex w-full  h-[220px] justify-center">
                <div className="max-w-sm  h-full">
                  <h1  className='text-center text-beh-gray-light font-semibold text-lg'>برای ادامه اطلاعات زیر را تکمیل کنید</h1>
                  <div className='flex justify-around h-full gap-2 p-1' >
                    <div onClick={onButtonClick} className="h-[80%] basis-1/6 cursor-pointer bg-beh-orange flex items-center rounded-md">
                      <div className="rotate-90 " >
                      <input type='file' onChange={onImageChange} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFile} style={{display: 'none'}}/>
                        <h1 className='font-semibold text-white text-lg' >انتخاب</h1>
                      </div>
                    </div>
                    <div  className="h-[80%] basis-5/6 bg-beh-gray-light rounded-md flex justify-center">
                      <div>
                        {/* {selectedImage ? <div className='absolute w-[170px] text-center bg-beh-red font-semibold text-white cursor-pointer' onClick={()=>setSelectedImage(null)}>حذف</div> : null} */}
                        {selectedImage ? <div className={`absolute w-[170px] ${loading ? 'cursor-default' : 'cursor-pointer'} text-center bg-beh-green-light font-semibold text-white `} onClick={ loading ? undefined : sendImageHandle}>{loading ? 'صبر کنید' : 'تایید'}</div> : null}
                        {selectedImage ?  <img width='170px' height='170px' src={URL.createObjectURL(selectedImage)} /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center w-full '>
                <input type='text' placeholder='کد معرف (اختیاری)' className=' placeholder:font-semibold placeholder:text-white border-b-4 border-beh-gray rounded-md bg-beh-orange min-w-[260px] h-[50px] flex items-center text-center'/>
              </div>
  
  
              <div className='flex flex-row flex-wrap mt-8 justify-around gap-x-2 gap-y-3'>
                  <div className='mx-auto'>
                    <input  value={fields.lastname} onChange={(e)=>setFields({...fields,lastname : e.target.value})} type='text' placeholder='نام خانوادگی' className=' placeholder:font-semibold placeholder:text-white border-b-2 border-beh-gray rounded-md bg-beh-orange min-w-[260px] h-[50px] flex items-center text-center'/>                 
                  </div>
  
                  <div className='mx-auto'>
                    <input  value={fields.name} onChange={(e)=>setFields({...fields,name : e.target.value})} type='text' placeholder='نام' className=' placeholder:font-semibold placeholder:text-white border-b-2 border-beh-gray rounded-md bg-beh-orange min-w-[260px] h-[50px] flex items-center text-center'/>
                  </div>
              </div>
  
              <div className='flex flex-row flex-wrap mt-3 justify-around gap-x-2 gap-y-3'>
                  <div className='mx-auto'>
                    <input  value={fields.pass_confirm} onChange={(e)=>setFields({...fields,pass_confirm : e.target.value})} type='text' placeholder='تکرار رمز' className=' placeholder:font-semibold placeholder:text-white border-b-2 border-beh-gray rounded-md bg-beh-gray min-w-[260px] h-[50px] flex items-center text-center'/>
                  </div>
                  
                  <div className='mx-auto'>
                    <input  value={fields.pass} onChange={(e)=>setFields({...fields,pass : e.target.value})} type='text' placeholder='رمز عبور' className=' placeholder:font-semibold placeholder:text-white border-b-2 border-beh-gray rounded-md bg-beh-gray min-w-[260px] h-[50px] flex items-center text-center'/>
                  </div>
              </div>
  
              <div className='flex flex-row flex-wrap w-full mt-5 justify-between gap-x-2 gap-y-3'>
                  <div className='mx-auto w-[80%] md:w-[94%]'>
                    <div  onClick={policyChecked && fields.pass.length >= 8  &&  !loading ? sendHandle : undefined} className={`placeholder:font-semibold   border-b-2 border-beh-gray rounded-md ${policyChecked && fields.pass.length >= 8 ? 'cursor-pointer bg-beh-green-light text-white ' : 'text-beh-gray-dark bg-beh-gray-light'}  w-[100%] h-[50px] flex justify-center items-center text-center`}>
                      <h1>تایید</h1>
                    </div>
                  </div>
              </div>
  
              <div className='flex flex-row flex-wrap w-full mt-2 justify-between gap-x-2 gap-y-3'>
                  <div dir='rtl'  className='mx-auto w-[80%] md:w-[94%]'>
                    <div className='flex gap-2'>
                      <input onChange={()=>setPolicyChecked(!policyChecked)} type="checkbox"className='w-5 mt-1 h-5' />
                      <h1>قوانین را خوانده و با آن موافقم</h1>
                    </div>
                  </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }