import React from 'react'

const classes = {
  footer: 'footer-secondary footer-story lg:p-20',
  logoContainer:
    'footer-secondary__logo-wrapper flex items-center justify-between lg:justify-start flex-col lg:flex-row pt-20 pb-20 lg:pt-0 lg:pb-0',
  logo: 'footer-secondary__logo-link mb-20 lg:mb-0',
  logoImg: 'footer-secondary__logo-img',
  body: 'flex w-full items-center justify-end',
  legalWrapper:
    'footer-secondary__legal flex items-center justify-between flex-col lg:flex-row',
  legalItem:
    'footer-secondary__legal-item text-sm pr-20 pl-20 position-relative h-full flex justify-center items-center lg:items-start flex-col mb-10 lg:mb-0',
}

const SecondaryFooter = props => {
  const { story, logoUrl, arcSite } = props

  return (
    <footer className={classes.footer}>
      {/* Logo */}
      <div className={classes.logoContainer}>
        <a href="/" className={classes.logo}>
          <img
            className={classes.logoImg}
            src={logoUrl}
            alt={`Logo de ${arcSite}`}            
          />
        </a>
        {/* Cuerpo */}
        <div className={classes.body}>
          {/* Información del sitio */}
          <div className={classes.legalWrapper}>
            {story.map(({ position, name }) => (
              <div className={classes.legalItem} key={position}>
                <div>{position}</div>
                <div>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SecondaryFooter
