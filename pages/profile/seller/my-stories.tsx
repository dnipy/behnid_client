import { NextPage } from "next";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../../../clients/axios";
import ErrorComponent from "../../../components/alerts/error";
import { LoadingComponent } from "../../../components/loading";
import { MiniProduct, MyMiniProduct } from "../../../components/products/mini-product";
import { fetchMineProduct } from "../../../types/add-products";
import { City, Product, Profile, User, sellerProfile, stories } from "../../../types/async-prisma-types";
import { ProductTumbnail } from "../../../components/products/Product-Tumbnail";
import { BACK_END } from "../../../clients/localStorage";
import { FiDelete } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import ComponentLoading from "../../../components/componentLoading";
import { BiError, BiRefresh } from "react-icons/bi";
import { NextSeo } from "next-seo";


type AllStoriesResponseType = (User & {
    profile: Profile | null;
    sellerProfile: (sellerProfile & {
        stories: (stories & {
            product: (Product & {
                city: City | null;
            }) | null;
        })[];
    }) | null;
}) | null
  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<AllStoriesResponseType | null>(null);
  const [error, setError] = useState('');
  const [Succes, setSucces] = useState('');
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    AuthorizedApiRequest
    .get(`/sellers/all-stories`)
    .then((res) => {
      if (res.data?.err) {
        setError(res.data?.err)
      }
      else {

        setResponse(res.data as AllStoriesResponseType);
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


    const DeleteStory = (id : number)=>{
        AuthorizedApiRequest
        .post(`/sellers/delete-story`,{id : id})
        .then((res) => {
          if (res.data?.err) {
            setError(res.data?.err)
          }
          else {
            setSucces('موفق')

          }
        })
        .catch((err) => {
          setError(err);
          router.replace('خطا در ارتباط با سرور')
        })
        .finally(() => {
          setloading(false);
        });
    }



  return (
    <>
      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  message={error} handle={setError}/> : null}

    <main className="flex justify-center">

      <div className="w-1/1 z-[2] md:w-3/4 my-10 p-3">

 

          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
            {loading == false && response?.sellerProfile?.stories ? response?.sellerProfile?.stories?.reverse().map((elm )=>(
                <StorySingle allStories={response} setAllStories={setResponse} id={elm.id} productID={elm.productID} key={elm.id} text={elm?.text} image={`${BACK_END}/${elm?.imgSrc}`} product={{city : elm?.product?.city?.name ? elm?.product?.city?.name : 'نامشخص' , freeDelivery : elm?.product?.freeDelivery ? elm?.product?.freeDelivery : false , price : elm.product?.price ? elm.product.price : 'نامشخص' , name : elm?.product?.title ? elm.product.title : 'نامشخص' , imgSrc : elm?.product?.image ? elm.product.image : ''}} />
            )) : null}

          </div>

        
      </div>
    </main>
  </>
  )
}  


const StorySingle = (props : { id : number , allStories : AllStoriesResponseType , setAllStories : React.Dispatch<SetStateAction<AllStoriesResponseType>> , productID : number | null ,text : string , product : {city : string , freeDelivery : boolean , imgSrc : string | null , name : string , price : string | number} ,image?:string})=>{
    const router = useRouter()
 
    const [error, setError] = useState('');
    const [Succes, setSucces] = useState('');
    const [loading, setloading] = useState(false);
   
   
    const { product , text , image , productID , allStories ,setAllStories } = props
   
    const DeleteStory = (id : number)=>{
        setError('')
        setloading(true)
        AuthorizedApiRequest
        .post(`/sellers/delete-story`,{id : id})
        .then((res) => {
          if (res.data?.err) {
            setError(res.data?.err)
          }
          else {
            setSucces('موفق')
            const newStories = allStories?.sellerProfile?.stories
            newStories?.splice(newStories?.findIndex(e => e.id === id),1)
            setAllStories({
              ...allStories! , 
              sellerProfile : {
                ...allStories?.sellerProfile!,
                stories : newStories!.reverse()
            }})
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    }


    return (
      <>
      <NextSeo
        title="داستان های من"
      />
        <div   style={{backgroundImage : `url(${image ? image : null})` , backgroundRepeat : 'no-repeat', backgroundSize : 'cover' , backgroundPosition : 'center'}} className="w-[300px] order-2 m-5   h-[600px] bg-beh-text-gray">
            <div className="relative">
                <div className="absolute w-full h-[600px] flex justify-center items-center bg-beh-gray/40 hover:backdrop-blur-sm z-20">
                    {
                     loading 
                     ? 
                        <ComponentLoading />
                     :
                        <>
                        {
                            error ? 
                            <BiRefresh onClick={()=>DeleteStory(props.id)} className="fill-white w-14 h-14 hover:bg-beh-gray/50 bg-beh-gray/60 cursor-pointer p-2 rounded-full" />
                            
                            :
                            <MdDeleteForever onClick={()=>DeleteStory(props.id)} className="fill-white w-14 h-14 hover:bg-beh-gray/50 bg-beh-gray/60 cursor-pointer p-2 rounded-full" />
                        }
                        </>
                    }
                    
                </div>
            </div>
        <div className="mt-32 w-[90%] text-white text-center bg-beh-gray-dark/60 mx-auto rounded-md ">
            {text}
        </div>

        {
        productID &&
            <div className="my-32 w-[90%] mx-auto ">
                    { <ProductTumbnail width={220} city={product.city} freeDelivery={product.freeDelivery} imgSrc={`${BACK_END}${product.imgSrc}`} name={ product.name} price={product.price} /> }  
            </div>
        }

    </div>
    </>

    )
}

export default Page