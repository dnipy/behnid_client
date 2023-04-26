import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../../clients/axios";
import { useRouter } from "next/router";
import { LoadingComponent } from "../../../components/loading";
import ErrorComponent from "../../../components/alerts/error";
import SuccesComponent from "../../../components/alerts/succes";
import ProductPicker from "../../../features/components/product_picker";
import NoImg from '../../../assets/NoImg.png'
import { ProductSelecetState } from "../../../types/add-products";
import { ProductTumbnail } from "../../../components/products/Product-Tumbnail";
import { BACK_END } from "../../../clients/localStorage";
import { NextSeo } from "next-seo";




const Page : NextPage = ()  => {
  
  const [error, setError] = useState('');
  const [loading , setloading] = useState(true);
  const [text , setText] = useState('');
  const [productId , setproductId] = useState('');
  const [response, setResponse] = useState<any>([]);
  const [product , setproduct] = useState<ProductSelecetState>({isOpen : false , selected : null})
  const [selectedImage,setSelectedImage] = useState<File | null>(null)

  const [city,setCity] = useState({isOpened : false , city_name : ''})
  const [succed,setSucced] = useState('')
  const inputFile = useRef<HTMLInputElement | null>(null) 
  const editRef = useRef<any>(null) 
  const previewRef = useRef<any>(null) 
  const [edit , setedit] = useState(true);
  const router = useRouter()

  useEffect(()=>{
    const data = localStorage.getItem('user-session')
    if (!data) router.replace('/')
  },[])

  const onGoToEdit = () => {
    setedit(!edit)
    editRef?.current?.scrollIntoView({ behavior: "smooth" })
  };
  const onGoToPreview = () => {
    setedit(!edit)
    previewRef?.current?.scrollIntoView({ behavior: "smooth" })
  };

  const onButtonClick = () => {
    inputFile?.current?.click();
  };

  const onImageChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
    // setloading(true)
    // setError('')
    // const body = new FormData()


    if ( e.target.files &&  e.target?.files?.length > 0) {
      console.log(e.target.files)
      setSelectedImage(e.target.files[0])

    //   body.append('profile_image',e.target.files[0] as Blob)
    //     console.log(e.target.files[0])
    
    //     AuthorizedApiRequestImage 
    //     .post('/media/photo/avatar',body)
    //     .then((res) => {
    //         console.log(res)
    //         if (res.data.err) {
    //             setError(res.data.err)
    //         }
    //         else {
    //           setSucced('تصویر با موفقیت ثبت شد')
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    //     .finally(() => {
    //         setloading(false);
    //     });
    }
    else {
      setError('فایل انتخاب کنید')
      setloading(false)
    }
  }

  const sendStroyHandle = async ()=>{
    setloading(true)
    setError('')
    const body = new FormData()
        selectedImage && body.append('seller_story',selectedImage as Blob)
        body.append('text',text)
        product?.selected?.id && body.append('productID',String(product?.selected?.id))
        if (text.length < 1 && !selectedImage && !productId) {
            setError('لطفا حداقل یک فیلد را پر کنید')
            setloading(false)
            return
        }
        AuthorizedApiRequestImage 
        .post('/media/seller/add-story',body)
        .then((res) => {
            console.log(res)
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
              setSucced('استوری با موفقیت اضافه شد')
              router.push('/profile')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });


    }

  const fetchData = () => {
      AuthorizedApiRequest
          .get('/profile/my-data')
          .then((res) => {
              if (res.data.err || typeof(res.data?.msg) == 'object') {
                res.data?.err ? setError(res.data?.err) : setError('ارور در هنگام اتصال')  
                
              }
              else {
                 if(res.data?.data?.Role != "Seller"){
                     router.push('/profile')
                  
                 }
              }
          })
          .catch((err) => {
              setError('خطا در اتصال به سرور');
              // router.push('/500')
              console.log(err)
          })
          .finally(() => {
              setTimeout(() => {
                  setloading(false);
              }, 1000)
            });
  };

  useEffect(() => {
      fetchData();
  }, []);



//   console.log(response)
  return (
    <>
    <NextSeo
        title='افزودن داستان'
      />
      { 
        typeof response == 'object' ? 
        <>
        {error && <ErrorComponent handle={setError} message={error} />  }
        {succed && <SuccesComponent handle={setSucced} message={succed} /> }
        {loading && <LoadingComponent/>  }


        <main dir="rtl" className="flex justify-center min-h-screen bg-black  ">

        {product.isOpen && <ProductPicker state={product} setState={setproduct} /> }  


          <div className="w-full lg:max-w-7xl z-[7]">
            <div className="">
                <div className="min-w-[340px] overflow-x-auto flex-wrap gap-4 w-[90%] mt-[5vh] h-[80vh] mx-auto  justify-center items-center flex flex-row">
                    
                    <div ref={editRef} className="w-[300px] order-1  h-full bg-white flex justify-center items-center">
                        <div className="h-[70%] w-[80%] ">
                            <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[45%] my-2 bg-[#A9A9A9] p-2 rounded-2xl text-white placeholder:text-white text-sm text-center" placeholder="در صورت تمایل متن خود را بنویسید"></textarea>

                            <div onClick={()=>setproduct({...product,isOpen : true})} className="w-full my-2 h-[14%] cursor-pointer  bg-beh-orange flex items-center justify-center text-white text-lg ">
                                <h1>
                                    افزودن محصول
                                </h1>
                            </div>


                            <div onClick={onButtonClick} className="w-full my-4 h-[34%] cursor-pointer  bg-beh-orange flex items-center justify-center text-white text-lg ">
                                <h1>
                                     تصویر ضمینه
                                </h1>
                            </div>

                            <input type='file' onChange={onImageChange} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFile} style={{display: 'none'}}/>

                        </div>
                    </div>


                    <div ref={previewRef}  style={{backgroundImage : `url(${ selectedImage ?  URL.createObjectURL(selectedImage) : ''})` , backgroundRepeat : 'no-repeat', backgroundSize : 'cover' , backgroundPosition : 'center'}} className="w-[300px] order-2   h-full bg-beh-text-gray">

                        <div className="mt-32 w-[90%] text-white text-center bg-beh-gray-dark/60 mx-auto rounded-md ">
                            {text}
                        </div>


                        <div className="my-32 w-[90%] mx-auto ">
                            {/* <div className=" w-[220px] h-[100px] rounded-xl cursor-pointer bg-beh-orange shadow-2xl   ">
                                <h1 className="text-white h-[20px] font-semibold text-center">نام محصول</h1>
                                <div className=" w-full  mt-[6px] rounded-xl h-[75px] flex flex-row bg-beh-gray">
                                    <div className="w-[15%] h-full">
                                       <div className="  w-full h-full">
                                            <h1 className="rotate-90 text-beh-orange text-sm  py-6  ">
                                                 رایگان
                                            </h1>
                                       </div>
                                    </div>
                                    <div className="w-[85%] h-full bg-white rounded-xl flex flex-row">
                                        <div className=" w-full px-1   h-full">
                                            <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                                <div className="h-full w-[40%]  text-xs  pt-1">
                                                    <h1>بارگیری</h1>
                                                </div>
                                                <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                                    <h1>کرج</h1>
                                                </div>
                                            </div>

                                            <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                                                <div className="h-full w-[40%] text-xs  pt-1 ">
                                                    <h1>قیمت</h1>
                                                </div>
                                                <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                                                    <h1>2,000,000</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={NoImg.src} className="w-[75px] h-[75px] border-4 rounded-xl border-beh-gray-light" alt="" />
                                    </div>
                                </div>
                            </div> */}

                                {product.selected && <ProductTumbnail width={220} city={product?.selected?.City?.name ? product?.selected?.City?.name : 'نامشخص'} freeDelivery={product?.selected?.freeDelivery ? product?.selected?.freeDelivery : false} imgSrc={product.selected.image ? `${BACK_END}${product.selected.image}` : null} name={product?.selected?.title ? product?.selected?.title : 'نامشخص'} price={product?.selected?.price ? product?.selected?.price : 'توافقی'} /> }  
                        </div>

                    </div>


                    

                </div>
                <div className="min-w-[340px]  overflow-x-auto flex-wrap gap-1 w-[90%] h-[10vh] mx-auto  justify-center items-center flex flex-row" >
                    <div onClick={edit ? ()=>onGoToPreview() : ()=>onGoToEdit()} className="w-[150px]  md:hidden  h-[80%] cursor-pointer  bg-beh-yellow flex items-center justify-center text-white text-lg ">
                        <h1>
                            {edit ? 'پیش نمایش' : 'ویرایش'}
                        </h1>
                    </div>
                   
                    <div onClick={sendStroyHandle} className="w-[150px] h-[80%] cursor-pointer  bg-beh-green-light flex items-center justify-center text-white text-lg ">
                        <h1>
                            آپلود استوری
                        </h1>
                    </div>
                </div>
            </div>
          </div>

        </main>
            </>
        :
        null
      }
    </>
  )
}  




export default Page