import React from 'react'

const classes = {
  // TODO: tama;o de fuentes fijas
  // TODO: tama;o de imagen
  footer: '',
  container: 'flex flex-col p-30 bg-primary md:flex-row',
  /** ---------------------- */
  info: 'flex-1 pr-20 pl-20 position-relative',
  logoBox: 'block mb-15',
  logo: 'w-full',
  legalList: 'font-normal',
  legalItem: 'text-sm line-h-sm text-center md:text-left',
  // TODO: gda must be inside of a block
  gdaImg: 'position-absolute bottom-0', // TODO: hide in mobile
  gdaText: 'position-absolute bottom-0 text-sm line-h-sm',
  /** ---------------------- */
  directors: 'flex-1 pr-20 pl-20 hidden md:block',
  directorsItem: 'mb-20',
  directorsTitle: 'text-sm line-h-sm uppercase',
  directorsNames: 'text-sm line-h-md font-bold',
  /** ---------------------- */
  contact: 'flex-1 pr-20 pl-20 hidden lg:block',
  contactList: '',
  contactItem: 'mb-20',
  contactTitle: 'text-sm line-h-sm',
  contactLink: 'text-md line-h-md underline',
  /** ---------------------- */
  sites: 'p-20',
  sitesTitle: 'text-sm line-h-sm text-center uppercase mb-10 font-bold',
  sitesList: 'flex flex-wrap justify-center',
  sitesItem: 'border-r-1 border-solid border-black',
  sitesLink: 'pt-5 pb-5 pr-10 pl-10 text-sm line-h-sm',
}

const SITES_TITLE = 'Visite también'
const GDA_TEXT = 'Miembro del Grupo de Diarios de América'

const ElComercioChildFooter = ({
  legalLinks,
  siteLegal,
  directors,
  contacts,
  logoUrl,
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
            <>
              <span className={classes.gdaImg}>X</span>
              <p className={classes.gdaText}>{GDA_TEXT}</p>
            </>
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
                ({ position, name }) =>
                  position &&
                  name && (
                    <li className={classes.contactItem} key={`contact-${name}`}>
                      <h5
                        className={`${classes.contactTitle} ${
                          classes.contactPosition
                        }`}>
                        {position}
                      </h5>
                      <a href="/" className={classes.contactLink}>
                        {name}
                      </a>
                    </li>
                  )
              )}
          </ul>
          {legalLinks && (
            // TODO: Custom classes for legalLinks
            <ul className={classes.contactList}>
              {legalLinks.map(
                ({ name, url }) =>
                  name &&
                  url && (
                    <li className={classes.contactItem} key={`contact-${name}`}>
                      <a href={url} className={classes.contactLink}>
                        - {name}
                      </a>
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

export default ElComercioChildFooter
