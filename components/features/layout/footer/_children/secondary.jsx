import React from 'react'

const classes = {
  footer: '',

  logoContainer: '',
  logo: '',
  logoImg: '',

  body: 'flex',

  sites: '',
  sitesItemTitle: '',
  sitesList: 'flex flex-wrap',
  sitesItem: '',
  sitesLink: '',

  facebookIcon: 'icon-facebook',
  twitterIcon: 'icon-twitter',
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
        <ul className={classes.legalList}>
          {siteLegal.map(el => (
            <li className={classes.legalItem} key={el}>
              {el}
            </li>
          ))}
        </ul>
        {/* Secciones */}
        <div className={classes.sections}>
          <ul className={classes.list}>
            <li className={classes.listTitle}>Secciones</li>
            {sections.map(el => (
              <li className={classes.listLinkSection} key={el.url}>
                <a className={classes.listLink} href={el.url}>
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contacto */}
        <div>
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
        <ul className={classes.listSocial}>
          <li className={classes.listSocialItem}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={facebookUrl}
              className={classes.listSocialLink}>
              <i className={classes.facebookIcon} />
            </a>
          </li>
          <li className={classes.listSocialItem}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={twitterUrl}
              className={classes.listSocialLink}>
              <i className={classes.twitterIcon} />
            </a>
          </li>
        </ul>
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
