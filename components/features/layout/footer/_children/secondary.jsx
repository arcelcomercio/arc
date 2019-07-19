import React from 'react'

const classes = {
  footer: 'footer-secondary',
  logoContainer: 'footer-secondary__logo-wrapper flex items-center pl-20 pr-20',
  logo: 'footer-secondary__logo-link',
  logoImg: 'footer-secondary__logo-img',

  body: 'flex justify-between p-20 flex-col md:flex-row',
  legalWrapper: 'footer-secondary__legal w-full pb-20  md:pb-0',
  sections: 'footer-secondary__sections w-full pb-20 pl-20 pr-20 md:pb-0',
  listSection: 'footer-secondary__sections-list flex flex-wrap',
  listLinkSection: 'footer-secondary__sections-item pb-20',
  listLink:
    'footer-secondary__sections-link footer-secondary__list-link text-md flex items-center',
  twoWrapper: 'footer-secondary__box flex w-full ',
  contactWrapper: 'footer-secondary__contact pl-20 pr-20',
  social: 'footer-secondary__social pl-20 pr-20',
  legalLinksWrapper: 'footer-secondary__cobtact-item pb-20',
  legalLinks:
    'footer-secondary__contact-link footer-secondary__list-link text-md flex items-center',
  sites: '',
  sitesItemTitle: '',
  sitesList: 'flex flex-wrap',
  sitesItem: '',
  sitesLink: '',
  listTitle: 'footer-secondary__title uppercase pb-15 font-bold text-md',
  facebookIcon: 'icon-facebook',
  twitterIcon: 'icon-twitter',
  linkedinIcon: 'icon-linkedin',
}

const SecondaryFooter = props => {
  const {
    facebookUrl,
    twitterUrl,
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
          <img className={classes.logoImg} src={logoUrl} alt="" />
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
              <li className={classes.listSocialItem}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={facebookUrl}
                  className={classes.listSocialLink}>
                  <i className={classes.facebookIcon} />
                  Facebook
                </a>
              </li>
              <li className={classes.listSocialItem}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={twitterUrl}
                  className={classes.listSocialLink}>
                  <i className={classes.twitterIcon} />
                  Twitter
                </a>
              </li>
              <li className={classes.listSocialItem}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={twitterUrl}
                  className={classes.listSocialLink}>
                  <i className={classes.linkedinIcon} />
                  Linkedin
                </a>
              </li>
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
