import { useState } from "react"
import { I_add_products } from "../../../types/add-products"
import { containsSpecialChars } from "../../../utils/chech-chars"

export const StepFourComponent = (props : {step : number , setStep : React.Dispatch<React.SetStateAction<number>> , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>> })=>{
    
    const { setFileds, fildes } = props
    const [ keyword , setKeyword ] = useState<string>('')
    return(
        <div className=" h-[75vh] flex items-center  ">
            <div className="w-[370px]">
                <div className=" text-center my-3 h-12 rounded-md flex items-center justify-center ">
                    <h1 className="text-black text-lg  font-semibold text-center">
                        توضیحات *
                    </h1>
                </div>
                <p className="text-left text-sm text-beh-gray-light font-semibold">حداقل (30 کارکتر)</p>
                <textarea value={fildes.describe} onChange={(e)=>setFileds({...fildes,describe : e.target.value})} placeholder="اینجا بنویسید" className="w-full text-right my-3 h-28 overflow-x-hidden rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-sm p-2 placeholder:font-semibold" />


                <div className=" text-center my-3 h-12 rounded-md flex items-center justify-center ">
                    <h1 className="text-black text-lg  font-semibold text-center">
                        کلمات کلیدی
                    </h1>
                </div>
                <p className="text-left text-sm text-beh-gray-light font-semibold">جهت افزایش بازدید</p>

                <input placeholder="اینجا بنویسید" value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={(e)=>{
                    if (e.key == 'Enter' && keyword && !fildes.keyword_list.includes({name : keyword}) && !containsSpecialChars(keyword) ) {
                        setFileds({...fildes , keyword_list :[...fildes.keyword_list,{name : keyword.trim() }]})
                        setKeyword('')
                    }
                }}  className="w-full text-right my-3 h-12 overflow-x-hidden rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-sm p-2 placeholder:font-semibold" />
                
                <div dir="ltr" className="w-full h-28 overflow-auto bg-beh-orange rounded-md p-3 flex flex-wrap  gap-5 ">
                    {fildes.keyword_list.map(elm =>(
                        <div key={elm.name} onClick={()=>setFileds({...fildes , keyword_list : fildes.keyword_list.filter(item=>item.name != elm.name)})} className=" cursor-pointer  px-2 h-8 rounded-full bg-white text-center border-2 border-black" >
                            <h1 className="">{elm.name}</h1>
                        </div>
                    ))}

                </div>
            
            
            
                <div className="w-[370px] text-center my-3 h-12 rounded-md flex items-center justify-center cursor-pointer bg-beh-green-super-light text-white" onClick={()=>props.setStep(props.step + 1)}>
                    <h1 className="font-bold text-lg">
                        ثبت و ادامه
                    </h1>
                </div>
            </div>
        </div>
    )
}