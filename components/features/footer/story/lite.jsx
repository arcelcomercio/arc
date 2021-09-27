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

const FooterStory = (props) => {
  const {
    customFields: { directors },
  } = props
  const { arcSite, contextPath, metaValue } = useAppContext()

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
          {metaValue('section_style') === 'parallax' &&
          arcSite === SITE_ELCOMERCIO ? (
            <svg width="151" height="24" viewBox="0 0 151 24">
              <path
                d="M100.78,8.543l4.137,4.6L100.78,16.06Zm-.906,0c-.634.3-1.691.664-2.673,1.041v9.177a5.932,5.932,0,0,1-.2,1.993,1.343,1.343,0,0,1-.695.77v.408a25.383,25.383,0,0,1,2.929.77,17.608,17.608,0,0,1,2.7,1.268l5.421-3.774-.377-.574-2.3,1.6-3.88-1.509V16.785l7.112-5-4.409-5.177L99.874,8.483Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M125.694,6.611l4.167,2.445-1.9,2.838-3.5-2.068V19.849l3.306,1.51,1.707-1.238.392.5-4.53,3.366a23.059,23.059,0,0,0-2.793-1.343,16.6,16.6,0,0,0-2.7-.709V21.57a2.065,2.065,0,0,0,.74-.83,5.079,5.079,0,0,0,.227-1.932V9.751a12.6,12.6,0,0,0,4.877-3.2Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M144.824,9.917c.544.2,1.269.5,2.537,1.1V21.132l-3.639-1.509V9.539a5.571,5.571,0,0,1,1.1.377Zm.77-3.306a15.753,15.753,0,0,1-5.481,3.019v9.057a5.545,5.545,0,0,1-.241,1.8,2.644,2.644,0,0,1-.725.906l.136.3a9.3,9.3,0,0,1,2.567.468,17.438,17.438,0,0,1,3.533,1.736,11.6,11.6,0,0,1,1.948-1.253A28.935,28.935,0,0,1,151,20.86V8.785a17.032,17.032,0,0,1-5.406-2.174Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M63.861,9.917c.544.2,1.238.5,2.552,1.1V21.132l-3.654-1.509V9.539a5.586,5.586,0,0,1,1.1.377Zm.77-3.306A15.885,15.885,0,0,1,59.12,9.63v9.057a5.52,5.52,0,0,1-.227,1.841,2.793,2.793,0,0,1-.77.906l.166.3a9.063,9.063,0,0,1,2.537.468,18.229,18.229,0,0,1,3.578,1.736,12.159,12.159,0,0,1,2.038-1.3,30.2,30.2,0,0,1,3.684-1.706V8.86a17.232,17.232,0,0,1-5.421-2.174Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M29.9,20.528l-.876.709-1.933-1.509V3.864l1.3-1.283L25.283,0l-3.02,2.566,1.3,1.3v13.8a13.342,13.342,0,0,1-.151,1.962,3.184,3.184,0,0,1-.332.966,2.327,2.327,0,0,1-.664.664v.242a10.486,10.486,0,0,1,2.1.83A19.424,19.424,0,0,1,26.657,24L30.3,21.132l-.393-.558Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M57.49,17.223l-.408.347a13.877,13.877,0,0,1-3.9,2.294,10.681,10.681,0,0,1-4.047.74h-.815V3.472a6.539,6.539,0,0,0,3.548,1A6.9,6.9,0,0,0,55,3.347,6.9,6.9,0,0,0,57.248.891L56.674.6a3.2,3.2,0,0,1-1.129,1.011,3.2,3.2,0,0,1-1.468.378,9.061,9.061,0,0,1-4.53-1.9L42.39,6.128v7.109a9.2,9.2,0,0,1-.106,2.747,3.576,3.576,0,0,1-.74.981,9.492,9.492,0,0,1-2.129-6.038,8.963,8.963,0,0,1,1.359-4.891,11.683,11.683,0,0,1,3.277-3.5l.2-.136-.362-.438-.211.106a17.287,17.287,0,0,0-5.33,4.3,10.91,10.91,0,0,0-2.1,6.445,11.288,11.288,0,0,0,1.51,5.479A10.568,10.568,0,0,0,41.862,22.4,11.4,11.4,0,0,0,47.4,23.8a12.083,12.083,0,0,0,3.941-.679,11.535,11.535,0,0,0,3.443-1.8,13.012,13.012,0,0,0,2.763-3.215l.332-.528-.393-.332ZM47.63,20.5a10.345,10.345,0,0,1-3.111-.966,9.3,9.3,0,0,1-2.6-2.068,34.1,34.1,0,0,0,3.2-3.019,3.848,3.848,0,0,0,.77-1.343,7.545,7.545,0,0,0,.136-1.842V4.181l1.6-1.374V20.5Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M117.178,6.611,113.629,9.63a2.128,2.128,0,0,0-.377-1.177,7.742,7.742,0,0,0-1.933-1.842L107.71,9.721l.408.468a1.886,1.886,0,0,1,1.027-.664.74.74,0,0,1,.6.392,3.1,3.1,0,0,1,.3,1.6v6.6a4.648,4.648,0,0,1-.242,1.872,2.4,2.4,0,0,1-.906,1v.332a11.642,11.642,0,0,1,2.144.891,16.578,16.578,0,0,1,2.174,1.675l3.685-2.747-.468-.543-.876.74-1.933-1.51V10.566l1.133-1.042c.83,1.042,1.4,1.676,2.31,1.676,1.51,0,3.775-2.476,3.775-2.476l-.3-.332c-1.51,1.3-2.613-.981-3.383-1.706Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M21.221,17.253l-.408.347a14.119,14.119,0,0,1-3.941,2.294,10.271,10.271,0,0,1-4.031.74h-.755V13a3.9,3.9,0,0,0,1.374.257c1.767,0,3.594-1.8,4.862-3.638l-.559-.3a2.764,2.764,0,0,1-2.174,1.238,7.083,7.083,0,0,1-3.5-1.374V3.5a6.479,6.479,0,0,0,3.533,1,7.038,7.038,0,0,0,3.145-1.119A7.035,7.035,0,0,0,21.04.936l-.574-.3a3.292,3.292,0,0,1-1.152,1.019,3.292,3.292,0,0,1-1.49.384A9.288,9.288,0,0,1,13.294.166L6.152,6.113v7.14a11.619,11.619,0,0,1-.106,2.808,4.18,4.18,0,0,1-.77.936,9.6,9.6,0,0,1-2.25-5.977,9.22,9.22,0,0,1,1.51-4.981A12.651,12.651,0,0,1,7.813,2.566l.211-.121-.468-.438-.166.136A17.575,17.575,0,0,0,2.014,6.415a10.985,10.985,0,0,0-.5,11.909A10.159,10.159,0,0,0,5.593,22.43a11.7,11.7,0,0,0,5.541,1.509,12.082,12.082,0,0,0,3.971-.77,11.2,11.2,0,0,0,3.443-1.8,12.558,12.558,0,0,0,2.733-3.26l.332-.528-.393-.347ZM11.361,2.838V9.253l-1.6,1.313V4.212ZM8.25,19.623a9.059,9.059,0,0,1-2.627-2.1,27.914,27.914,0,0,0,3.2-3.019,3.335,3.335,0,0,0,.77-1.343,4.27,4.27,0,0,0,.136-1.238,10,10,0,0,0,1.631.875v7.819a10.741,10.741,0,0,1-3.111-1Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M92.188,9.147l1.676-1.6.423.423a10.566,10.566,0,0,0-1.193,1.268,2.429,2.429,0,0,0-.393.936,16.687,16.687,0,0,0,0,1.947v7.064a3.487,3.487,0,0,0,.272,1.751c.166.257.332.392.5.392s.332-.2.906-.634l.362.468L91.221,23.94a7.322,7.322,0,0,1-1.631-1.509,3.545,3.545,0,0,1-.6-1.811V10.883L87.311,9.374l-1.963,1.8v8.921l1.3,1.4-3.02,2.34-3.02-2.34,1.223-1.4V12.347a3.411,3.411,0,0,0-.257-1.691A4,4,0,0,0,80.2,9.374l-1.978,1.676v9.057l1.344,1.4-3.11,2.34-3.141-2.34,1.344-1.4V11.789a3.833,3.833,0,0,0-.664-1.872c-.2-.272-.362-.438-.529-.438a3.02,3.02,0,0,0-1.132.664l-.347-.528L75.7,6.6a10.419,10.419,0,0,1,1.51,1.238,2.672,2.672,0,0,1,.634,1,4.1,4.1,0,0,1,.211,1.509l4.53-3.7a13.682,13.682,0,0,1,1.978,1.977,3.169,3.169,0,0,1,.634,1.947L89.44,6.657l2.673,2.491Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M130.993,3.23c.846,1.042,1.812,2.174,2.748,2.174,1.51,0,3.745-2.475,3.745-2.475l-.3-.332c-1.434,1.3-2.612-.936-3.382-1.66L131.009,3.23Z"
                fill="#aaa"
                fillRule="evenodd"
              />
              <path
                d="M137.411,20.694c-.544.407-.68.6-.906.6s-.332-.136-.5-.408a3.462,3.462,0,0,1-.333-1.691V10.445l1.3-1.268-3.111-2.6-3.11,2.6,1.3,1.268V20.528a3.659,3.659,0,0,0,.573,1.811,8.052,8.052,0,0,0,1.676,1.6l3.4-2.808Z"
                fill="#aaa"
                fillRule="evenodd"
              />
            </svg>
          ) : (
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
          )}
        </a>
        {isMag ? (
          <label htmlFor="toggle_showmore" className={classes.showMore}>
            Ver más
            <svg width="15" height="15" viewBox="0 0 284.9 284.9">
              <path d="M282.1 76.5l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9 -2.5 0-4.7 1-6.6 2.9L142.5 174.4 30.3 62.2c-1.9-1.9-4.1-2.9-6.6-2.9 -2.5 0-4.7 1-6.6 2.9L2.9 76.5C1 78.4 0 80.6 0 83.1c0 2.5 1 4.7 2.9 6.6l133 133c1.9 1.9 4.1 2.9 6.6 2.9s4.7-1 6.6-2.9L282.1 89.6c1.9-1.9 2.8-4.1 2.8-6.6C284.9 80.6 284 78.4 282.1 76.5z" />
            </svg>
            <input type="checkbox" id="toggle_showmore"></input>
          </label>
        ) : null}
        <div className={classes.content}>
          {directorsObject && isElcomercio ? (
            <div className={classes.block}>
              {Object.keys(directorsObject).map((person) => (
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
            {siteLegal.map((legalLine) => (
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
