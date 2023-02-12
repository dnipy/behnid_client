import React from 'react'
import { Audio } from 'react-loader-spinner'

export function LoadingComponent() {
  return (

    <div className='fixed w-screen h-screen backdrop-blur-sm bg-white/20 z-40 ' >
      <div className="flex h-screen  justify-center items-center">
          <Audio color='#fb923c' />
      </div>
    </div>

    )
}
