import { ALlUnits } from "../../../static/_index"
import { I_add_products } from "../../../types/add-products"
import { UnitNameById } from "../../../utils/UnitNameById"

export const StepThreeComponent = (props : {step : number , setStep : React.Dispatch<React.SetStateAction<number>> , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>>  })=>{
    const { fildes , setFileds } = props
    
    return(
        <>
        <div className=" h-[75vh] flex items-center ">
            <div className="">
                <div className=" w-[370px] text-center  my-4 h-12 rounded-md flex gap-3 flex-row items-center justify-between text-black">
                    <div className="basis-8/12">
                        <h1 className="text-black text-lg font-semibold text-center">حداقل سفارش</h1>
                        <input value={fildes.minOrder} onChange={(e)=>setFileds({...fildes,minOrder : e.target.valueAsNumber})} type="number" placeholder="10" className="w-full bg-beh-orange px-4 h-10 text-center  rounded-md placeholder:text-white placeholder:text-center placeholder:font-semibold " />
                    </div>
             
                    <div className="basis-4/12">
                        <h1 className="text-black text-lg font-semibold text-center">واحد</h1>
                        <select placeholder="کیلوگرم" value={fildes.unit} onChange={(e)=>setFileds({...fildes,unit :Number(e.target.value) })} className="w-full bg-beh-orange h-10  rounded-md text-white  placeholder:text-white placeholder:text-center placeholder:font-semibold" >
                            {ALlUnits.map(elm=>(
                                <option value={elm.id} key={elm.id}>{elm.name}</option>
                                ))}
                        </select>
                    </div>

                </div>

                <div className="my-3">    
                    <h1 className="text-black text-lg  font-semibold text-center"> موجودی  ( { UnitNameById(fildes.unit ? fildes.unit : 1) } ) * </h1>
                    <input type="number" placeholder="نامحدود" value={fildes.quantity} onChange={(e)=>setFileds({...fildes,quantity : Number(e.target.value) })} className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                </div>

                {
                    fildes.unit == 1 
                        ? 
                            null
                        : 
                            <div className="my-3">    
                                <h1 className="text-black text-lg  font-semibold text-center">وزن هر { UnitNameById(fildes.unit ? fildes.unit : 1) } (گرم)</h1>
                                <input type="number" placeholder="1000" value={fildes.weight} onChange={(e)=>setFileds({...fildes,weight : Number(e.target.value) })}  className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                            </div>
                }
                



                <div className="my-3">    
                    <h1 className="text-black text-lg  font-semibold text-center">محل بارگیری</h1>
                    <input type="number" onClick={()=>setFileds({...fildes,showCityPicker : true})}  placeholder={fildes.selectedCityName ? fildes.selectedCityName : 'انتخاب شهر'} className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                </div>


                <div className="my-3">    
                    <h1 className="text-black text-lg  font-semibold text-center">مدت زمان ارسال</h1>
                    <input type="number"  value={fildes.deliveryTime} onChange={(e)=>setFileds({...fildes,deliveryTime : e.target.value })} placeholder="روز" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-orange placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                </div>

                <div className="w-[370px] text-center my-4 h-12 rounded-md flex items-center justify-center cursor-pointer bg-beh-green-super-light text-white" onClick={()=>props.setStep(props.step + 1)}>
                    <h1 className="font-bold text-lg">
                        ثبت و ادامه
                    </h1>
                </div>
            </div>
        </div>
        </>
    )
}