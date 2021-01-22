import * as React from 'react'

import properties from '../_dependencies/properties'

/**
 * @see estilos src/websites/elcomercio/scss/components/header/_simple.scss
 */
const classes = {
  header: 'h-simple',
  container: 'h-simple__container',
  containerLeft: 'h-simple__container-left',
  logoBrand: 'h-simple__container-left__logo-brand',
  logoTrivia: 'h-simple__container-left__logo-trivia',
  containerRight: 'h-simple__container-rigth',
}

const windowW = 600
const windowH = 400

const defaultTitle = 'Las noticias más importantes del 2020'

/**
 *
 * @param {object} props
 * @param {string} props.requestUri
 * @param {string} props.siteUrl
 * @param {string} props.arcSite
 * @param {string} props.twitter
 * @param {string} props.customLogo
 * @param {string} props.title
 */
const HeaderSimpleChild = ({
  requestUri,
  siteUrl,
  arcSite,
  twitter,
  customLogo,
  title: titleProp = '',
}) => {
  const title = titleProp || defaultTitle
  const links = {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${requestUri}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${siteUrl}${requestUri}&via=${twitter}`,
  }

  const logo = customLogo || properties(arcSite)?.logo
  const hasCustomLogoStyle =
    arcSite === 'diariocorreo' || arcSite === 'peru21g21' || arcSite === 'ojo'

  const handleShare = (e, link) => {
    e.preventDefault()
    const wLeft = window.screen.width / 2 - windowW / 2
    const wTop = window.screen.height / 2 - windowH / 2
    window.open(
      link,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
    )
  }

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.containerLeft}>
          <a
            className={classes.logoBrand}
            href={siteUrl}
            style={hasCustomLogoStyle ? { height: '80%' } : {}}>
            <img
              src={logo}
              alt={`logo de ${arcSite}`}
              style={hasCustomLogoStyle ? { height: '100%' } : {}}
            />
          </a>
          <a className={classes.logoTrivia} href="/trivias/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="16"
              viewBox="0 0 60 16">
              <text
                style={{
                  fill: '#ffc900',
                  fontSize: '15px',
                  fontWeight: '700',
                }}>
                <tspan y="14" aria-hidden="true">
                  +
                </tspan>
                <tspan style={{ fill: '#fff' }} y="15">
                  TRIVIAS
                </tspan>
              </text>
            </svg>
          </a>
        </div>
        <div className={classes.containerRight}>
          <ul>
            <li>
              <button
                type="button"
                onClick={e => handleShare(e, links.facebook)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26.447"
                  height="26.447"
                  viewBox="0 0 26.447 26.447">
                  <title>Compartir en facebook</title>
                  <path
                    d="M13.224,0h0A13.224,13.224,0,0,0,0,13.224H0A13.224,13.224,0,0,0,13.224,26.447h0A13.224,13.224,0,0,0,26.447,13.224h0A13.224,13.224,0,0,0,13.224,0Zm3.69,8.033H15.169c-.618,0-.744.25-.744.889v1.536h2.488l-.236,2.7H14.433v8.061H11.216V13.189H9.541V10.458h1.675V8.3c0-2.022,1.077-3.071,3.474-3.071h2.231v2.8Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={e => handleShare(e, links.twitter)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26.447"
                  height="26.447"
                  viewBox="0 0 26.447 26.447">
                  <title>Compartir en twitter</title>
                  <path
                    d="M58.824,0A13.224,13.224,0,0,0,45.6,13.224h0a13.224,13.224,0,0,0,26.447,0h0A13.224,13.224,0,0,0,58.824,0Zm5.608,10.347a8.225,8.225,0,0,1-12.654,7.3,5.815,5.815,0,0,0,4.281-1.2,2.9,2.9,0,0,1-2.7-2.008,2.942,2.942,0,0,0,1.306-.049,2.9,2.9,0,0,1-2.321-2.87,2.874,2.874,0,0,0,1.313.361,2.9,2.9,0,0,1-.9-3.864,8.22,8.22,0,0,0,5.962,3.023,2.895,2.895,0,0,1,4.927-2.641,5.746,5.746,0,0,0,1.835-.7,2.885,2.885,0,0,1-1.272,1.6,5.818,5.818,0,0,0,1.661-.452A5.771,5.771,0,0,1,64.431,10.347Z"
                    transform="translate(-45.6)"
                    fill="#fff"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default React.memo(HeaderSimpleChild)
