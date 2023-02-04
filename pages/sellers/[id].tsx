import Image from "next/image"
import { useRouter } from "next/router"
import SellerBack from "../../assets/SellerBack.png"
import { MiniProduct } from "../../components/products/mini-product"


export default function SingleSeller () {
  const router = useRouter()
  

  return (
    <main dir="rtl" className="flex justify-center bg-white ">
        <div className="w-full lg:max-w-7xl absolute z-[5]">
            <div className="flex justify-center items-center rounded-b-[150px] md:rounded-b-[200px] " style={{backgroundImage : `url(${SellerBack.src})` ,width : "100%" , height : "250px" }}></div>
        </div>
        <div className="w-full lg:max-w-7xl absolute z-[6] ">
            <div className="flex justify-center items-center rounded-b-[150px] md:rounded-b-[200px] w-full h-[251px] bg-beh-gray-dark/70 z-10 " ></div>
        </div>

        <div className="w-full lg:max-w-7xl  z-[7] ">
            <div className="text-center rounded-b-[200px] w-full mt-10 " >
              <h1 className="text-beh-orange text-3xl font-bold">
                فروشگاه ممدرضا شایع
              </h1>

              <div className="flex  flex-row gap-5 flex-wrap" >

                  <div className="w-[310px]  p-[10px] mx-auto mt-10 flex justify-center" >
                    <div className="">

                      <img src={SellerBack.src} className='w-[280px] h-[280px] mx-auto' alt=""  />
                      
                      <div className="w-[280] mx-auto h-[90px] flex flex-row">
                        <div className="w-[90px] h-[90px] p-2 flex justify-center items-center">
                            <img src={SellerBack.src} className='w-full h-full rounded-full' alt="person-image" />
                        </div>
                        <div className="w-[190px] text-right px-2 my-auto">
                            <h1 className="font-bold text-xl">صاحب فروشگاه </h1>
                            <h1 className="font-bold text-lg text-beh-orange cursor-pointer">دانیال رحمانی</h1>
                        </div>
                      </div>

                    </div>
                  </div>



                  <div className="w-full md:w-[68%] mt-10   p-[10px] mx-auto  " >
                    <div className="w-full">
                      <div className="w-full flex gap-4 flex-row flex-wrap">
                          <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1  mx-auto border-4 border-beh-orange "></div>
                          <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1 mx-auto border-4 border-beh-orange  mt-10"></div>
                          <div className="shadow-lg w-[160px] h-[160px] bg-beh-gray my-1 mx-auto border-4 border-beh-orange "></div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="px-5 py-3 text-beh-gray-dark font-bold text-right">
                          <h1 className="text-beh-orange text-xl">
                              توضیحات فروشنده
                          </h1>
                          <h5>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius itaque, velit iure corrupti, laudantium facere aspernatur voluptatum aperiam asperiores voluptatibus ratione animi eum tempora! Quam dolorem amet aut vel ut!
                          </h5>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="bg-beh-bg py-1">

                <div className="flex h-[80px] my-5">
                  <div className="w-3/4 h-[40px] border-b-[3px] border-gray-300">
                    <h1 className="text-2xl text-orange-500 pr-2 font-bold ">محصولات</h1>
                  </div>
                  <div className="w-1/3">
                    {/* 1/3 */}
                  </div>
                </div>
 


                <div dir="rtl" className="flex flex-wrap justify-center  gap-x-5 gap-y-6 ">
                {/* {loading == false ? response.map((elm :any)=>(
                  <MiniProduct  />
                )) : null} */}
                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />

                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />

                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />
                <MiniProduct avatar={null} name={null} />
            </div>

            <div className="inline-flex justify-center items-center w-full mt-4">
                <hr className="my-8 w-full h-1 bg-gray-300 rounded border-0 ssss:bg-gray-700"/>
                    
                        <div onClick={()=>router.replace('/products')} className="absolute left-1/2 px-4 bg-white border-2 border-beh-orange hover:rounded-full transition-all duration-100 hover:duration-300 hover:text-orange-500  -translate-x-1/2 ssss:bg-gray-900 cursor-pointer">
                          <div className='px-5 py-[0.4rem] '>
                                نمایش بیشتر ...
                            </div>
                        </div>
             </div>
            </div>
        </div>

      </main>
  )
}