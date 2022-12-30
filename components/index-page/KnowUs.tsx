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
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </p>
    </div>

      

    </div>
    )
}

export default KnowUs