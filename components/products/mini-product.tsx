import { BACK_END } from "../../clients/localStorage"
import {BsSpeedometer} from 'react-icons/bs'
import NoPerson from '../../assets/NoPerson.png'
import { useRouter } from "next/router"
import { SetStateAction, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import { savedProducts } from "../../pages/profile/intresting-products";
import { AiOutlineLoading } from "react-icons/ai";


interface I_MiniProduct {
    id : number ,
    AuthorId : string | number ,
    title : string,
    name : string ,
    avatar : string | null ,
    image : string | null ,
    unitName : string ,
    minOrder : number ,
    sendFrom : string ,
    DeliveryTime : string ,
    pricePerUnit : number ,
    freeDelivery : boolean ,
    responseTime : string | null ,
}

interface I_My_MiniProduct extends I_MiniProduct {
    isShown : boolean;
    Show : (id: number) => void;
    NotShow : (id: number) => void
}

interface I_IntrestingMiniProduct {
    id : number ,
    AuthorId : string | number ,
    title : string,
    name : string ,
    avatar : string | null ,
    image : string | null ,
    unitName : string ,
    minOrder : number ,
    sendFrom : string ,
    DeliveryTime : string ,
    pricePerUnit : number ,
    freeDelivery : boolean ,
    responseTime : string | null ,
    product : savedProducts | null,
    setProducts : React.Dispatch<SetStateAction<savedProducts | null>> 
}

export const MiniProduct = (props : I_MiniProduct)=>{
    const router = useRouter()
    return (
        <div className="flex flex-col items-center h-[450px] w-[350px] mx-auto hover:scale-105 transition-all duration-100 ">


            <div className='absolute z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                {
                    props.avatar 
                    ?
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                    :
                    // <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={NoPerson.src} />
                }
            </div> 



            <div className='mt-[60px] z-[5] bg-beh-orange w-[330px] mx-auto h-[90px]'>
                <h1 className='text-center mt-[35px] font-bold text-sm text-beh-gray'>
                    {props.name ? props.name : 'کاربر بدون نام'}
                </h1>

                <h1 className='text-center  font-bold text-lg text-white'>
                    {props.title ? props.title : 'محصول بدون نام'}
                </h1>
            </div>

            <div className='absolute mt-[85px] w-[350px] bg-beh-gray  h-[340px]'>
                <div className="w-[330px] mx-auto h-[200px] rounded-l-md mt-20 bg-white flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div className="flex flex-col items-center gap-2 text-sm">
                            <div className=" text-center ">
                                <h1>حداقل سفارش</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.minOrder} {props.unitName} </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>محل بارگیری</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                <h1 className="text-white font-bold" >{props.sendFrom}</h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>مدت زمان ارسال</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.DeliveryTime} روز </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>قیمت هر {props.unitName}</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.pricePerUnit}</h1>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-4 border-beh-gray-light w-[200px] h-[200px] rounded-md">
                        {
                            props.image ? 
                            <img className='w-full h-full rounded-md' width={90} height={90} src={`${BACK_END}${props.image}`} />
                            :
                            <div className="bg-beh-gray-dark w-full h-full" ></div>
                        }
                    </div>
                </div>    




                <div className="w-[330px] mx-auto h-[30px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px] flex flex-row gap-2 mt-1">
                       <div>
                           <BsSpeedometer className="w-6 h-6 text-beh-orange" />
                       </div>

                       <div>
                            <h1 className="text-white">
                                {props.freeDelivery ? 'حمل رایگان' : 'حمل با مشتری'}
                                
                            </h1>
                       </div>
                    </div>

                    <div className=" w-[200px] h-[30px] rounded-md flex flex-row mt-1 ">
                    <div>
                            <h1 className="text-white">
                                مدت پاسخگویی 
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-white">
                            &nbsp; | &nbsp;  
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-beh-orange">
                               1 روز
                            </h1>
                       </div>
                    </div>
                </div>    


                <div className="w-[330px] mx-auto h-[40px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div onClick={()=> router.push(`/products/${props.id}`)} className="cursor-pointer hover:scale-105 duration-100 w-[125px] h-[40px] rounded-md bg-beh-yellow mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-beh-gray-dark font-bold text-xl" >نمای کامل</h1>                                    
                        </div>
                    </div>

                    <div className="w-[200px] h-[40px] ">
                        <div onClick={()=> router.push(`/chat?id=new-chat?id=${props.AuthorId}`)} className="cursor-pointer  hover:scale-105 w-[185px] h-[40px] rounded-md bg-beh-green-super-light mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-white font-bold text-xl" >شروع گفت و گو</h1>                                    
                        </div>
                    </div>
                </div>    
            
            </div>




        </div>
    )
}


export const MyMiniProduct = (props : I_My_MiniProduct)=>{
    const router = useRouter()
    return (
        <div className="flex flex-col items-center h-[450px] w-[350px] mx-auto hover:scale-105 transition-all duration-100 ">


            <div className='absolute z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                {
                    props.avatar 
                    ?
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                    :
                    // <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={NoPerson.src} />
                }
            </div> 



            <div className='mt-[60px] z-[5] bg-beh-orange w-[330px] mx-auto h-[90px]'>
                <h1 className='text-center mt-[35px] font-bold text-sm text-beh-gray'>
                    {props.name ? props.name : 'کاربر بدون نام'}
                </h1>

                <h1 className='text-center  font-bold text-lg text-white'>
                    {props.title ? props.title : 'محصول بدون نام'}
                </h1>
            </div>

            <div className='absolute mt-[85px] w-[350px] bg-beh-gray  h-[340px]'>
                <div className="w-[330px] mx-auto h-[200px] rounded-l-md mt-20 bg-white flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div className="flex flex-col items-center gap-2 text-sm">
                            <div className=" text-center ">
                                <h1>حداقل سفارش</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.minOrder} {props.unitName} </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>محل بارگیری</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                <h1 className="text-white font-bold" >{props.sendFrom}</h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>مدت زمان ارسال</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.DeliveryTime} روز </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>قیمت هر {props.unitName}</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.pricePerUnit}</h1>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-4 border-beh-gray-light w-[200px] h-[200px] rounded-md">
                        {
                            props.image ? 
                            <img className='w-full h-full rounded-md' width={90} height={90} src={`${BACK_END}${props.image}`} />
                            :
                            <div className="bg-beh-gray-dark w-full h-full" ></div>
                        }
                    </div>
                </div>    




                <div className="w-[330px] mx-auto h-[30px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px] flex flex-row gap-2 mt-1">
                       <div>
                           <BsSpeedometer className="w-6 h-6 text-beh-orange" />
                       </div>

                       <div>
                            <h1 className="text-white">
                                {props.freeDelivery ? 'حمل رایگان' : 'حمل با مشتری'}
                                
                            </h1>
                       </div>
                    </div>

                    <div className=" w-[200px] h-[30px] rounded-md flex flex-row mt-1 ">
                    <div>
                            <h1 className="text-white">
                                مدت پاسخگویی 
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-white">
                            &nbsp; | &nbsp;  
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-beh-orange">
                               1 روز
                            </h1>
                       </div>
                    </div>
                </div>    


                <div className="w-[330px] mx-auto h-[40px] rounded-l-md mt-8  flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div onClick={()=> router.push(`/profile/seller/edit-products/${props.id}`)} className="cursor-pointer hover:scale-105 duration-100 w-[125px] h-[40px] rounded-md bg-beh-yellow mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-white font-bold text-xl" >ویرایش</h1>                                    
                        </div>
                    </div>

                    <div className="w-[200px] h-[40px] ">
                        <div onClick={props.isShown ?()=> props.NotShow(props.id) :()=> props.Show(props.id)} className={`cursor-pointer   hover:scale-105 w-[185px] h-[40px] rounded-md ${props.isShown ? 'bg-beh-red' : 'bg-beh-green-super-light'}   mx-auto my-auto flex justify-center items-center`} >
                            <h1 className="text-white font-bold text-xl" >{props.isShown ? 'ناموجود کردن' : 'موجود کردن' }</h1>                                    
                        </div>
                    </div>
                </div>    
            
            </div>




        </div>
    )
}

export const IntrestingMiniProduct = (props : I_IntrestingMiniProduct)=>{
    const router = useRouter()
    const [loading,setloading] = useState(false)
    const [retry,setReTry] = useState(false)
    const { product , setProducts } = props
    const deleteProduct = async(productId : Number)=>{ 
        setloading(true)
        
        await AuthorizedApiRequest.post('/profile/delete-from-intresting-products', {
          id : props.id,
        }).then(res=>{
          if (res.data?.err ) {
            setReTry(res.data?.err)
          }
          else {
            //   setSucces(res.data?.msg)
            const NewIntrestList = product
            NewIntrestList?.splice(NewIntrestList?.findIndex(e =>(e.id === productId)),1)
            console.log(NewIntrestList)
            setProducts(NewIntrestList)
          }
        }).catch(e=>{
          setReTry(true)
        })
        .finally(()=>{
          setloading(false)
        })
    }


    return (
        <div className="flex my-5 flex-col items-center h-[450px] w-[350px] mx-auto hover:scale-105 transition-all duration-100 ">
            <div className='absolute z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                {
                    props.avatar 
                    ?
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                    :
                    // <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={NoPerson.src} />
                }
            </div> 



            <div className='mt-[60px] z-[5] bg-beh-orange w-[330px] mx-auto h-[90px]'>
                <h1 className='text-center mt-[35px] font-bold text-sm text-beh-gray'>
                    {props.name ? props.name : 'کاربر بدون نام'}
                </h1>

                <h1 className='text-center  font-bold text-lg text-white'>
                    {props.title ? props.title : 'محصول بدون نام'}
                </h1>
            </div>

            <div className='absolute mt-[85px] w-[350px] bg-beh-gray  h-[340px]'>
                <div className="w-[330px] mx-auto h-[200px] rounded-l-md mt-20 bg-white flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div className="flex flex-col items-center gap-2 text-sm">
                            <div className=" text-center ">
                                <h1>حداقل سفارش</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.minOrder} {props.unitName} </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>محل بارگیری</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                <h1 className="text-white font-bold" >{props.sendFrom}</h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>مدت زمان ارسال</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.DeliveryTime} روز </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>قیمت هر {props.unitName}</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >{props.pricePerUnit}</h1>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-4 border-beh-gray-light w-[200px] h-[200px] rounded-md">
                        {
                            props.image ? 
                            <img className='w-full h-full rounded-md' width={90} height={90} src={`${BACK_END}${props.image}`} />
                            :
                            <div className="bg-beh-gray-dark w-full h-full" ></div>
                        }
                    </div>
                </div>    




                <div className="w-[330px] mx-auto h-[30px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px] flex flex-row gap-2 mt-1">
                       <div>
                           <BsSpeedometer className="w-6 h-6 text-beh-orange" />
                       </div>

                       <div>
                            <h1 className="text-white">
                                {props.freeDelivery ? 'حمل رایگان' : 'حمل با مشتری'}
                                
                            </h1>
                       </div>
                    </div>

                    <div className=" w-[200px] h-[30px] rounded-md flex flex-row mt-1 ">
                    <div>
                            <h1 className="text-white">
                                مدت پاسخگویی 
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-white">
                            &nbsp; | &nbsp;  
                            </h1>
                       </div>
                       <div>
                            <h1 className="text-beh-orange">
                               1 روز
                            </h1>
                       </div>
                    </div>
                </div>    


                <div className="w-[330px] mx-auto h-[40px] rounded-l-md mt-8  flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div onClick={()=> router.push(`/products/${props.id}`)} className="cursor-pointer hover:scale-105 duration-100 w-[125px] h-[40px] rounded-md bg-beh-yellow mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-white font-bold text-xl" >مشاهده</h1>                                    
                        </div>
                    </div>

                    <div className="w-[200px] h-[40px] ">
                        <div onClick={()=>deleteProduct(props.id)} className={`cursor-pointer   hover:scale-105 w-[185px] h-[40px] rounded-md bg-beh-red   mx-auto my-auto flex justify-center items-center`} >
                            <h1 className="text-white font-bold text-xl" >
                                {!loading && 'حذف از علاقمندی' }
                                {loading && < AiOutlineLoading className="animate-spin" />}
                                
                                </h1>                                    
                        </div>
                    </div>
                </div>    
            
            </div>




        </div>
    )
}