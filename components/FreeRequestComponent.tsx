import React from 'react'
import { BACK_END } from '../clients/localStorage'

function FreeRequestComponent( props : {title : string , id : number , username : string , recive_location : string , date : string , describe : string , avatar : string | null}) {
  return (
    <div key={props.id} className=" hover:scale-105 transition-all duration-100 cursor-auto my-5 min-w-sm w-full max-w-7xl bg-white rounded-xl shadow-2xl gap-3 flex flex-col lg:flex-row p-2 ">
            {/* IMAGE_PART */}
            <div className="basis-2/12 flex justify-center">
              {props.avatar ? 
              <img src={`${BACK_END}${props.avatar}`} className="bg-beh-orange rounded-xl max-h-[180px] h-full w-[180px]" alt={`تصویر ${props.username} `} />
              :
              <div className="bg-beh-orange rounded-xl max-h-[180px] h-full w-[180px]" />
            }
            </div>

            {/* DESCRIBE_PART */}
            <div className="basis-9/12 flex flex-col gap-3  ">

              <div className="font-bold text-xl">
                <h1 className='px-5' >

                  <span className=' col-span-1 hover:cursor-pointer text-beh-orange'>
                   {props.username}
                  </span>

                  <span className=' col-span-1  '>
                    &nbsp;  از
                  </span>

                  <span className='col-span-1 text-beh-orange'>
                  &nbsp;  {props.recive_location ? props.recive_location : 'شهر نامشخص'}
                  </span>

                  <span className=' col-span-1  '>
                    &nbsp;  نیاز به 
                  </span>

                  <span className='col-span-1 text-beh-orange'>
                  &nbsp;  {props.title}
                  </span>

                  <span className=' col-span-1  '>
                    &nbsp;  دارد
                  </span>

                </h1>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 justify-between">
                <div className="basis h-full ">
                  <div>
                    <span className=' col-span-1 text-beh-gray-mid-ligth'>
                    &nbsp;  محل تحویل : &nbsp;
                    </span>

                    <span className=' col-span-1  hover:cursor-pointer  '>
                      {props.recive_location}
                    </span>
                  </div>


                  <div  className="pt-3">
                    <span className=' col-span-1  text-beh-gray-mid-ligth'>
                    &nbsp; تا تاریخ : &nbsp;
                    </span>

                    <span className=' col-span-1  '>
                      {props.date ?  props.date : 'نامشخص'}
                    </span>
                  </div>
                </div>

                <div className="basis px-5">
                  <h3 className="px-8 py-3 rounded-lg text-xl text-center text-white font-bold bg-beh-green-light cursor-pointer hover:">
                    شروع گفت و گو
                  </h3>
                </div>

              </div>


              <div>
                <h1>
                  <span className=' col-span-1  text-beh-gray-mid-ligth'>
                    توضیحات : &nbsp;
                  </span>
                  {props.describe}
                </h1>
              </div>

            </div>

            {/* OFFER_PART */}
            <div className="basis-1/12">

            </div>

          </div>
    )
}

export default FreeRequestComponent