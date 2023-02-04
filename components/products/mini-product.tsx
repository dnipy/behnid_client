import { BACK_END } from "../../clients/localStorage"
import {BsSpeedometer} from 'react-icons/bs'

export const MiniProduct = (props : {avatar : string | null , name : string | null})=>{
    return (
        <div className="flex flex-col items-center h-[450px] w-[350px] mx-auto hover:scale-105 transition-all duration-100 ">


            <div className='absolute z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
                {
                    props.avatar 
                    ?
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                    :
                    <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
                }
            </div> 



            <div className='mt-[60px] z-[5] bg-beh-orange w-[330px] mx-auto h-[90px]'>
                <h1 className='text-center mt-[35px] font-bold text-sm text-beh-gray'>
                    {props.name ? props.name : 'کاربر بدون نام'}
                </h1>

                <h1 className='text-center  font-bold text-lg text-white'>
                    {props.name ? props.name : 'محصول بدون نام'}
                </h1>
            </div>

            <div className='absolute mt-[85px] w-[350px] bg-beh-gray  h-[340px]'>
                <div className="w-[330px] mx-auto h-[200px] rounded-l-md mt-20 bg-white flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div className="flex flex-col items-center gap-2 text-sm">
                            <div className=" text-center ">
                                <h1>حداقل سفارش</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >2 واحد </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>محل بارگیری</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                <h1 className="text-white font-bold" >کرج</h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>مدت زمان ارسال</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >1 روز </h1>                                    
                                </div>
                            </div>

                            <div className=" text-center">
                                <h1>قیمت هر واحد</h1>
                                <div className="w-[120px] h-[20px] rounded-md bg-beh-orange" >
                                    <h1 className="text-white font-bold" >2,000,000</h1>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-4 border-beh-gray-light w-[200px] h-[200px] rounded-md">
                        <div className="bg-beh-gray-dark w-full h-full" ></div>
                    </div>
                </div>    




                <div className="w-[330px] mx-auto h-[30px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px] flex flex-row gap-2 mt-1">
                       <div>
                           <BsSpeedometer className="w-6 h-6 text-beh-orange" />
                       </div>

                       <div>
                            <h1 className="text-white">
                                ارسال رایگان
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
                               1 دقیقه
                            </h1>
                       </div>
                    </div>
                </div>    


                <div className="w-[330px] mx-auto h-[40px] rounded-l-md mt-1  flex flex-row gap-5 " >
                    <div className="w-[150px]">
                        <div className="cursor-pointer hover:scale-105 duration-100 w-[125px] h-[40px] rounded-md bg-beh-yellow mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-beh-gray-dark font-bold text-xl" >نمای کامل</h1>                                    
                        </div>
                    </div>

                    <div className="w-[200px] h-[40px] ">
                        <div className="cursor-pointer  hover:scale-105 w-[185px] h-[40px] rounded-md bg-beh-green-super-light mx-auto my-auto flex justify-center items-center" >
                            <h1 className="text-white font-bold text-xl" >شروع گفت و گو</h1>                                    
                        </div>
                    </div>
                </div>    
            
            </div>




        </div>
    )
}