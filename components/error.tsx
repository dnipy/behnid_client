import React from 'react'

export const ErrorComponent = (props : {details : string})=> {
  return (
    <div className=" w-3/5  ml-auto mr-auto sm:m-0 sm:w-1/3  text-center z-20  fixed bottom-5 right-5 ">

      <div role="alert w-100 md:w-1/2 shadow-xl">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              خطا
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{props.details}</p>
          </div>
      </div>

    </div>
  )
}

