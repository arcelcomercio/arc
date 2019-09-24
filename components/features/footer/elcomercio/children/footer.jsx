import React from 'react'

const classes = {
  footer: 'secondary-font',
  container: 'flex flex-col p-30 bg-primary md:flex-row',
  /** ---------------------- */
  info: 'flex-1 pr-20 pl-20 position-relative text-center md:text-left',
  logoBox: 'footer__logo-container inline-block mb-15',
  logo: 'w-full',
  legalList: 'font-normal',
  legalItem: 'text-sm line-h-md text-center md:text-left',
  legalLink: '',
  gda: 'position-absolute bottom-0 hidden md:block',
  gdaImg: 'mb-5',
  gdaText: 'text-sm line-h-sm',
  /** ---------------------- */
  directors:
    'flex-1 pr-20 pl-20 hidden border-l-1 border-dashed border-black md:block',
  directorsItem: 'mb-20',
  directorsTitle: 'text-sm line-h-xs uppercase mb-5',
  directorsNames: 'text-xs line-h-lg font-bold',
  /** ---------------------- */
  contact:
    'flex-1 pr-20 pl-20 hidden border-l-1 border-dashed border-black lg:block',
  contactList: '',
  contactItem: 'mb-20',
  contactTitle: 'text-sm line-h-sm',
  contactLink: 'text-sm line-h-md underline',
  linksList: '',
  linksItem: 'text-sm line-h-md mb-5 text-left',
  linksLink: 'block',
  /** ---------------------- */
  sites: 'p-20',
  sitesTitle: 'text-sm line-h-sm text-center uppercase mb-10 font-bold',
  sitesList: 'flex flex-wrap justify-center',
  sitesItem: 'footer__sites-item position-relative',
  sitesLink: 'pb-5 pr-10 pl-10 text-sm line-h-sm inline-block',
}

const SITES_TITLE = 'Visite también'
const GDA_TEXT = 'Miembro del Grupo de Diarios de América'

const FooterChildElComercio = ({
  legalLinks,
  siteLegal,
  directors,
  contacts,
  logoUrl,
  gdaLogo,
  gecSites,
  gda,
  arcSite,
  isAdmin,
}) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.info}>
          <a href="/" className={classes.logoBox}>
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.logo}`}
              src={isAdmin ? logoUrl : ''}
              data-src={logoUrl}
              alt={`Logo de ${arcSite}`}
            />
          </a>
          <address className={classes.legalList}>
            {siteLegal.map(el => (
              <p className={classes.legalItem} key={`info-${el}`}>
                {el}
              </p>
            ))}
          </address>
          {gda && (
            <div className={classes.gda}>
              <img
                className={`${isAdmin ? '' : 'lazy'} ${classes.gdaImg}`}
                src={isAdmin ? gdaLogo : ''}
                data-src={gdaLogo}
                alt={`Logo de ${GDA_TEXT}`}
              />
              <p className={classes.gdaText}>{GDA_TEXT}</p>
            </div>
          )}
        </div>
        <div className={classes.directors}>
          {directors && (
            <ul className={classes.list}>
              {directors.map(
                ({ position, names }) =>
                  position &&
                  names && (
                    <li
                      className={classes.directorsItem}
                      key={`dir-${position}`}>
                      <h5 className={classes.directorsTitle}>{position}</h5>
                      {names.map(name => (
                        <p
                          key={`dir-${name}`}
                          className={classes.directorsNames}>
                          {name}
                        </p>
                      ))}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
        <div className={classes.contact}>
          <ul className={classes.contactList}>
            {contacts &&
              contacts.map(
                ({ position, name, link }) =>
                  position &&
                  name && (
                    <li className={classes.contactItem} key={`contact-${name}`}>
                      <h5
                        className={`${classes.contactTitle} ${
                          classes.contactPosition
                        }`}>
                        {position}
                      </h5>
                      <a
                        href={name.includes('@') ? `mailto:${name}` : name}
                        className={classes.contactLink}>
                        {name}
                      </a>
                      {link && (
                        <>
                          <br />
                          {link.url && link.url.includes('@') ? (
                            <a
                              href={`mailto:${link.url}`}
                              className={classes.contactLink}>
                              {link.name}
                            </a>
                          ) : (
                            <a
                              href={link.url}
                              className={classes.contactLink}
                              target="_blank"
                              rel="noopener noreferrer">
                              {link.name}
                            </a>
                          )}
                        </>
                      )}
                    </li>
                  )
              )}
          </ul>
          {legalLinks && (
            <ul className={classes.linksList}>
              {legalLinks.map(
                ({ name, url, external }) =>
                  name &&
                  url && (
                    <li className={classes.linksItem} key={`legal-${name}`}>
                      {external ? (
                        <a
                          href={url}
                          className={classes.linksLink}
                          target="_blank"
                          rel="noopener noreferrer">
                          {name}
                        </a>
                      ) : (
                        <a href={url} className={classes.linksLink}>
                          {name}
                        </a>
                      )}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
      <div className={classes.sites}>
        <h5 className={classes.sitesTitle}>{SITES_TITLE}</h5>
        <ul className={classes.sitesList}>
          {gecSites &&
            gecSites.map(site => {
              if (site.arcSite === arcSite) return ''
              return (
                <li className={classes.sitesItem} key={`site-${site.url}`}>
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

export default FooterChildElComercio
