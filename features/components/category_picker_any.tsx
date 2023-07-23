import { useState } from "react"
import { BiDownArrowAlt } from "react-icons/bi"
import ErrorComponent from "../../components/alerts/error"
import { WholeCountry , WholeCategories } from "../../static/_index"
import { I_add_products } from "../../types/add-products"


export const CategoryPickerModel = (props : {fildes : any , setFileds :React.Dispatch<React.SetStateAction<any>> , onClick?: ()=>void , is_multi? : boolean })=>{
    const [error,setError] = useState('')
    const { fildes , setFileds } = props
    const [openedCat,setOpenedCat] = useState(0)
    const [openedSubCat,setOpenedSubCat] = useState(0)

    return (
    <>
      {error ? <ErrorComponent message={error} handle={setError} /> : null}
      
        <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-50 ' >
    
            {/* CENTER_DATA_PART */}
            <div className='fixed flex w-screen h-screen justify-center items-center'>
                <div dir='rtl' className='w-[380px]  md:w-[600px] min-w-[370px]  mx-auto h-[85vh]  bg-white rounded-3xl overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
                    <div>
                        <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                            <div>
                                <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                    {/* شهر انتخاب شده */}
                                    انتخاب دسته 
                                </h1>
                            </div>

                            <div>
                                <h1 onClick={()=>setFileds({...fildes , cat_id: 1 ,showCatPicker : false})} className="pl-7 cursor-pointer text-xl font-bold text-beh-orange">
                                    انصراف
                                </h1>
                            </div>

                        {/* </div>

                        <div className="my-2 h-[50px]"> */}

                        </div>
                        
                        {/* <div className="my-2 h-[65px] flex justify-center items-center w-full">
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
                        </div> */}
                        <div className="h-[25px] border-b-2 border-beh-gray-light w-full"></div>


                        {/* CITY_SELECT_PART */}
                        <div dir="ltr" className="w-full my-1 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray h-[69vh]  border-beh-gray-light">
                            {WholeCategories.map(elm=>(
                                <>
                                    <div key={elm.id} dir="rtl" onClick={()=>{
                                        console.log({elm})
                                        if (props?.is_multi == true) {
                                                setFileds((prev : any)=>({...prev,cat_id : elm.id, cat_name : elm.name , showCatPicker : false,}))
                                                console.log({cat_id : elm.id, cat_name : elm.name})
                                                    setTimeout(() => {
                                                        {props?.onClick && props.onClick()}
                                                    }, 3000);
                                                }
                                        else {

                                            if (openedSubCat != elm.id) {
                                                setOpenedSubCat(elm.id)
                                            }
                                            else {
                                                setOpenedSubCat(0)
                                            }
                                        }

                                        }} className="w-[90%] cursor-pointer hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-between items-center px-5  gap-5">
                                        <div>
                                            <h1 className="font-bold text-lg ">
                                                {elm.name}
                                            </h1>
                                        </div>
                                        <div className="flex">
                                            <BiDownArrowAlt className="w-6 h-6" />
                                        </div>
                                    </div>
                                    {openedSubCat == elm.id 
                                        ? 
                                            <div dir="rtl" className="w-[70%] cursor-pointer  hover:text-beh-orange duration-100 mx-auto rounded-md my-2  px-5  ">
                                                {
                                                    elm.subCategories.map(sub_cat=>(
                                                            <>
                                                            <div key={sub_cat.id} onClick={()=>setOpenedCat(sub_cat.id)} className="w-[90%] hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-between items-center px-5  gap-5">
                                                                <div>
                                                                    <h1 className="text-center">
                                                                        {sub_cat.name}
                                                                    </h1>
                                                                </div>

                                                                <div>
                                                                    <BiDownArrowAlt className="w-6 h-6" />
                                                                </div>
                                                            </div>
                                                                {
                                                                    openedCat == sub_cat.id 
                                                                        ?
                                                                            sub_cat.categories.map(cat =>(
                                                                                <div key={cat.id} onClick={()=>{
                                                                                    setFileds({...fildes,cat_id : cat.id, cat_name : cat.name , showCatPicker : false})
                                                                                    setTimeout(() => {
                                                                                        {props?.onClick && props.onClick()}
                                                                                    }, 200);
                                                                                    
                                                                                    console.log(fildes)
                                                                                  }} className="w-[80%] cursor-pointer hover:text-beh-orange text-beh-gray duration-100 mx-auto rounded-md h-10 my-2 bg-beh-gray-light flex justify-center items-center px-5  gap-5">
                                                                                    <h1 className="text-center cursor-pointer">
                                                                                        {cat.name}
                                                                                    </h1>
                                                                                </div>
                                                                            ))
                                                                        :
                                                                            null
                                                                }
                                                            </>
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
                        {/* <div className="flex justify-around h-[60px] my-2 gap-5 items-center">

                            <div className="w-1/2 py-3 mr-3 rounded-md bg-beh-orange flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    انصراف
                                </h1>
                            </div>
                            <div className="w-1/2 py-3 ml-3 rounded-md bg-beh-green-super-light flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    تایید
                                </h1>                            
                            </div>

                        </div> */}
                    

                    
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}