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

  /* 
    requestIdle(function() {
      document.getElementById('toggle_showmore').addEventListener('click', () => {
        const classContent = document.getElementsByClassName("st-foot__content")[0]
        const classLabel = document.getElementsByClassName("st-foot__showmore")[0]
        if (document.getElementById('toggle_showmore').checked){
          classContent.style.display="inherit"
          classLabel.style.margin="auto"
          classLabel.style.marginRight ="30px"
          classLabel.style.marginTop ="-25px"
          classLabel.style.position = "inherit"
        }else{
          classContent.style.display="none"
          classLabel.style.margin="inherit"
          classLabel.style.marginRight ="15px"
          classLabel.style.marginTop ="-10px"
          classLabel.style.position = "absolute"
        }
      })
    })
 */

  const handleClose = `"use strict";requestIdle(function(){document.getElementById("toggle_showmore").addEventListener("click",function(){var e=document.getElementsByClassName("st-foot__content")[0],t=document.getElementsByClassName("st-foot__showmore")[0];document.getElementById("toggle_showmore").checked?(e.style.display="inherit",t.style.margin="auto",t.style.marginRight="30px",t.style.marginTop="-25px",t.style.position="inherit"):(e.style.display="none",t.style.margin="inherit",t.style.marginRight="15px",t.style.marginTop="-10px",t.style.position="absolute")})});`

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
        {arcSite === 'elcomerciomag' && (
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
      <script dangerouslySetInnerHTML={{ __html: handleClose }}></script>
    </>
  )
}

FooterStory.label = 'Pié de página - Noticia'
FooterStory.static = true

FooterStory.propTypes = {
  customFields,
}

export default FooterStory
