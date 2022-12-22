import React from 'react'
import { Audio } from 'react-loader-spinner'

export function LoadingComponent() {
  return (

    <div className="flex h-screen  justify-center items-center">
        <Audio color='#fb923c' />
    </div>

    )
}
