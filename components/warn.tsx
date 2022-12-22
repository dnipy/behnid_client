import React from 'react'

export const WarnComponent = (props : {details : string})=> {
  return (
    <div role="alert max-w-sm">
        <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
            خطا!!!
        </div>
        <div className="border border-t-0 border-blue-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{props.details}</p>
        </div>
    </div>
  )
}

