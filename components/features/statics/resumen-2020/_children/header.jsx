import * as React from 'react'

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

const urlWeb = 'https://elcomercio.pe'
const titleWeb = 'Las noticias más importantes del 2020'

const StaticsResumen2020Header = ({ requestUri }) => {
  const links = {
    facebook: `http://www.facebook.com/sharer.php?u=${urlWeb}${requestUri}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      titleWeb
    )}&url=${urlWeb}${requestUri}&via=elcomercio_peru`,
    // instagram: ``,
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.containerLeft}>
            <a
              className={classes.logoComercio}
              href="https://elcomercio.pe/"
              target="blank">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAAA8CAYAAABlyAESAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTdGN0I0N0E1QjYyMTFFNkJCMEE4MTM4M0RBQTNFNEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzJGRjMyMDQ1QjY5MTFFNkJCMEE4MTM4M0RBQTNFNEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFN0Y3QjQ3ODVCNjIxMUU2QkIwQTgxMzgzREFBM0U0QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFN0Y3QjQ3OTVCNjIxMUU2QkIwQTgxMzgzREFBM0U0QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpzhZpEAABfESURBVHja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"
                alt="logo-comercio"
              />
            </a>
            <a
              className={classes.logoEspecial}
              href="https://especiales.elcomercio.pe/?q=especiales/especiales-el-comercio/index.html"
              target="blank">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAYCAYAAAFYXjmtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjUwNjY0RjJCMjNFMTFFOUI3NDY4MUJDMTgyMDFDMkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUwNjY0RjFCMjNFMTFFOUI3NDY4MUJDMTgyMDFDMkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Nzk4OTBDQkMyRjIxMUU4QURDRDg2QzJFN0IxNTc2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Nzk4OTBDQ0MyRjIxMUU4QURDRDg2QzJFN0IxNTc2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrBaSaQAAAa0SURBVHjaYvz//z8DuYAJi1goEH8A4ntALAvEHECcgqaGE4jlGEA2o+FHQHwZiO9B+ceA+O1/CKgF4itQ/B8ggBip4+ybjP+RnMQDxFxQ9ikgBsl9A2IbII4D4o0ghSxYDDwNxKpAzA7EV4BYGyrOBQ0HViB+CBIACCCKnE0JwIwpkNdhGAJA9CUgDoKyQS4vAGJeKL8I6kOYWlck02yQxEH6qqDsgfMxQAANiMVMgyduEeAfNEkHQ1OiJBDnQcW/QuUOQ2lOaBzfAWJdWBwCwSeo3AaoGWjZAGYhiFb/zwhk/YbmHUZo0reDJhJGqMXfoDq/Q2l2aJ67hOZwmBm/gJgN1acQixA0JCSuAnEUEO8DYjUg3g81gBEq5w3No/JQMZDaPVD9IPE/UHW7gXjtgCUkgAAasGwzOBIwaeANNCF/Q0pX3dBq6CAQGwHxRSD+ApXPhap5hqTnGVRsApS/Cuquj0iFXj6UD0tuILYlkjseI9nxDap/JVTdVrgqLNUeJr4BpCDYBYiNkeT+AbELEt8YWj26IYmBqs9MpCrUGYi/otkBAjxYxNih4n+AOAmIFyHJ2SCp/QTEvkj8TiD+DnUP3EzSPIspB/KsAw59IAvXA/ENIJ4PxNFALAmVQ/fsFyCWweJZFqh+ZMCOw7OeONxxDsYezbPDFQAEYMfcXRoIgjh8kiBCjgixMKhI/gIbRSs7bQURRDG9iJWNDxAEA5rSRjSVhUSstBTRShArLX2gkFIRG4MgvogzyXcwnrkQsJJk4SN7dzN7s5nb299czWZ2tZYmG6uv2cotb/a2GSHOvqr73o7ZE/V6jsJhxJxT+oUu4Vp4pK7aFNLmPmo/TV/F6qUvDjveojAkPGCX8ozCVU2pJFwHRUMe+658Ca30PTHbx016OB+lxpsVzghGxUGLGeONP+FEmCKuJk/B0l8R1vF1fXGEzXgf0CiEUOhVZvamYYBet+lbpf0Kn6jtZaFDODV2en2LAved8sDzm0dt7aHIUmaiDn/OKE+FGxBlwReHtiUhQpFdxWRLGT3iKF3s/5xwjBsVyLCLfLwji46Re1nhgIlEjZ8GdFEhiiSfCzTrvQE2ETNep9BOmfRE/fxLLmYC1NNcgHpy+HoSpLy0hfhV9TTM+THh2dglUVDWNyusCRGfesoJcb7k+BVYuRgS+BWP//qCaqaGUyaEW2GbwvKF9eiQ1X3j5xq/c5bDvXDFGHnsFoRdU08mWIdx49/GO8E7HufJ2mApHZYTFRlhsr711OXi/2vfArRrNqFNBFEc35QKgooKMZWKUCMSBPHjVqiClFoFC7lUsCdR8aDowYvePJTqtfWDQv28KEUED3qNUK+1goIoESy1VFALAY1iNdj1Pfe3ZLrOblaCIM0O/MnuvJ03O5OZl/f/TxpqsI1UwrbsSDI1SSxOyqL+YoupCQ6HSoJsjBZuBM6Q9d8ns9dke8zxZPYfUKR9+JkJ8fHF4IR90CDbc2VBO9ToJb5Ne4V6TbhvUHfF0Hh9WnfHaKPHAKsN+zrqP5Cw28pcxHwoE+p2vHORClxZicc092N/zq49eR6JJa9WiULW0JU9bbl2O5VgS4J8iP2w4KdgVpCO8DNJon/cqMsJnlG/S7Af6fZziI88hKYi2BbR1218DiHnOpwY91E/LLjOda9/mixopW46IP86ASn4KyTJZh/HxyXBklrz21zHDlWK2xViVcpr3m90cu6kZceqkNDBp1/eCSbg+RsEJwWz2JQQjbI7gv7KxnULosUcu30l/el4DwTaPUHBUVo+iDL0NyUtOC+YQq/UvnsEF6HfH2P6cSFz7QZRdNjl47y3zskpp3qCpCRST4oeONWTp7pDsTLQAngasBUM3LN8qf5AtP8MDNVHhgFqOceE6yrZSWg+IXgjGDDUKwcG7YeuxyyCTvSPZcZ42wJYTkjzFmD8OZlnQfazAF8gG2ZZnK3oI01O9Xw6zk/jmsD7tTAfbxlPCsGrl+tRVIB/EorPLgjF8drNE/46Q+yrBBlL/U1C0i1C3WvuD0X0dZAw9ynEvkLwCj93BdsN225CbbPR9xD3OxhHUbBHsBccE7zn2S2c5GmZEmyNCMWqK/VEaEtNgTr1PWNqTvWH4oXl6m+J1UsYCjHbfCNBemSxnUY/OsLKz7HrymhJ3bRzDY14aY3d9Z3d6VqE9bxgM6rlUULbesKb/pfioRFlKkQJTZ6GaX/BUF/9shbt7DLKaIUk6rnl/dpI9tL0nQrY+2nfxTObeJei4BrRKpZAseg1t0alO6VkahJJMSn/YfkF2rf67ywdK18AAAAASUVORK5CYII="
                alt="logo-especiales"
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
