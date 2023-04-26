import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineLoading } from 'react-icons/ai'
import { BsCheckCircle, BsClock, BsEye, BsQuestion } from 'react-icons/bs'
import { MdErrorOutline, MdOutlineNotInterested } from 'react-icons/md'
import { AuthorizedApiRequest } from '../../clients/axios'
import { Product, User } from '../../types/async-prisma-types'
import { useRouter } from 'next/router'
import { BiEdit } from 'react-icons/bi'


type ProductsTabResponse = {
    accepted : (User & {
        sellerProfile: {
            products: Product[];
        } | null;
    }) ;
    rejected : (User & {
        sellerProfile: {
            products: Product[];
        } | null;
    }) ;
    pending : (User & {
        sellerProfile: {
            products: Product[];
        } | null;
    }) ;
}



function ProdutsTabComponent() {
    const [error,setError] = useState('')
    const [selectedTap,setSelectedTap] = useState(1)
    const [reTry,setReTry] = useState(1)
    const [loading,setLoading] = useState(false)
    const [response,setResponse] = useState<ProductsTabResponse | null>(null)
    
    useEffect(()=>{
        setLoading(true)
        AuthorizedApiRequest
        .get(`/products/mine/all-status`)
        .then((res) => {
          if (res.data.err) {
            setError('ارور')
          } 
          else { 
            setResponse(res.data as ProductsTabResponse);
            console.log(res.data)
          }
        })
        .catch((err) => {
          // setError(err);
          console.log({err})
        })
        .finally(() => {
          setLoading(false);
        });
      
    },[reTry])
 

    
    return (
        <div className='w-full my-10  shadow-lg md:p-5 rounded-xl  flex flex-wrap flex-row gap-3 '>
    
        {/* TAB_SELECT_PART */}
        <div className='w-full h-14 flex flex-row my-1'>
            <div onClick={selectedTap === 1 ? undefined : ()=>setSelectedTap(1)} className={`w-1/3 ${selectedTap === 1 ? 'bg-beh-orange rounded-xl text-white' : 'cursor-pointer'}  flex justify-center items-center`}>
                <div className="flex flex-row gap-x-2">
                    <div >
                        <BsCheckCircle  className='w-5 h-5 mt-1' />
                    </div>
                    <div className='hidden md:block' >
                        تایید شده
                    </div>
                </div>
            </div>
            <div onClick={selectedTap === 2 ? undefined : ()=>setSelectedTap(2)} className={`w-1/3 ${selectedTap === 2 ? 'bg-beh-orange rounded-xl text-white' : 'cursor-pointer'}  flex justify-center items-center`}>
                <div className="flex flex-row gap-x-2">
                    <div >
                        <MdOutlineNotInterested  className='w-5 h-5 mt-1' />
                    </div>
                    <div className='hidden md:block' >
                        رد شده
                    </div>
                </div>
            </div>
            <div onClick={selectedTap === 3 ? undefined : ()=>setSelectedTap(3)} className={`w-1/3 ${selectedTap === 3 ? 'bg-beh-orange rounded-xl text-white' : 'cursor-pointer'}  flex justify-center items-center`}>
                <div className="flex flex-row gap-x-2">
                    <div >
                        <AiOutlineClockCircle  className='w-5 h-5 mt-1' />
                    </div>
                    <div className='hidden md:block' >
                        در انتظار
                    </div>
                </div>
            </div>
        </div>


        {/* TAP_BODY_PART */}
        <div className='w-full min-h-[300px]  my-1'>
            
            {/* LOADING */}
            {loading && 
                <div className='w-full h-full flex justify-center items-center'>
                    < AiOutlineLoading className="animate-spin" />
                </div>
            }
            
            
            {/* ERROR_WHILE_LOAD */}
            {error &&
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='text-center'>
                        <MdErrorOutline className="w-5 h-5 mx-auto" />
                        <h1 onClick={()=>setReTry(reTry+1)} className='cursor-pointer'>تلاش مجدد</h1>
                    </div>
                </div>
            }

            {/* RESPONSE_OK */}
            {response && 
                <>
                    {/* ACCEPTED */}
                    {selectedTap === 1 && 
                        response?.accepted?.sellerProfile?.products?.map(elm=>(
                            <AcceptedComponent describe={elm.describe} id={elm.id} name={elm.title} key={elm.id} />
                        ))
                    }
                    {selectedTap === 1 && response?.accepted?.sellerProfile?.products?.length === 0 && <h1 className='text-center'>درخواستی یافت نشد</h1>}

                    {/* REJECTED */}
                    {
                        selectedTap === 2 &&
                        response?.rejected?.sellerProfile?.products?.map(elm=>(
                            <RejectedComponent describe={elm.describe} id={elm.id} name={elm.title} key={elm.id} />
                        ))
                    }
                    {selectedTap === 2 && response?.rejected?.sellerProfile?.products?.length === 0 && <h1 className='text-center'>درخواستی یافت نشد</h1>}


                    {/* PENDING */}
                    {
                        selectedTap ===3 &&
                        response?.pending?.sellerProfile?.products?.map(elm=>(
                            <PendingComponent describe={elm.describe} id={elm.id} name={elm.title} key={elm.id} />
                        ))
                    }
                    {selectedTap === 3 && response?.pending?.sellerProfile?.products?.length === 0 && <h1 className='text-center'>درخواستی یافت نشد</h1>}

                </>
            }
        </div>
    </div>  
    )
}



const AcceptedComponent = (props : {id : number , name : string , describe : string })=>{
    const router = useRouter()
    return (
    <div className='border-b'>
    <div className='w-full h-[6.5rem] my-3  rounded-lg  flex flex-row '>
        <div className='w-10/12'>
            <h6 className='p-1 hover:text-beh-orange'>
                {props.id}#
            </h6>
            <h1 className='px-3  text-xl font-semibold cursor-pointer'>{props.name}</h1> 
            
            <h1 className='px-3'>
                ...{props.describe.slice(0,45)}
            </h1>
        </div>
        <div className='w-2/12 h-full '>
            <div onClick={()=>router.push(`/profile/seller/edit-products/${props.id}`)} className='w-[90%] cursor-pointer h-10 my-2 mx-auto rounded-xl bg-beh-yellow flex justify-center items-center'>
                <BiEdit className='fill-white w-7 h-7' />
            </div>
            <div onClick={()=>router.push(`/products/${props.id}`)} className='w-[90%] h-10 my-2 mx-auto rounded-xl cursor-pointer bg-beh-green-light flex justify-center items-center'>
                <BsEye className='fill-white w-7 h-7' />
            </div>
        </div>

    </div>
    </div>    

    )
}

const RejectedComponent = (props : {id : number , name : string , describe : string })=>{
    const router = useRouter()
    return (
    <div className='border-b'>
    <div className='w-full h-[6.5rem] my-3  rounded-lg  flex flex-row '>
        <div className='w-10/12'>
            <h6 className='p-1 hover:text-beh-orange'>
            {props.id}#
            </h6>
            <h1 className='px-3  text-xl font-semibold cursor-pointer'>{props.name}</h1> 
            
            <h1 className='px-3'>
            ...{props.describe.slice(0,45)}
            </h1>
        </div>
        <div className='w-2/12 h-full '>
            <div onClick={()=>router.push(`/profile/seller/edit-products/${props.id}`)} className='w-[90%] cursor-pointer h-10 my-2 mx-auto rounded-xl bg-beh-yellow flex justify-center items-center'>
                <BiEdit className='fill-white w-7 h-7' />
            </div>
            <div className='w-[90%] h-10 my-2 mx-auto rounded-xl cursor-pointer bg-beh-green-light flex justify-center items-center'>
                <BsQuestion className='fill-white w-7 h-7' />
            </div>
        </div>

    </div>
    </div>    

    )
}

const PendingComponent = (props : {id : number , name : string , describe : string })=>{
    const router = useRouter()
    return (
    <div className='border-b'>
    <div className='w-full h-[6.5rem] my-3  rounded-lg  flex flex-row '>
        <div className='w-10/12'>
            <h6 className='p-1 hover:text-beh-orange'>
            {props.id}#
            </h6>
            <h1 className='px-3  text-xl font-semibold cursor-pointer'>{props.name}</h1> 
            
            <h1 className='px-3'>
            ...{props.describe.slice(0,45)}
            </h1>
        </div>
        <div className='w-2/12 h-[90%] '>
            <div className='w-[90%] h-full my-2 mx-auto rounded-xl   flex justify-center items-center'>
                <BsClock className='fill-beh-green-light w-7 h-7' />
            </div>
        </div>

    </div>
    </div>    

    )
}

export default ProdutsTabComponent