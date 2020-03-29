import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getAssetsPath } from '../../../../../utilities/assets'

export default () => {
  const { arcSite, contextPath } = useFusionContext()

  return (
    <footer className="st-foot f">
      <a href="/" className="st-foot__img-l st-foot__box">
        <img
          className="st-foot__img"
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/elcomercio/images/logo.png`}
          alt="elcomercio.pe"
        />
      </a>
      <div className="st-foot__box f just-center f-col">
        <div>Director General:</div>
        <div className="st-foot__b">Francisco Miró Quesada Cantuarias</div>
        <div>Director periodístico:</div>
        <div className="st-foot__b">Juan José Garrido Koechlin</div>
      </div>
      <div className="st-foot__md-cont st-foot__box f just-center f-col pos-rel">
        <a href="/terminos-y-condiciones/">Términos y condiciones de uso</a>
        <a href="/politicas-privacidad/">Políticas de Privacidad</a>
        <a href="/politica-de-cookies/">Politicas de Cookies</a>
      </div>
      <div className="st-foot__box f just-center f-col">
        <div>Empresa Editora El Comercio</div>
        <div>Jr. Santa Rosa #300 Lima 1 Perú</div>
        <div>Copyright © Elcomercio.pe</div>
        <div>Grupo El Comercio - Todos los derechos reservados</div>
      </div>
    </footer>
  )
}
