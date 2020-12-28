import * as React from 'react'

import Story from './story'
import { loadNextPageScript } from '../_dependencies/scripts'

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_stories-list.scss
 */
const StaticsResumen2020StoriesList = ({ content, month }) => {
  const { historias: storiesList = [] } = content[month] || {}
  return (
    <main className="st-list">
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
