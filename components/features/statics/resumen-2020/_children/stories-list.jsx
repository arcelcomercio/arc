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

      {month === 'diciembre' && (
        <div className="st-list__footer">
          <svg
            className="st-list__footer-gec"
            xmlns="http://www.w3.org/2000/svg"
            width="36.175"
            height="36.175"
            viewBox="0 0 36.175 36.175">
            <title>Logo Grupo El Comercio</title>
            <g transform="translate(344.488 -203.631)">
              <path
                d="M-326.4,239.806a18.087,18.087,0,0,0,18.087-18.088A18.087,18.087,0,0,0-326.4,203.631a18.087,18.087,0,0,0-18.088,18.088A18.088,18.088,0,0,0-326.4,239.806"
                fill="#fff"
              />
              <g transform="translate(-339.288 217.265)">
                <path
                  d="M-336.394,229.346a4.315,4.315,0,0,1,1.295-3.217,4.315,4.315,0,0,1,3.244-1.225,4.518,4.518,0,0,1,2.275.569l.629-.629h.145v3.062H-329c-.859-1.731-1.634-2.771-2.929-2.771-1.247,0-2.251,1.343-2.251,4.187s1.017,4.2,2.336,4.2a2.026,2.026,0,0,0,1.271-.363v-2.747c0-.424-.278-.63-1.283-.666v-.157h4.1v.157c-.666.036-.9.157-.9.654v2.481a6.828,6.828,0,0,1-3.4.872,4.1,4.1,0,0,1-3.172-1.216A4.1,4.1,0,0,1-336.394,229.346Z"
                  transform="translate(336.394 -224.844)"
                  fill="#0a0a0b"
                />
                <path
                  d="M-322.216,233.524c.98-.036,1.21-.193,1.21-.617v-6.862c0-.424-.23-.593-1.21-.629v-.157h7.4l.036,2.989-.193.024c-.956-2.009-1.355-2.808-2.881-2.808h-1.113v3.752h.4c.956,0,1.537-.448,1.864-1.634h.157v3.5h-.157c-.326-1.2-.908-1.658-1.864-1.658h-.4v4.054h1.029c1.8,0,2.3-.726,3.279-2.966l.194.024-.06,3.159h-7.686Z"
                  transform="translate(331.328 -224.992)"
                  fill="#0a0a0b"
                />
                <path
                  d="M-308.508,229.491a4.414,4.414,0,0,1,1.289-3.3,4.414,4.414,0,0,1,3.3-1.29,4.757,4.757,0,0,1,2.263.569l.569-.629h.145v3.3h-.194c-.859-1.852-1.585-3.013-2.989-3.013-1.331,0-2.166,1.5-2.166,4.066,0,2.651,1.137,4.042,2.687,4.042a2.752,2.752,0,0,0,2.711-1.9l.23.109a3.635,3.635,0,0,1-3.631,2.3,3.888,3.888,0,0,1-3.106-1.139A3.888,3.888,0,0,1-308.508,229.491Z"
                  transform="translate(326.431 -224.844)"
                  fill="#0a0a0b"
                />
              </g>
            </g>
          </svg>
          <div className="st-list__footer-text">Producción y realización:</div>
          <div className="st-list__footer-line"></div>
          <div className="st-list__footer-title">
            <div>Núcleo Editorial GEC</div>
            <div>Archivo El Comercio</div>
          </div>
        </div>
      )}
    </main>
  )
}

export default StaticsResumen2020StoriesList
