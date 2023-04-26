import { useState } from "react"
import { BiDownArrowAlt } from "react-icons/bi"
import ErrorComponent from "../../components/alerts/error"
import { WholeCountry , WholeCategories } from "../../static/_index"
import { I_add_products } from "../../types/add-products"
import { City } from "../../types/async-prisma-types"
import { HiLocationMarker } from "react-icons/hi"


export const SelectedCitiesModel = (props : { fildes : boolean , setFileds : React.Dispatch<React.SetStateAction<boolean>> , cities? : City[]  })=>{
    const [error,setError] = useState('')
    const { fildes , setFileds } = props

    return (
    <>
      {error ? <ErrorComponent message={error} handle={setError} /> : null}
      
        <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
    
            {/* CENTER_DATA_PART */}
            <div className='fixed flex w-screen h-screen justify-center items-center'>
                <div dir='rtl' className='w-[380px]  md:w-[600px] min-w-[370px]  mx-auto h-[85vh]  bg-white rounded-3xl overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
                    <div>
                        <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                            <div>
                                <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                    شهر  های انتخاب شده
                                    
                                </h1>
                            </div>

                            <div>
                                <h1 onClick={()=>setFileds(false)} className="pl-7 cursor-pointer text-xl font-bold text-beh-orange">
                                    انصراف
                                </h1>
                            </div>
                        </div>
                        
                        <div className="h-[25px] border-b-2 border-beh-gray-light w-full"></div>


                        {/* CITY_SELECT_PART */}
                        <div dir="ltr" className="w-full my-1 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray h-[69vh]  border-beh-gray-light">
                            {props.cities?.map(elm=>(
                                <>
                                    <div key={elm.id} dir="rtl" className="w-[90%] cursor-pointer hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-between items-center px-5  gap-5">
                                        <div>
                                            <h1 className="font-bold text-lg ">
                                                {elm.name}
                                            </h1>
                                        </div>
                                        <div className="flex">
                                            <HiLocationMarker className="w-6 h-6" />
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>

                    
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}