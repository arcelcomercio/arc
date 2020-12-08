import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
} from '../../../utilities/constants/sitenames'

import getFooterProperties from '../_dependencies/properties'
import customFields from './_dependencies/custom-fields'
import { toggleFooterInfo } from './_dependencies/scripts'
import StoryNavigationChild from './_children/navigation'

const classes = {
  footer: 'st-foot f f-center',
  logoBox: 'st-foot__img-box',
  logo: 'st-foot__img',
  content: 'st-foot__content f oflow-h',
  block: 'st-foot__block f f-col',
  link: 'st-foot__link',
  copyr: 'st-foot__copyr',
  showMore: 'st-foot__showmore',
}

const FooterStory = props => {
  const {
    customFields: { directors },
  } = props
  const { arcSite, contextPath } = useAppContext()

  const {
    footer: { siteLegal = [] } = {},
    lite: { directors: defaultDirectors = {} } = {},
  } = getFooterProperties(arcSite)

  const {
    assets: { header },
  } = getProperties(arcSite)

  // Directores desde custom fields o directores por defecto
  const directorsObject = directors || defaultDirectors

  const isMag = arcSite === SITE_ELCOMERCIOMAG
  const isElcomercio = arcSite === SITE_ELCOMERCIO

  return (
    <>
      <footer className={classes.footer}>
        <a itemProp="url" href="/" title="Portada" className={classes.logoBox}>
          <img
            className={classes.logo}
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/${header.logo}?d=1`}
            loading="lazy"
            decoding="async"
            alt={`Logo de ${arcSite}`}
          />
        </a>
        {isMag ? (
          <label htmlFor="toggle_showmore" className={classes.showMore}>
            Ver más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 284.9 284.9">
              <path d="M282.1 76.5l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9 -2.5 0-4.7 1-6.6 2.9L142.5 174.4 30.3 62.2c-1.9-1.9-4.1-2.9-6.6-2.9 -2.5 0-4.7 1-6.6 2.9L2.9 76.5C1 78.4 0 80.6 0 83.1c0 2.5 1 4.7 2.9 6.6l133 133c1.9 1.9 4.1 2.9 6.6 2.9s4.7-1 6.6-2.9L282.1 89.6c1.9-1.9 2.8-4.1 2.8-6.6C284.9 80.6 284 78.4 282.1 76.5z" />
            </svg>
            <input type="checkbox" id="toggle_showmore"></input>
          </label>
        ) : null}
        <div className={classes.content}>
          {directorsObject && isElcomercio ? (
            <div className={classes.block}>
              {Object.keys(directorsObject).map(person => (
                <p>
                  {person}:<br />
                  <strong>{directorsObject[person]}</strong>
                </p>
              ))}
            </div>
          ) : null}
          {isMag ? <StoryNavigationChild /> : null}
          <div className={classes.block}>
            <a
              itemProp="url"
              className={classes.link}
              href="/terminos-y-condiciones/">
              Términos y condiciones de uso
            </a>
            <a
              itemProp="url"
              className={classes.link}
              href="/politicas-privacidad/">
              Políticas de Privacidad
            </a>
            <a
              itemProp="url"
              className={classes.link}
              href="/politica-de-cookies/">
              Politicas de Cookies
            </a>
          </div>
          <div className={classes.block}>
            {siteLegal.map(legalLine => (
              <p>{legalLine || ''}</p>
            ))}
          </div>
        </div>
        {isMag ? (
          <div className={classes.copyr}>Todos los derechos reservados</div>
        ) : null}
      </footer>
      {isMag ? (
        <script dangerouslySetInnerHTML={{ __html: toggleFooterInfo }}></script>
      ) : null}
    </>
  )
}

FooterStory.label = 'Pié de página - Noticia'
FooterStory.static = true

FooterStory.propTypes = {
  customFields,
}

export default FooterStory
