import React from 'react'
import { LoadingGes, LoadingEco, LoadingP21 } from './iconos'

const Loading = props => {
  const { site } = props
  const sitesLoad = ['gestion', 'elcomercio', 'peru21']
  return (
    <>
      {sitesLoad.includes(site) ? (
        <div className="load__loader">
          <div className="load__cont-loader">
            {
              {
                gestion: (
                  <>
                    <LoadingGes />
                    <LoadingGes />
                    <LoadingGes />
                  </>
                ),
                elcomercio: (
                  <>
                    <LoadingEco />
                    <LoadingEco />
                    <LoadingEco />
                  </>
                ),
                peru21: (
                  <>
                    <LoadingP21 />
                    <LoadingP21 />
                    <LoadingP21 />
                  </>
                ),
              }[site]
            }
          </div>
        </div>
      ) : (
        'Cargando...'
      )}
    </>
  )
}

export default Loading
