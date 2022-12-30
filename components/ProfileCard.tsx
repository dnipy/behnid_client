import React from 'react'

function ProfileCard(props : {title : string , describe : string , link : string}) {
  return (
    <div className="flex justify-center w-64 mx-auto hover:scale-110 transition-all duration-200 cursor-pointer">
    <div className="block rounded-lg mx-5 my-5 shadow-xl bg-white max-w-sm text-center">
      
      <div className="p-6">
        <h5 className="text-gray-900 text-xl font-medium mb-2">{props.title}</h5>
        <p className="text-gray-700 text-base mb-4">
            {props.describe}
        </p>
        <a type="button" href={props.link} className=" inline-block w-full px-6 py-2.5 bg-orange-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">مشاهده</a>
      </div>

    </div>
  </div>
    )
}

export default ProfileCard