import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getAssetsPath } from '../../../utilities/assets'

const classes = {
  footer: 'st-foot f',
  logoBox: 'st-foot__img-box',
  logo: 'st-foot__img',
  text: 'st-foot__text f oflow-h',
  link: 'st-foot__link',
}

const FooterStory = () => {
  const { arcSite, contextPath } = useFusionContext()

  return (
    <footer className={classes.footer}>
      <a itemProp="url" href="/" title="Portada" className={classes.logoBox}>
        <img
          className={classes.logo}
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/elcomercio/images/logo.png?d=1`}
          alt={`Logo de ${arcSite}`}
        />
      </a>
      <div className={classes.text}>
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
        <a itemProp="url" className={classes.link} href="/politica-de-cookies/">
          Politicas de Cookies
        </a>
      </div>
    </footer>
  )
}

FooterStory.label = 'Pié de página - Noticia'
FooterStory.static = true

export default FooterStory
