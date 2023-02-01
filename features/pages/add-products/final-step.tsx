import { I_add_products } from "../../../types/add-products"

export const LastComponent = (props : {step : number , setStep : React.Dispatch<React.SetStateAction<number>> , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>>  })=>{
    return(
        <div className="w-full  mt-10 ">

           <div className="w-full my-5">
                <div className="w-full  px-7 py-2">
                <div className="flex flex-row gap-3 h-[200px]">
                    <div className="basis-4/6">
                        <div className="w-full h-full bg-beh-gray-light rounded-md">
                        </div>
                    </div>
                    <div className="basis-2/6 flex gap-2 flex-col justify-around items-center">
                        <div className="w-2/3 h-16 bg-beh-gray-light rounded-md"></div>
                        <div className="w-2/3 h-16 bg-beh-gray-light rounded-md"></div>
                        <div className="w-2/3 h-16 bg-beh-gray-light rounded-md"></div>

                    </div>
                </div>
                </div>


                <div className="w-full px-8 py-2">
                <div className="w-full text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-dark text-white">
                    <h1 className="font-bold text-lg">
                        نام کالا
                    </h1>
                </div>

                <div className="w-full text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-dark text-white">
                    <h1 className="font-bold text-lg">
                        دسته بندی
                    </h1>
                </div>
                </div>
           </div>


           <div className="w-full my-5 px-3">
                    <div className="my-3">    
                        <h1 className="text-black text-lg  font-semibold text-center">قیمت هر بسته</h1>
                        <input type="number" placeholder="20,000" className="w-full text-center  h-10 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="w-full bg-white px-7 py-2">
                            <div className="my-3 flex justify-around">   
                                <div>
                                    <div className='flex gap-2'>
                                        <input checked type="radio"className='w-5 mt-1 h-5' />
                                        <h1>به عهده خریدار</h1>
                                    </div>
                                </div>


                                <div>
                                    <div className='flex gap-2'>
                                        <input  type="radio"className='w-5 mt-1 h-5' />
                                    <h1>ارسال رایگان</h1>
                                    </div>
                                </div>


                            </div>

                            <div className="my-3">   
                                <h1 className="text-black text-lg   py-2 font-bold text-center">محدوده ارسال</h1>
                                <input type="number" placeholder="سراسر کشور" className="w-[80%] mx-auto mt-5 text-center cursor-pointer h-10 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                            </div>
                    </div>

                <h1 className="text-black text-lg   py-2 font-bold text-center">تخفیف</h1>
                <div className="flex flex-row items-center justify-around gap-2 h-12 p-2">
                    <div className="basis-2/12 text-center">
                        <h1>در هر </h1>
                    </div>  

                    <div className="basis-3/12">
                    <input type="number" placeholder="10" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="basis-2/12 text-center">
                        <h1>
                            واحد
                        </h1>
                    </div>

                    <div className="basis-2/12">
                        <input type="number" placeholder="5%" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="basis-3/12 text-center">
                        % تخفیف
                    </div>


                </div>


                <div className=" text-center my-3 h-12 rounded-md flex items-center justify-center ">
                    <h1 className="text-black text-lg  font-semibold text-center">
                        توضیحات
                    </h1>
                </div>
                <textarea placeholder="اینجا بنویسید" className="w-full text-right my-3 h-28 overflow-x-hidden rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-sm p-2 placeholder:font-semibold" />

            </div>
        </div>
    )
}