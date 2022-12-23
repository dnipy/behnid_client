import React from 'react'

function AddComment() {
  return (
    <div className="flex  items-center justify-center h-64 shadow-lg  mx-8 my-10">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <h2 dir='rtl' className="px-3 pt-3 pb-2 text-gray-800  text-right text-lg">افزودن نظر</h2>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea className="bg-gray-50 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" dir='rtl' placeholder='نظر شما ...؟' required></textarea>
                </div>
                <div dir='rtl' className="w-full md:w-full flex items-start  pt-3 px-3">

                     <div className="-ml-1">
                        <input type='submit' className="bg-orange-500 text-white font-medium py-1 px-4 border  rounded-lg tracking-wide mr-1 hover:bg-orange-500" value='ثبت نظر'/>
                    </div>
                    <div className="flex items-end w-1/2 text-gray-700 pt-2 px-2 mr-auto">
                        <p className="text-xs md:text-sm pt-px">نظر شما قابل تغییر نمیباشد</p>
                        <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddComment