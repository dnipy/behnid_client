import { useState } from "react"
import { BiDownArrowAlt } from "react-icons/bi"
import ErrorComponent from "../../components/alerts/error"
import { WholeCountry } from "../../static/_index"
import { I_add_products } from "../../types/add-products"


export const MultiCityPickerModel = (props : { fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>>  })=>{
    const [error,setError] = useState('')
    const { fildes , setFileds } = props
    const [openedCity,setOpenedCity] = useState(0)
    return (
    <>
      {error ? <ErrorComponent message={error} handle={setError} /> : null}
      
        <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
    
            {/* CENTER_DATA_PART */}
            <div className='fixed flex w-screen h-screen justify-center items-center'>
                <div dir='rtl' className='w-[380px]  md:w-[600px] min-w-[370px]  mx-auto h-[70vh]  bg-white rounded-3xl overflow-y-auto  '>
                    <div>
                        <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                            <div>
                                <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                    {/* شهر انتخاب شده */}
                                    انتخاب شهر
                                </h1>
                            </div>

                            <div>
                                <h1 onClick={()=>setFileds({...fildes , showMultiCityPicker : false , sendArea_list : []})} className="pl-7 cursor-pointer text-xl font-bold text-beh-orange">
                                    انصراف
                                </h1>
                            </div>

                        </div>

                        <div className="my-2 h-[70px] p-2 overflow-y-auto flex gap-x-6 gap-y-4 flex-wrap">
                            {fildes.sendArea_list.map(elm=>(
                                <div key={elm.id} onClick={()=>setFileds({...fildes , sendArea_list : fildes.sendArea_list.filter(item=>item.name != elm.name)})} className="border-2 border-beh-orange rounded-full text-beh-orange h-8 cursor-pointer px-3">
                                    {elm.name}
                                </div>
                            ))}
                        </div>
                        
                        <div className="my-2 h-[65px] flex justify-center items-center w-full">
                            <label className="relative block w-10/12">
                                <input type="text" className='h-[60px] w-full bg-beh-gray-light rounded-sm px-10 placeholder:text-beh-gray-dark placeholder:text-lg ' placeholder='جست و جو در شهر ها' dir='rtl'/>
                                <span className="absolute inset-y-0 right-3 flex items-center pl-3" >
                                    <svg className="h-5 w-5 fill-beh-gray-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                        height="30" viewBox="0 0 30 30">
                                        <path
                                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                        </path>
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div className="h-[25px] border-b-2 border-beh-gray-light w-full"></div>


                        {/* CITY_SELECT_PART */}
                        <div dir="ltr" className="w-full my-1 overflow-y-auto h-[45vh] border-b-2 border-beh-gray-light">
                            {WholeCountry.map(elm=>(
                                <>
                                    <div key={elm.id} dir="rtl" onClick={()=>{
                                        if (openedCity != elm.id) {
                                            setOpenedCity(elm.id)
                                        }
                                        else {
                                            setOpenedCity(0)
                                        }
                                        
                                        
                                        }} className="w-[90%] hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-between items-center px-5  gap-5">
                                        <div>
                                            <h1 className="font-bold text-lg ">
                                                {elm.name}
                                            </h1>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <h1 className="text-sm ">
                                                انتخاب میان شهر ها
                                            </h1>
                                            <BiDownArrowAlt className="w-6 h-6" />
                                        </div>
                                    </div>
                                    {openedCity == elm.id 
                                        ? 
                                        
                                            <div dir="rtl" onClick={()=>setOpenedCity(elm.id)} className="w-[70%]  hover:text-beh-orange duration-100 mx-auto rounded-md my-2  px-5  ">
                                                {
                                                    elm.cities.map(city=>(
                                                        
                                                            <div key={city.id} onClick={()=>{
                                                                const filtered_cities =  fildes.sendArea_list.filter(CT => CT.name != city.name )
                                                                setFileds({...fildes,sendArea_list : [...filtered_cities , {name : city.name , id : city.id} ]})
                                                                console.log(fildes.sendArea_list)
                                                            
                                                            }} className="w-[90%] hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-center items-center px-5  gap-5">
                                                                <h1 className="text-center">
                                                                    {city.name}
                                                                </h1>
                                                            </div>
                                                        
                                                    ))
                                                }
                                            </div>
                                        :   
                                             null
                                    }

                                </>
                            ))}
                        </div>

                        

                        {/* BUTTON_PART */}
                        <div className="flex justify-around h-[60px] my-2 gap-5 items-center">

                            <div onClick={()=>setFileds({...fildes,showMultiCityPicker : false , sendArea_list : []})} className=" cursor-pointer w-1/2 py-3 mr-3 rounded-md bg-beh-orange flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    انصراف
                                </h1>
                            </div>
                            <div onClick={()=>setFileds({...fildes,showMultiCityPicker : false})} className=" cursor-pointer w-1/2 py-3 ml-3 rounded-md bg-beh-green-super-light flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    تایید
                                </h1>                            
                            </div>

                        </div>
                    

                    
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}