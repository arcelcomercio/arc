import React from 'react'

const HeaderChildSpecialBasic = () => {
  const classes = {
    header:
      'special-basic-header bg-black position-relative text-center full-width pb-5 pt-5 pl-0 pr-0',
    headerContainer:
      'special-basic-header__container flex justify-between text-left',
    logo: 'special-basic-header__logo mt-10 mb-10 ml-10 mr-10',
    sharerButton: 'special-basic-header__button sharer',
  }

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <a
          className={classes.social}
          href="http://elcomercio.pe/"
          target="blank">
          El comercio
        </a>
        <div id="social">
          <button
            type="button"
            className={classes.sharerButton}
            data-hashtag=""
            data-sharer="facebook"
            data-url="https://especiales.elcomercio.pe/?q=especiales/la-historia-oculta-del-doctor-covid-ecpm/index.html"
            id="fb">
            Facebook
          </button>
          <button
            type="button"
            className={classes.sharerButton}
            data-sharer="whatsapp"
            data-title="ESPECIAL | La historia oculta del ‘Doctor Covid’"
            data-url="https://especiales.elcomercio.pe/?q=especiales/la-historia-oculta-del-doctor-covid-ecpm/index.html"
            id="wst">
            Whatsapp
          </button>
          <button
            type="button"
            className={classes.sharerButton}
            data-hashtags=""
            data-sharer="twitter"
            data-title="ESPECIAL | La historia oculta del ‘Doctor Covid’"
            data-url="https://especiales.elcomercio.pe/?q=especiales/la-historia-oculta-del-doctor-covid-ecpm/index.html"
            data-via="elcomercio_peru"
            id="tw">
            Twitter
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderChildSpecialBasic
