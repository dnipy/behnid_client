import { I_add_products } from "../../../types/add-products"


export const StepOneComponent = (props : {step : number , setStep : React.Dispatch<React.SetStateAction<number>>  , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>> })=>{
    const { fildes , setFileds } = props
    return(
        <div className=" h-[75vh] flex items-center ">
            <div className="">
                <div className="w-[370px] text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-dark text-white">
                    <h1 className="font-bold text-lg">
                        نام کالا *
                    </h1>
                </div>

                <input type="text" value={fildes.title} onChange={(e)=>{setFileds({...fildes , title : e.target.value}) }} placeholder="دلستر یک لیتری بهنوش هلو" className="w-full text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold" />
            
            
            
                <div className="w-[370px] text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-dark text-white">
                    <h1 className="font-bold text-lg">
                        دسته بندی *
                    </h1>
                </div>

                <input value={fildes.cat_name} onClick={()=>setFileds({...fildes,showCatPicker : true})} type="text"  placeholder="مواد غذایی > نوشیدنی > دلستر" className="w-full text-center my-3 h-12 rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold" />




                <div className="w-[370px] text-center my-3 h-12 rounded-md flex items-center justify-center cursor-pointer bg-beh-green-super-light text-white" onClick={()=>props.setStep(props.step + 1)}>
                    <h1 className="font-bold text-lg">
                        ثبت و ادامه
                    </h1>
                </div>
            </div>
        </div>
    )
}


