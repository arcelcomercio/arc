import React from 'react'

const classes = {
  footer: 'footer-secondary',
  logoContainer:
    'footer-secondary__logo-wrapper flex items-center pl-20 pr-20 justify-center lg:justify-start',
  logo: 'footer-secondary__logo-link',
  logoImg: 'footer-secondary__logo-img',

  body:
    'flex justify-between pl-20 pr-20 pt-20 pb-20 lg:pt-30 lg:pb-30 flex-col lg:flex-row',
  legalWrapper:
    'footer-secondary__legal w-full  pr-20 pb-20 lg:pb-0 text-center lg:text-left',
  legalItem: 'footer-secondary__legal-item text-sm',
  sections:
    'footer-secondary__sections w-full pt-20 pb-20 lg:pl-20 lg:pr-20 lg:pb-0 lg:pt-0 text-center lg:text-left',
  listSection: 'footer-secondary__sections-list flex flex-wrap mx-auto lg:m-0 ',
  listLinkSection: 'footer-secondary__sections-item pb-20',
  listLink:
    'footer-secondary__sections-link footer-secondary__list-link text-md flex items-center',
  twoWrapper: 'footer-secondary__box flex pt-20 lg:pt-0 mx-auto lg:m-0',
  contactWrapper: 'footer-secondary__contact pr-10 lg_pr-0',
  social: 'footer-secondary__social pl-20 pr-20',
  legalLinksWrapper: 'footer-secondary__contact-item pb-20',
  legalLinks:
    'footer-secondary__contact-link footer-secondary__list-link text-md flex items-center',
  sites: 'footer-secondary__sites hidden lg:block text-center p-20 flex-wrap',
  sitesItemTitle:
    'footer-secondary__sites-title color-gray-300 font-bold mb-20 uppercase',
  sitesList: 'flex flex-wrap justify-center',
  sitesItem:
    'footer-secondary__sites-item mb-15 mr-10 color-gray-300 text-md flex items-center',
  sitesLink: '',
  listTitle: 'footer-secondary__title uppercase pb-20 font-bold text-md',
  facebookIcon: 'footer-secondary__icon icon-facebook border-1 rounded mr-10',
  twitterIcon: 'footer-secondary__icon icon-twitter border-1 rounded mr-10',
  linkedinIcon: 'footer-secondary__icon icon-linkedin border-1 rounded mr-10',
  listSocialItem: 'footer-secondary__social-item pb-30 flex justify-start',
  listSocialLink: 'footer-secondary__social-link capitalize',
}

const SecondaryFooter = props => {
  const {
    socialNetworks,
    gecSites,
    legalLinks,
    // contacts,
    siteLegal,
    logoUrl,
    sections,
    arcSite,
  } = props

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
      </div>
      {/* Cuerpo */}
      <div className={classes.body}>
        {/* Información del sitio */}
        <div className={classes.legalWrapper}>
          <ul className={classes.legalList}>
            {siteLegal.map(el => (
              <li className={classes.legalItem} key={el}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        {/* Secciones */}
        <div className={classes.sections}>
          <h3 className={classes.listTitle}>Secciones</h3>
          <ul className={classes.listSection}>
            {sections.map(el => (
              <li className={classes.listLinkSection} key={el.url}>
                <a className={classes.listLink} href={el.url}>
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.twoWrapper}>
          {/* Contacto */}
          <div className={classes.contactWrapper}>
            <h3 className={classes.listTitle}>Contacto</h3>
            <ul className={classes.legalList}>
              {legalLinks.map(el => (
                <li className={classes.legalLinksWrapper} key={el.url}>
                  <a className={` ${classes.legalLinks}`} href={el.url}>
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Siguenos */}
          <div className={classes.social}>
            <h3 className={classes.listTitle}>Síguenos</h3>
            <ul className={classes.listSocial}>
              {socialNetworks &&
                socialNetworks.map(el => {
                  return (
                    <li className={classes.listSocialItem}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={el.url}
                        className={classes.listSocialLink}>
                        <i className={classes[`${el.name}Icon`]} />
                        {el.name}
                      </a>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
      {/* Sitios grupo el comercio */}
      <div className={classes.sites}>
        <p className={classes.sitesItemTitle}>Visite también</p>
        <ul className={classes.sitesList}>
          {gecSites.map(site => {
            if (site.arcSite !== arcSite) {
              return (
                <li className={classes.sitesItem} key={site.url}>
                  <a
                    className={classes.sitesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={site.url}>
                    {site.name}
                  </a>
                </li>
              )
            }
            return ''
          })}
        </ul>
      </div>
    </footer>
  )
}

export default SecondaryFooter
