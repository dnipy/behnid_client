import React, { SetStateAction, useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios';
import { useRouter } from 'next/router';
import ComponentLoading from '../../components/componentLoading';
import { ProductSelecetState, fetchMineProduct } from '../../types/add-products';
import NoImg from '../../assets/NoImg.png'
import { BACK_END } from '../../clients/localStorage';
import { ProductTumbnail } from '../../components/products/Product-Tumbnail';


function ProductPicker(props : {state : ProductSelecetState , setState : React.Dispatch<SetStateAction<ProductSelecetState>>}) {
    const [response, setResponse] = useState<fetchMineProduct | null>(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const router = useRouter()
    const {state,setState} = props
  
    // fetch products
    useEffect(()=>{
      AuthorizedApiRequest
      .get(`/products/mine`)
      .then((res) => {
        if (res.data?.err) {
          setError(res.data?.err)
        }
        else {
  
          setResponse(res.data as fetchMineProduct);
          console.log(res.data)
        }
      })
      .catch((err) => {
        setError(err);
        router.replace('خطا در ارتباط با سرور')
      })
      .finally(() => {
        setloading(false);
      });
    
    },[])
    
  return (
    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/30  z-40 ' >
        
        {/* CENTER_DATA_PART */}
        <div className='fixed flex w-screen h-screen justify-center items-center'>
            <div dir='rtl' className='w-[380px]   min-w-[370px]  mx-auto h-[85vh] border-2 border-beh-gray  bg-white rounded-3xl overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
                <div>
                    <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                        <div>
                            <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                {/* شهر انتخاب شده */}
                                انتخاب محصول
                            </h1>
                        </div>

                        <div>
                            <h1 onClick={()=>props.setState({...props.state , isOpen : false})} className="pl-7 text-xl cursor-pointer font-bold text-beh-orange">
                                انصراف
                            </h1>
                        </div>

                    {/* </div>

                    <div className="my-2 h-[50px]"> */}
                    


                    </div>
                    
                    <div dir="ltr" className="w-full my-1 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray h-[69vh] ">
                        {loading && <ComponentLoading />}
                        {response && response.length > 0 && response?.map(elm =>(
                                <ProductTumbnail onClick={()=>{
                                    setState({...state , isOpen : false,selected : {City : {name : elm.city?.name} , freeDelivery : elm.freeDelivery , title : elm?.title , image : elm.image , id : elm?.id , price : elm.price}})
                                    
                                }} key={elm?.id} city={elm?.city?.name ? elm?.city?.name : undefined} freeDelivery={elm?.freeDelivery} imgSrc={`${BACK_END}${elm?.image}`} name={elm?.title} price={elm?.price}  />
                            )) 
                        }

                    </div>
                
                </div>
            </div>
        </div>
    </div>
    )
}




export default ProductPicker