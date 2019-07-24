import React from 'react'

const classes = {
  footer: 'footer-secondary footer-story',
  logoContainer:
    'footer-secondary__logo-wrapper flex items-center pl-20 pr-20 justify-center lg:justify-start',
  logo: 'footer-secondary__logo-link',
  logoImg: 'footer-secondary__logo-img',
  body:
    'flex justify-between pl-20 pr-20 pt-20 pb-20 lg:pt-30 lg:pb-30 flex-col lg:flex-row',
  legalWrapper:
    'footer-secondary__legal w-full  pr-20 pb-20 lg:pb-0 text-center lg:text-left',
  legalItem: 'footer-secondary__legal-item text-sm',
}

const SecondaryFooter = props => {
  const { siteLegal, logoUrl, arcSite } = props

  return (
    <footer className={classes.footer}>
      {/* Logo */}
      <div className={classes.logoContainer}>
        <a href="/" className={classes.logo}>
          <img
            className={classes.logoImg}
            src={logoUrl}
            alt={`Logo de ${arcSite}`}
            loading="lazy"
          />
        </a>
      </div>
      {/* Cuerpo */}
      <div className={classes.body}>
        {/* Información del sitio */}
        <div className={classes.legalWrapper}>
          {siteLegal.map(el => (
            <div className={classes.legalItem} key={el}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default SecondaryFooter
