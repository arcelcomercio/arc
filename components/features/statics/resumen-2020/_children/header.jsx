import * as React from 'react'

import properties from '../_dependencies/properties'

/**
 * @todo usar iconos de redes sociales como <SVG>
 * @todo confirmar si redes sociales seran para compartir o solo enlace
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_header.scss
 */
const classes = {
  header: 'navbar-rs',
  container: 'navbar-rs__container',
  containerLeft: 'navbar-rs__container-left',
  logoComercio: 'navbar-rs__container-left__logo-comercio',
  logoEspecial: 'navbar-rs__container-left__logo-especial',
  containerRight: 'navbar-rs__container-rigth',
}

/* window.addEventListener('load', () => {requestIdle(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          window.open(
            button.getAttribute('href'),
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }
})}) */

const popup =
  '"use strict";window.addEventListener("load",function(){requestIdle(function(){if(!window.shareButtons){var e=document.body.querySelectorAll("a[data-share]");if(e&&e.length>0){var t=window.screen.width/2-300,n=window.screen.height/2-200;e.forEach(function(e){e.addEventListener("click",function(o){o.preventDefault(),window.open(e.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=600, height=400, top="+n+", left="+t)})})}}})});'

const titleWeb = 'Las noticias más importantes del 2020'

const StaticsResumen2020Header = ({
  requestUri,
  siteUrl,
  arcSite,
  twitter,
  customLogo,
}) => {
  const links = {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${requestUri}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      titleWeb
    )}&url=${siteUrl}${requestUri}&via=${twitter}`,
    // instagram: ``,
  }

  const logo = customLogo || properties(arcSite)?.logo
  const urlEspecial =
    arcSite === 'elcomercio'
      ? 'https://especiales.elcomercio.pe/?q=especiales/especiales-el-comercio/index.html'
      : siteUrl
  const hasCustomLogoStyle =
    arcSite === 'diariocorreo' || arcSite === 'peru21g21' || arcSite === 'ojo'

  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.containerLeft}>
            <a className={classes.logoComercio} href={siteUrl}>
              <img src={logo} alt={`logo de ${arcSite}`} />
            </a>
            <a
              className={classes.logoEspecial}
              href={urlEspecial}
              style={hasCustomLogoStyle ? { height: '80%' } : {}}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAYCAYAAAFYXjmtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjUwNjY0RjJCMjNFMTFFOUI3NDY4MUJDMTgyMDFDMkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUwNjY0RjFCMjNFMTFFOUI3NDY4MUJDMTgyMDFDMkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Nzk4OTBDQkMyRjIxMUU4QURDRDg2QzJFN0IxNTc2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Nzk4OTBDQ0MyRjIxMUU4QURDRDg2QzJFN0IxNTc2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrBaSaQAAAa0SURBVHja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"
                alt="logo de especiales"
                style={hasCustomLogoStyle ? { height: '100%' } : {}}
              />
            </a>
          </div>
          <div className={classes.containerRight}>
            <ul>
              <li>
                <a href={links.facebook} data-share="">
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
                </a>
              </li>
              <li>
                <a href={links.twitter} data-share="">
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
                </a>
              </li>
              {/* <li>
              <a href={links.instagram} data-share="">
                <img src="data:image/png;base64,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" alt="instagram"/>
              </a>
            </li> */}
            </ul>
          </div>
        </div>
      </header>
      <script dangerouslySetInnerHTML={{ __html: popup }}></script>
    </>
  )
}

export default React.memo(StaticsResumen2020Header)
