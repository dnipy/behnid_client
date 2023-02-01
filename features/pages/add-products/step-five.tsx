import { ChangeEvent } from "react";
import { I_add_products } from "../../../types/add-products"
import { UnitNameById } from "../../../utils/UnitNameById"

export const StepFiveComponent = (props : { send : () => Promise<void>, step : number , setStep : React.Dispatch<React.SetStateAction<number>> , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>>  })=>{
    const {setFileds,fildes} = props

    const handleChangePercent = (event : ChangeEvent<HTMLInputElement>)  => {
        const min = 0;
        const max = 100;

        const value = Math.max(min, Math.min(max, Number(event.target.valueAsNumber)));
        setFileds({...fildes,offPercent : value})
      };
    
    return(
        <div className=" h-[75vh] flex items-center ">
            <div className="w-[370px]">
                <div className="w-full bg-white px-7 py-2">

                    <div className="my-3">    
                    
                        <h1 className="text-black text-lg  font-semibold text-center">قیمت مصرف کننده *</h1>
                        <input value={fildes.price} onChange={(e)=>setFileds({...fildes,price : e.target.valueAsNumber})}  type="number" placeholder="20,000" className="w-full text-center  h-10 rounded-md flex items-center justify-center bg-beh-gray-dark placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="my-3">    
                        <h1 className="text-black text-lg  font-semibold text-center">قیمت تولید کننده *</h1>
                        <input value={fildes.producerPrice} onChange={(e)=>setFileds({...fildes,producerPrice : e.target.valueAsNumber})} type="number" placeholder="18,000" className="w-full text-center  h-10 rounded-md flex items-center justify-center bg-beh-gray-dark placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>


                    <div className="my-3">    
                        <h1 className="text-black text-lg  font-semibold text-center">قیمت هر {UnitNameById(fildes.unit ? fildes.unit :1)} برای شما *</h1>
                        <input  value={fildes.customerPrice} onChange={(e)=>setFileds({...fildes,customerPrice : e.target.valueAsNumber})}  type="number" placeholder="120,000" className="w-full text-center  h-10 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="my-3 flex justify-around">   
                        {/* <div>
                            <div className='flex gap-2'>
                                <input checked type="radio"className='w-5 mt-1 h-5' />
                                <h1>به عهده خریدار</h1>
                            </div>
                        </div> */}


                        <div>
                            <div className='flex gap-2'>
                                <input checked={fildes.freeDelivery} onChange={()=>setFileds({...fildes , freeDelivery : !fildes.freeDelivery})}  type="checkbox" className='w-5 mt-1 h-5' />
                            <h1>ارسال رایگان</h1>
                            </div>
                        </div>


                        <div>
                            <div className='flex gap-2'>
                                <input checked={fildes.add_story} onChange={()=>setFileds({...fildes , add_story : !fildes.add_story})}  type="checkbox" className='w-5 mt-1 h-5' />
                            <h1>افزودن به استوری</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="my-3">
                        <h1 className="text-black text-lg  font-semibold text-center">محدوده ارسال</h1>
                        <input onClick={()=>setFileds({...fildes,showMultiCityPicker : true})} type="number" placeholder={fildes.sendArea_list.length > 0 ? `${fildes.sendArea_list.length} شهر ` :"سراسر کشور"} className="w-[80%] mx-auto mt-1 text-center cursor-pointer h-10 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>
                </div>

                <h1 className="text-black text-lg   py-2 font-bold text-center">تخفیف</h1>
                <div className="flex flex-row items-center justify-around gap-2 h-12 p-2">
                    <div className="basis-2/12 text-center">
                        <h1>در هر </h1>
                    </div>  

                    <div className="basis-3/12">
                    <input type="number" value={fildes.offCount} onChange={(e)=>setFileds({...fildes , offCount : e.target.valueAsNumber})}  placeholder="10" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="basis-2/12 text-center">
                        <h1>
                            {UnitNameById(fildes.unit ? fildes.unit :1)}
                        </h1>
                    </div>

                    <div className="basis-2/12">
                        <input type="number" value={fildes.offPercent} onChange={handleChangePercent} placeholder="5%" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                    </div>

                    <div className="basis-3/12 text-center">
                        % تخفیف
                    </div>


                </div>



                <div className="w-[370px] text-center my-3 h-12 rounded-md flex items-center justify-center cursor-pointer bg-beh-green-super-light text-white" onClick={()=>props.send()}>
                    <h1 className="font-bold text-lg">
                        ثبت محصول
                    </h1>
                </div>
            </div>
        </div>
    )
}