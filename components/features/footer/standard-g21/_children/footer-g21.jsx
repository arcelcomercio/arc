import React from 'react'

const classes = {
  footer: 'footer w-full grid',
  info: 'footer__info p-20  bg-primary position-relative',
  sections: 'footer__sections  bg-primary position-relative md:pt-20 pb-20',
  contact: 'footer__contact  bg-primary md:pt-20 pb-20 hidden md:block',
  sites: 'footer__sites flex flex-col p-20 hidden md:block',
  sitesList: 'footer__sites-list flex flex-wrap w-full p-0',
  sitesItem: `footer__sites-item mb-5 pr-10 text-sm line-h-xs uppercase flex items-center`,
  sitesItemTitle: 'text-sm text-gray-300 line-h-xs uppercase mb-10 font-bold',
  sitesLink: 'footer__sites-link text-gray-200 primary-font',
  legalList: 'footer__legal-list text-md',
  legalItem: `footer__legal-item mb-10 text-gray-300 line-h-none text-xs primary-font`,
  logoContainer: 'footer__logo-container block mb-15',
  logoImg: 'w-full',
  list: 'footer__list pt-0 pb-20 pr-20 pl-20 md:pl-30',
  listItem: 'footer__list-item pt-10 pb-10',
  listTitle: 'footer__list-title  pt-10 pb-10 uppercase text-sm text-gray-200',
  listLinkTitle:
    'footer__list-link capitalize text-gray-300 text-sm font-bold line-h-md',
  listLinkInfo:
    'footer__list-link capitalize text-gray-300 text-sm font-bold line-h-md',
  listLink: 'footer__list-link capitalize text-gray-300 text-sm',
  listLinkSection:
    'footer__list-link capitalize text-gray-300 text-sm pb-10 pt-10',
  textContent: 'pt-10 pb-0 pl-20 md:pl-30',
  socialTitle: 'footer__social-title mb-20 uppercase text-sm',
  listSocial: 'footer__social flex pl-20 lg:pl-30',
  listSocialItem: 'footer__social-item',
  listSocialLink: 'footer__social-link',
  legalLinks:
    'footer__legal-links line-h-lg text-xs text-white flex items-center justify-between w-auto',
  legalLinksDivider: 'footer__legal-divider ml-5 mr-5',
  contactPosition: 'block',
  contactName: 'block',
}

const FooterChildStandardG21 = props => {
  const {
    socialNetworks,
    gecSites,
    legalLinks,
    siteLegal,
    logoUrl,
    sections,
    arcSite,
  } = props

  return (
    <footer className={classes.footer}>
      <div className={classes.info}>
        <a href="/" className={classes.logoContainer}>
          <img
            className={classes.logoImg}
            src={logoUrl}
            alt={`Logo de ${arcSite}`}
          />
        </a>
        <ul className={classes.legalList}>
          {siteLegal.map(el => (
            <li className={classes.legalItem} key={el}>
              {el}
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.sections}>
        <ul className={classes.list}>
          <li className={classes.listTitle}>Nuestras secciones</li>
          {sections.map(el => (
            <li className={classes.listLinkSection} key={el.url}>
              <a className={classes.listLink} href={el.url}>
                {el.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.contact}>
        <ul className={classes.list}>
          {/* <li className={classes.listTitle}>Legal</li> */}
          {legalLinks.map(el => (
            <li className={classes.listLinkSection} key={el.url}>
              <a className={classes.listLink} href={el.url} key={el.url}>
                {el.name}
              </a>
            </li>
          ))}
        </ul>
        <div className={classes.textContent}>
          <p className={classes.socialTitle}>Síguenos</p>
        </div>
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
                    <i
                      className={`icon-${el.name} footer__social-icon pr-15`}
                    />
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
      <div className={classes.sites}>
        <p className={classes.sitesItemTitle}>Red el comercio</p>
        <ul className={classes.sitesList}>
          {gecSites.map(site => {
            if (site.arcSite === arcSite) return ''
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
          })}
        </ul>
      </div>
    </footer>
  )
}

export default FooterChildStandardG21
