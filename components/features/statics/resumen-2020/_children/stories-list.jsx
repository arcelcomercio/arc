import * as React from 'react'

import Story from './story'
import { loadNextPageScript } from '../_dependencies/scripts'

/**
 * @todo - El listado deberia tener la barra de carga al final que se activa justo
 * antes de redirigir al siguiente mes. Si se llega al final de diciembre, no se
 * carga la barra ni hace redireccion.
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_stories-list.scss
 */
const StaticsResumen2020StoriesList = ({ requestUri, content }) => {
  const [, month = ''] = requestUri.match(/^\/resumen-2020\/(\w{4,10})\//) || []

  const { historias: storiesList = [] } = content[month] || {}

  return (
    <main className="st-list">
      {/* 
        map
        seria bueno que cada nota tuviera un ID unico simple en el JSON para el atributo KEY 
      */}
      {storiesList.map(
        ({
          url = '',
          fecha = '',
          titulo = '',
          descripcion = '',
          imagen: { url: imgUrl = '', caption = '' } = {},
        }) => (
          <Story
            key={titulo}
            url={url}
            date={fecha}
            title={titulo}
            subtitle={descripcion}
            imgUrl={imgUrl}
            caption={caption}
          />
        )
      )}

      {month !== 'diciembre' && (
        <>
          <div className="st-list__bar-cont">
            <div className="st-list__bar">
              <div className="st-list__progress" />
            </div>
          </div>

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: loadNextPageScript(month),
            }}
          />
        </>
      )}
    </main>
  )
}

export default StaticsResumen2020StoriesList
