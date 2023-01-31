import React from 'react'

function FreeRequestComponent() {
  return (
    <div className=" my-5 min-w-sm max-w-7xl bg-white rounded-xl shadow-2xl gap-3 flex flex-row p-2 ">
            {/* IMAGE_PART */}
            <div className="basis-2/12">
              <div className="bg-beh-orange rounded-xl max-h-[180px] h-full w-[180px]" />
            </div>

            {/* DESCRIBE_PART */}
            <div className="basis-9/12 flex flex-col gap-3  ">

              <div className="font-bold text-xl">
                <h1 >

                  <span className=' col-span-1 hover:cursor-pointer text-beh-orange'>
                  &nbsp;  محمود احمدی نژاد
                  </span>

                  <span className=' col-span-1  '>
                    &nbsp;  نیاز به 
                  </span>

                  <span className='col-span-1 text-beh-orange'>
                  &nbsp;  سه تن رب
                  </span>

                  <span className=' col-span-1  '>
                    &nbsp;  دارد
                  </span>

                </h1>
              </div>

              <div className="flex flex-row gap-2 justify-between">
                <div className="basis h-full ">
                  <div>
                    <span className=' col-span-1 hover:cursor-pointer text-beh-gray-mid-ligth'>
                    &nbsp;  محل تحویل : &nbsp;
                    </span>

                    <span className=' col-span-1  '>
                      کرج
                    </span>
                  </div>


                  <div  className="pt-3">
                    <span className=' col-span-1 hover:cursor-pointer text-beh-gray-mid-ligth'>
                    &nbsp; تا تاریخ  &nbsp;
                    </span>

                    <span className=' col-span-1  '>
                      23 / 10 /1402
                    </span>
                  </div>
                </div>

                <div className="basis">
                  <h3 className="px-12 py-3 rounded-lg text-xl text-center text-white font-bold bg-beh-green-light cursor-pointer hover:">
                    شروع گفت و گو
                  </h3>
                </div>

              </div>


              <div>
                <h1>
                  <span className=' col-span-1  text-beh-gray-mid-ligth'>
                    &nbsp;  توضیحات : &nbsp;
                  </span>
                  چندین خط توضیحات مفید و مختصر جهت روشن کردن خواسته خود برای فروشندگان
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