import Image from 'next/image'
import React from 'react'
import icon from '../../assets/icon.png'

function KnowUs() {
  return (
    <div className="w-[95%] min-h-[400px] bg-orange-500 mr-auto ml-auto rounded-lg my-3 flex flex-wrap">



    <div className="w-64 md:w-1/3 mr-auto ml-auto  flex flex-wrap justify-center items-center">
        <div className='min-h-full mt-3 md:mt-0 flex items-center'>
          <div className="hover:scale-110 transition-all duration-150  ">
            <Image    width='250px' height='250px'  src={icon}  />
          </div>
        </div>
   
    </div>


    <div className="w-[40rem] mr-auto ml-auto md:w-2/3 h-full p-10">
        <h1 className="text-white font-bold text-4xl ">
          <span className="text-black">ما</span>
          <span> رو بشناس </span>
        </h1>
        <p className="text-white  text-lg leading-loose pt-2">
        به نید با تجربه 16 ساله افتخار همکاری با شرکت های بزرگ در حوزه ی موادغذایی ،شوینده ،بهداشتی و نوشیدنی را دارد.
 همچنین افتخار ارتباط با بیش از 4000 کسب و کار ، خریدار و فروشنده عمده در کارنامه خود را دارد و با بهره گیری بیش از 20 نیروی متخصص در راه کسب سود بیشتر برای عمده فروشان تلاش می کند  
اعتبار به نید همه ی این 4000 کسب وکاری است که به ما اعتماد داشته و خوش نامی ما را جار زده اند  
چرا که ما سابقه خاکستری در کارنامه خود نداریم و مهمترین اصل در کار ما رضایت شما فروشندگان و خریداران عمده است  
چرا به نید ؟  
بزرگترین موفقیت در هر کسب وکاری بودن در یک شبکه قدرتمند است که به نید با در اختیار داشتن یک شبکه قدرتمند 4000 نفره و تعامل درست با شرکت های عرضه کننده محصولات عمده، پایین ترین قیمت و بهترین کیفیت را به کاربران ارائه می دهد و به جرات مرجعی مطمئن برای استعلام قیمت هر محصول است و از طرفی با داشتن اطلاعات دقیق از خریداران آنی، سرعت فروش محصولات شما را به بالاترین حد ممکن می رساند

شما در به نید حجره ای دارید که هیچ هزینه ای برای فعالیت در آن پرداخت نمی کنید
        </p>
    </div>

      

    </div>
    )
}

export default KnowUs