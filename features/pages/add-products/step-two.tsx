import Image from "next/image";
import { useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { I_add_products, fetchedImages } from "../../../types/add-products";
import { BACK_END } from "../../../clients/localStorage";

export const StepTwoComponent = (props : { step : number , setStep : React.Dispatch<React.SetStateAction<number>> , fildes : I_add_products , setFileds :React.Dispatch<React.SetStateAction<I_add_products>> , exists_images?:fetchedImages ,setFetchedImages?: React.Dispatch<React.SetStateAction<fetchedImages>>  }  )=>{
    const inputFile = useRef<HTMLInputElement | null>(null) 
    const { fildes , setFileds } = props

    const onButtonClick = () => {
      inputFile?.current?.click();
    }; 
 
    const onImageChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        if ( e.target.files &&  e.target?.files?.length > 0) {
          console.log(e.target.files)
          props.setFetchedImages ? props.setFetchedImages({image_1 : null , image_2 : null , image_3 : null}) : null
          setFileds({...fildes, selectedImage_1 : e.target.files[0] , selectedImage_2 : e.target.files[1] ? e.target.files[1] : null , selectedImage_3 : e.target.files[2] ? e.target.files[2] : null })
        }
    }

    return(
        <div className=" h-[75vh] flex items-center ">
            <div className="w-[370px]">
                <div className="flex flex-row gap-5 p-2 mt-10">

                    
                    <div className="w-full flex flex-col gap-4  basis-1/2 rounded-md">
                        <div className="basis-1/2 flex row gap-4">
                            <div className="h-full w-1/2 flex justify-center items-center bg-beh-gray-light rounded-md">
                            {fildes.selectedImage_3 ? 
                                <Image width={90} height={90}  src={URL.createObjectURL(fildes.selectedImage_3) } />
                                    :
                                    props.exists_images?.image_3 ? <Image width={90} height={90}  src={BACK_END + props.exists_images?.image_3 } /> : null
                                }
                            </div>

                            <div className="h-full w-1/2 flex justify-center items-center bg-beh-gray-light rounded-md">
                            {fildes.selectedImage_2 ? 
                                <Image width={90} height={90}  src={URL.createObjectURL(fildes.selectedImage_2) } />
                                    :
                                    props.exists_images?.image_2 ? <Image width={90} height={90}  src={BACK_END + props.exists_images?.image_2 } /> : null
                                    
                                }
                            </div>
                        </div>

                        <div className="basis-1/2 ">
                            <div className="h-full w-full flex justify-center items-center rounded-md bg-beh-gray-light">
                                {fildes.selectedImage_1 ? 
                                <Image width={100} height={100}  src={URL.createObjectURL(fildes.selectedImage_1) } />
                                    :
                                    props.exists_images?.image_1 ? <Image width={90} height={90}  src={BACK_END + props.exists_images?.image_1 } /> : null
                                    
                                }
                            </div>
                        </div>
                    </div>

                    <div onClick={onButtonClick} className="w-full bg-beh-gray-light basis-1/2 rounded-md cursor-pointer" >
                            <BiUser className="w-full h-[170px] text-beh-text-gray" />
                            <div className="relative">
                                <div className=" h-[35px] rounded-b-md bg-beh-gray w-full flex text-center items-center text-white text-lg ">
                                    <h1 className="mx-auto">افزودن</h1>
                                </div>
                                <input type='file' onChange={onImageChange} multiple max={3} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFile} style={{display: 'none'}}/>
                            </div>
                    </div>


                </div>


                <div className="my-4 text-beh-gray-dark text-md font-semibold">
                    <ul className="list-inside ">
                        <li className="py-1">
                            افزودن 3 تصویر مجاز است     
                        </li>
                        <li className="py-1">
                            اولین تصویری که اضافه میکنید به عنوان تصویر اصلی انتخاب میشود    
                        </li>
                    </ul>
                
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
