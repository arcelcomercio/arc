import React from 'react'
import { useAppContext } from 'fusion:context'
import { getAssetsPath } from '../../../utilities/assets'
import customFields from './_dependencies/custom-fields'
import getFooterProperties from '../_dependencies/properties'

const classes = {
  footer: 'st-foot f f-center',
  logoBox: 'st-foot__img-box',
  logo: 'st-foot__img',
  content: 'st-foot__content f oflow-h',
  block: 'st-foot__block f f-col',
  link: 'st-foot__link',
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
          )}/resources/dist/elcomercio/images/logo.png?d=1`}
          loading="lazy"
          decoding="async"
          alt={`Logo de ${arcSite}`}
        />
      </a>
      <div className={classes.content}>
        {directorsObject && (
          <div className={classes.block}>
            {Object.keys(directorsObject).map(person => (
              <p>
                {person}:<br />
                <strong>{directorsObject[person]}</strong>
              </p>
            ))}
          </div>
        )}
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
    </footer>
  )
}

FooterStory.label = 'Pié de página - Noticia'
FooterStory.static = true

FooterStory.propTypes = {
  customFields,
}

export default FooterStory
