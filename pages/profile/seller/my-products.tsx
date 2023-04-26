import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { Audio } from "react-loader-spinner";
import { ApiRequest, AuthorizedApiRequest } from "../../../clients/axios";
import { BACK_END } from "../../../clients/localStorage";
import ErrorComponent from "../../../components/alerts/error";
import Footer from "../../../components/footer";
import { LoadingComponent } from "../../../components/loading";
import Navbar_v2 from "../../../components/Navbar_v2";
import { MiniProduct, MyMiniProduct } from "../../../components/products/mini-product";
import { City, Product, Profile, User, sellerProfile } from "../../../types/async-prisma-types";
import { fetchMineProduct } from "../../../types/add-products";
import { NextSeo } from "next-seo";



  
const Page : NextPage = ()  => {
  const router = useRouter()
 
  const [response, setResponse] = useState<fetchMineProduct | null>(null);
  const [error, setError] = useState('');
  const [Succes, setSucces] = useState('');
  const [loading, setloading] = useState(true);


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


    const NotShowProduct = (id : number)=>{
        AuthorizedApiRequest
        .post(`/products/update-to-not-show`,{id : id})
        .then((res) => {
          if (res.data?.err) {
            setError(res.data?.err)
          }
          else {
            setSucces('موفق')
            const update = response?.map(elm=>{
                if (elm.id == id){
                    elm.isShown = false
                }
                return elm
            })

            update && setResponse(update)
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

    const ShowProduct = (id : number)=>{
        AuthorizedApiRequest
        .post(`/products/update-to-show`,{id : id})
        .then((res) => {
          if (res.data?.err) {
            setError(res.data?.err)
          }
          else {
            setSucces('موفق')
            const update = response?.map(elm=>{
                if (elm.id == id){
                    elm.isShown = true
                }
                return elm
            })

            update && setResponse(update)
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
      <NextSeo
        title="محصولات من"
      />
      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  message={error} handle={setError}/> : null}

    <main className="flex justify-center">

      <div className="w-1/1 z-[2] md:w-3/4 my-10 p-3">

 

          <div dir="rtl" className="flex flex-wrap justify-center gap-x-1 gap-y-2">
                        
          {loading == false ? response?.map((elm )=>(
            <MyMiniProduct  NotShow={NotShowProduct}  Show={ShowProduct} isShown={elm?.isShown} AuthorId={elm?.authorID} id={elm?.id} key={elm?.id} image={elm?.image} freeDelivery={elm?.freeDelivery} unitName={elm?.unitName ? elm?.unitName : ''} sendFrom={elm?.city?.name ? elm?.city?.name : ''} minOrder={elm?.minOrder} pricePerUnit={elm?.price} responseTime={'1'} DeliveryTime={elm?.deliveryTime}  avatar={elm?.author?.user?.avatar} name={elm?.author?.user?.profile?.name!} title={elm?.title}  />
          )) : null}
          {response?.length == 0 && <h1 className="text-center">محصولی موجود نیست</h1>}

          </div>

        
      </div>
    </main>
  </>
  )
}  

export default Page