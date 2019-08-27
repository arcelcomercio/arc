import React from 'react'
import { LoadingGes } from './iconos'

const Loading = () => {
  return (
    <div className="profile__loader">
      <div className="profile__cont-loader">
        <LoadingGes />
        <LoadingGes />
        <LoadingGes />
      </div>
    </div>
  )
}

export default Loading
