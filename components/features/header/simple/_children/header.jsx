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
  titleField = '',
  urlField = '',
  title: titleProp = '',
}) => {
  const title = titleProp || defaultTitle
  const links = {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${requestUri}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${siteUrl}${requestUri}&via=${twitter}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${requestUri}`,
    whatsapp: `whatsapp://send?text=${siteUrl}${requestUri}`,
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
            style={hasCustomLogoStyle ? { height: '80%' } : { width: '100%' }}>
            <img
              src={logo}
              alt={`logo de ${arcSite}`}
              style={hasCustomLogoStyle ? { height: '100%' } : {}}
            />
          </a>
          <a className={classes.logoTrivia} href={urlField || `/trivias/`}>
            <svg width="100" height="16">
              <text
                style={{
                  fill: '#ffc900',
                  fontSize: '15px',
                  fontWeight: '700',
                }}>
                <tspan y="14" aria-hidden="true">
                  +
                </tspan>
                <tspan> </tspan>
                <tspan style={{ fill: '#fff' }} y="15">
                  {titleField || `TRIVIAS`}
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
                title="Compartir en facebook"
                alt="Compartir en facebook"
                onClick={(e) => handleShare(e, links.facebook)}>
                <svg width="26.447" height="26.447" viewBox="0 0 26.447 26.447">
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
                title="Compartir en twitter"
                alt="Compartir en twitter"
                onClick={(e) => handleShare(e, links.twitter)}>
                <svg width="26.447" height="26.447" viewBox="0 0 26.447 26.447">
                  <path
                    d="M58.824,0A13.224,13.224,0,0,0,45.6,13.224h0a13.224,13.224,0,0,0,26.447,0h0A13.224,13.224,0,0,0,58.824,0Zm5.608,10.347a8.225,8.225,0,0,1-12.654,7.3,5.815,5.815,0,0,0,4.281-1.2,2.9,2.9,0,0,1-2.7-2.008,2.942,2.942,0,0,0,1.306-.049,2.9,2.9,0,0,1-2.321-2.87,2.874,2.874,0,0,0,1.313.361,2.9,2.9,0,0,1-.9-3.864,8.22,8.22,0,0,0,5.962,3.023,2.895,2.895,0,0,1,4.927-2.641,5.746,5.746,0,0,0,1.835-.7,2.885,2.885,0,0,1-1.272,1.6,5.818,5.818,0,0,0,1.661-.452A5.771,5.771,0,0,1,64.431,10.347Z"
                    transform="translate(-45.6)"
                    fill="#fff"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                title="Compartir en linkedin"
                alt="Compartir en linkedin"
                onClick={(e) => handleShare(e, links.linkedin)}>
                <svg
                  width="26.447"
                  height="26.447"
                  viewBox="0 0 26.447 26.447"
                  fill="none">
                  <path
                    d="M13 0C5.82021 0 0 5.82021 0 13C0 20.1798 5.82021 26 13 26C20.1798 26 26 20.1798 26 13C26 5.82021 20.1798 0 13 0ZM9.81771 18.3882H7.18521V9.91656H9.81771V18.3882ZM8.48521 8.87656C7.65375 8.87656 7.11615 8.2875 7.11615 7.55896C7.11615 6.81552 7.67 6.24406 8.51906 6.24406C9.36812 6.24406 9.88812 6.81552 9.90437 7.55896C9.90437 8.2875 9.36812 8.87656 8.48521 8.87656ZM19.4323 18.3882H16.7998V13.6933C16.7998 12.6005 16.4179 11.8584 15.4659 11.8584C14.7387 11.8584 14.3068 12.3608 14.1158 12.8443C14.0454 13.0163 14.0278 13.26 14.0278 13.5024V18.3869H11.394V12.6181C11.394 11.5605 11.3601 10.6762 11.3249 9.91521H13.6121L13.7326 11.092H13.7854C14.1321 10.5395 14.9811 9.72427 16.4017 9.72427C18.1336 9.72427 19.4323 10.8848 19.4323 13.3792V18.3882Z"
                    fill="white"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                title="Compartir en whatsapp"
                alt="Compartir en whatsapp"
                onClick={(e) => handleShare(e, links.whatsapp)}>
                <svg
                  width="26.447"
                  height="26.447"
                  viewBox="0 0 26.447 26.447"
                  fill="none">
                  <path
                    d="M24.0556 6.01235C20.1663 -0.000198753 12.2257 -1.78771 6.06763 1.94982C0.0716488 5.68735 -1.87299 13.8124 2.01629 19.825L2.3404 20.3125L1.04397 25.1875L5.90557 23.8875L6.39173 24.2125C8.49843 25.35 10.7672 26 13.0359 26C15.4667 26 17.8975 25.35 20.0042 24.05C26.0002 20.15 27.7828 12.1874 24.0556 6.01235ZM20.6524 18.5249C20.0042 19.4999 19.194 20.15 18.0596 20.3125C17.4114 20.3125 16.6011 20.6375 13.36 19.3374C10.6051 18.0374 8.33637 15.9249 6.71584 13.4874C5.74352 12.3499 5.25736 10.8874 5.09531 9.42487C5.09531 8.12486 5.58147 6.98736 6.39173 6.17485C6.71584 5.84985 7.03995 5.68735 7.36405 5.68735H8.17432C8.49843 5.68735 8.82254 5.68735 8.98459 6.33735C9.3087 7.14986 10.119 9.09987 10.119 9.26237C10.281 9.42487 10.281 9.74988 10.119 9.91238C10.281 10.2374 10.119 10.5624 9.95691 10.7249C9.79486 10.8874 9.6328 11.2124 9.47075 11.3749C9.14664 11.5374 8.98459 11.8624 9.14664 12.1874C9.79486 13.1624 10.6051 14.1374 11.4154 14.9499C12.3877 15.7624 13.36 16.4124 14.4944 16.8999C14.8185 17.0624 15.1426 17.0624 15.3047 16.7374C15.4667 16.4124 16.277 15.5999 16.6011 15.2749C16.9252 14.9499 17.0873 14.9499 17.4114 15.1124L20.0042 16.4124C20.3283 16.5749 20.6524 16.7374 20.8145 16.8999C20.9765 17.3874 20.9765 18.0374 20.6524 18.5249Z"
                    fill="white"
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
