import React from 'react'

const classes = {
  footer: 'foot-g w-full',
  info: 'foot-g__info pos-rel',
  sections: 'foot-g__sections pos-rel',
  contact: 'foot-g__contact',
  sites: 'foot-g__sites f f-col',
  sitesList: 'foot-g__sites-list f w-full',
  sitesItemTitle: 'foot-g__ec',
  sitesItem: 'foot-g__sites-item f alg-center',
  legalList: 'foot-g__legal-list',
  legalItem: `foot-g__legal-item`,
  logoContainer: 'foot-g__logo-container',
  logoImg: 'w-full',
  list: 'foot-g__list',
  listItem: 'foot-g__list-item',
  listTitle: 'foot-g__list-title',
  listLinkTitle: 'foot-g__list-link',
  listLinkInfo: 'foot-g__list-link',
  listLink: 'foot-g__list-link',
  listLinkSection: 'foot-g__list-link',
  socialTitle: 'foot-g__social-title',
  listSocial: 'foot-g__social f',
  listSocialItem: 'foot-g__social-item',
  listSocialLink: 'foot-g__social-link',
  legalLinks: 'foot-g__legal-links f alg-center just-between',
  legalLinksDivider: 'foot-g__legal-divider',
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
        <a
          itemProp="url"
          href="/"
          className={classes.logoContainer}
          title="Ir a la portada">
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
          {sections &&
            sections.map(el => (
              <li className={classes.listLinkSection} key={el.url}>
                <a itemProp="url" className={classes.listLink} href={el.url}>
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
              <a
                itemProp="url"
                className={classes.listLink}
                href={el.url}
                key={el.url}>
                {el.name}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <p itemProp="description" className={classes.socialTitle}>
            Síguenos
          </p>
        </div>
        <ul className={classes.listSocial}>
          {socialNetworks &&
            socialNetworks.map(el => {
              return (
                <li className={classes.listSocialItem}>
                  <a
                    itemProp="url"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={el.url}
                    className={classes.listSocialLink}>
                    {(() => {
                      if (el.name === 'facebook') {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="22"
                            viewBox="0 0 10 21">
                            <title>Compartir en facebook</title>
                            <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />
                          </svg>
                        )
                      }
                      if (el.name === 'twitter') {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="22"
                            viewBox="0 0 14 12">
                            <title>Compartir en twitter</title>
                            <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />
                          </svg>
                        )
                      }
                      return ''
                    })()}
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
      <div className={classes.sites}>
        <p itemProp="description" className={classes.sitesItemTitle}>
          Red el comercio
        </p>
        <p itemProp="description" className={classes.sitesList}>
          {gecSites.map(site => {
            if (site.arcSite === arcSite) return ''
            return (
              <a
                itemProp="url"
                className={classes.sitesItem}
                key={site.url}
                target="_blank"
                rel="noopener noreferrer"
                href={site.url}>
                {site.name}
              </a>
            )
          })}
        </p>
      </div>
    </footer>
  )
}

export default React.memo(FooterChildStandardG21)
