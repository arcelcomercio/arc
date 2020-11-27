import React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../utilities/assets'
import customFields from './_dependencies/custom-fields'
import getFooterProperties from '../_dependencies/properties'
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
  showMoreSvg: 'st-foot__showmore__svg',
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

  return (
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
      {arcSite === 'elcomerciomag' && (
        <label htmlFor="toggle_showmore" className={classes.showMore}>
          Ver más
          <input type="checkbox" id="toggle_showmore"></input>
        </label>
      )}
      <div className={classes.content}>
        {directorsObject && arcSite === 'elcomercio' && (
          <div className={classes.block}>
            {Object.keys(directorsObject).map(person => (
              <p>
                {person}:<br />
                <strong>{directorsObject[person]}</strong>
              </p>
            ))}
          </div>
        )}
        {arcSite === 'elcomerciomag' && <StoryNavigationChild />}
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
      {arcSite === 'elcomerciomag' && (
        <div className={classes.copyr}>Todos los derechos reservados</div>
      )}
    </footer>
  )
}

FooterStory.label = 'Pié de página - Noticia'
FooterStory.static = true

FooterStory.propTypes = {
  customFields,
}

export default FooterStory
