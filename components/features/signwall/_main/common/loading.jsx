import React from 'react'
import { LoadingGes } from './iconos'

const Loading = props => {
  const { site } = props
  return (
    <>
      {site === 'gestion' ? (
        <div className="profile__loader">
          <div className="profile__cont-loader">
            <LoadingGes />
            <LoadingGes />
            <LoadingGes />
          </div>
        </div>
      ) : (
        'Cargando...'
      )}
    </>
  )
}

export default Loading
