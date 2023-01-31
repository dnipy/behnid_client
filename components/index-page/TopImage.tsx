import React from 'react'
import IndexImg from "../../assets/IndexImg.png"



function TopImage() {
  return (
    <div className="flex justify-center items-center " style={{backgroundImage : `url(${IndexImg.src})` ,width : "100%" , height : "461px" }}>
              {/* <Image src={IndexImg} /> */}
              <div className="bg-black w-2/3 min-h-[30%] sm:min-h-[20%]  opacity-60 ">
              </div>
              <div className="text-center absolute text-beh-orange cursor-pointer text-4xl pb-2 w-2/3  font-bold">
                <h1>
                  <span className="text-white px-2">
                  اینجا
                  </span>

                  <span>
                    عمده بخر
                  </span>

                  <span className="text-white px-1">
                  ؛  اینجا  
                  </span>

                  <span>
                  عمده بفروش
                  </span>
                 
                </h1>
               </div>

    </div>
  )
}

export default TopImage