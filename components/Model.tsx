import React from 'react'

export function Model( props : {text : string , click : ()=>void}) {
  return (
      <div className='z-50 w-screen h-screen fixed flex justify-center items-center bg-gray-50 opacity-90 '>

    <div id="small-modal"  className=" overflow-y-auto overflow-x-hidden  top-0 right-0 left-0  p-4   md:inset-0 h-modal md:h-full">
    <div className="relative w-full max-w-md  md:h-auto shadow-lg">

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
       
            <div dir='rtl' className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    مشاهده
                </h3>
                <button type="button" onClick={props.click} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="small-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
           
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-right text-gray-500 dark:text-gray-400">
                    {props.text}
                </p>

            </div>

            <div dir='rtl' className="flex justify-between items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button onClick={props.click} data-modal-toggle="small-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mx-1   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">تایید</button>
            </div>
        </div>
    </div>
</div>
      </div>
  )
}

