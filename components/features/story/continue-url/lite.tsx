import React from 'react'
import { FC } from 'types/features'

import customFields from './_dependencies/custom-fields'
import { storyContinueUrlScript } from './_dependencies/scripts'

interface FeatLiteProps {
  customFields?: {
    title?: string
    url?: string
  }
}
const StoryContinueUrlLite: FC<FeatLiteProps> = (props) => {
  const { customFields: { url = '/', title = '' } = {} } = props

  return (
    <>
      <div className="st-continue__progress-box f pos-rel">
        <div className="st-continue__progress" />
        <span className="st-continue__subtitle pos-abs">
          CARGANDO SIGUIENTE...
        </span>
        <svg
          role="button"
          className="st-continue__close pos-abs"
          width="20"
          height="20"
          viewBox="0 0 46 46">
          <title>Cancelar carga de siguiente noticia</title>
          <path d="M23 3C11.9 3 2.9 12 2.9 23.1 2.9 34.2 11.9 43.2 23 43.2 34.1 43.2 43.1 34.2 43.1 23.1 43.1 12 34.1 3 23 3ZM32.7 29.9C32.9 30 32.9 30.2 32.9 30.4 32.9 30.6 32.9 30.8 32.7 30.9L30.8 32.8C30.6 33 30.5 33 30.3 33 30.1 33 29.9 33 29.8 32.8L23 26 16.2 32.8C16.1 33 15.9 33 15.7 33 15.5 33 15.4 33 15.2 32.8L13.3 30.9C13.1 30.8 13.1 30.6 13.1 30.4 13.1 30.2 13.1 30 13.3 29.9L20.1 23.1 13.3 16.3C13 16 13 15.6 13.3 15.3L15.2 13.4C15.3 13.2 15.5 13.1 15.7 13.1 15.9 13.1 16.1 13.2 16.2 13.4L23 20.1 29.8 13.4C29.9 13.2 30.1 13.1 30.3 13.1 30.5 13.1 30.7 13.2 30.8 13.4L32.8 15.3C33 15.6 33 16 32.8 16.3L25.9 23.1ZM32.7 29.9" />
        </svg>
      </div>
      <a itemProp="url" href={url} className="st-continue">
        <h3 itemProp="name" className="st-continue__title oflow-h">
          {title || 'Siguiente noticia'}
        </h3>
      </a>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: storyContinueUrlScript(url),
        }}
      />
    </>
  )
}

StoryContinueUrlLite.propTypes = {
  customFields,
}

StoryContinueUrlLite.static = true
export default StoryContinueUrlLite
