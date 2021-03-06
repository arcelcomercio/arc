import React from 'react'

const classes = {
  footer: '',
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
  contactHorario: 'text-sm line-h-md',
  linksList: '',
  linksItem: 'text-sm line-h-md mb-5 text-left',
  linksLink: 'block',
  /** ---------------------- */
  sites: 'p-20',
  sitesTitle:
    'text-sm line-h-sm text-center uppercase mb-10 font-bold footer__sites-visit',
  sitesList: 'flex flex-wrap justify-center block',
  sitesItem:
    'footer__sites-item pb-5 pr-10 pl-10 text-sm line-h-sm inline-block position-relative',
  book: 'no-mobile block mb-10',
  bookMovil: 'no-desktop block mt-15',
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
  urlBook,
  bookLogo,
}) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.info}>
          <a
            itemProp="url"
            href="/"
            className={classes.logoBox}
            title="Ir a la portada">
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.logo}`}
              src={isAdmin ? logoUrl : ''}
              data-src={logoUrl}
              alt={`Logo de ${arcSite}`}
            />
          </a>
          <address className={classes.legalList}>
            {siteLegal.map(el => (
              <p
                itemProp="description"
                className={classes.legalItem}
                key={`info-${el}`}>
                {el}
              </p>
            ))}
          </address>
          {gda && (
            <div className={classes.gda}>
              <a className={classes.book} href={urlBook}>
                <img
                  className={`${isAdmin ? '' : 'lazy'} `}
                  src={isAdmin ? bookLogo : ''}
                  data-src={bookLogo}
                  alt="Libro de reclamaciones"
                  style={{ width: 145 }}
                />
              </a>
              <img
                className={`${isAdmin ? '' : 'lazy'} ${classes.gdaImg}`}
                src={isAdmin ? gdaLogo : ''}
                data-src={gdaLogo}
                alt={`Logo de ${GDA_TEXT}`}
              />
              <p itemProp="description" className={classes.gdaText}>
                {GDA_TEXT}
              </p>
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
                      <h5 itemProp="name" className={classes.directorsTitle}>
                        {position}
                      </h5>
                      {names.map(name => (
                        <p
                          itemProp="description"
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
                ({ position, name, link, horario = '' }) =>
                  position &&
                  name && (
                    <li className={classes.contactItem} key={`contact-${name}`}>
                      <h5
                        itemProp="name"
                        className={`${classes.contactTitle} ${classes.contactPosition}`}>
                        {position}
                      </h5>
                      {horario ? (
                        <>
                          <div className={classes.contactHorario}>{name}</div>
                          <div className={classes.contactHorario}>
                            {horario}
                          </div>
                        </>
                      ) : (
                        <a
                          itemProp="url"
                          href={name.includes('@') ? `mailto:${name}` : name}
                          className={classes.contactLink}>
                          {name}
                        </a>
                      )}
                      {link && (
                        <>
                          <br />
                          {link.url && link.url.includes('@') ? (
                            <a
                              itemProp="url"
                              href={`mailto:${link.url}`}
                              className={classes.contactLink}>
                              {link.name}
                            </a>
                          ) : (
                            <a
                              itemProp="url"
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
                          itemProp="url"
                          href={url}
                          className={classes.linksLink}
                          target="_blank"
                          rel="noopener noreferrer">
                          {name}
                        </a>
                      ) : (
                        <a
                          itemProp="url"
                          href={url}
                          className={classes.linksLink}>
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
      <div style={{ textAlign: 'center' }} className={classes.bookMovil}>
        <a href={urlBook}>
          <img
            className={`${isAdmin ? '' : 'lazy'}`}
            src={isAdmin ? bookLogo : ''}
            data-src={bookLogo}
            alt="Libro de reclamaciones"
            style={{ width: 140 }}
          />
        </a>
      </div>
      <div className={classes.sites}>
        <h5 itemProp="name" className={classes.sitesTitle}>
          {SITES_TITLE}
        </h5>
        <p itemProp="description" className={classes.sitesList}>
          {gecSites &&
            gecSites.map(site => {
              if (site.arcSite === arcSite) return ''
              return (
                <a
                  itemProp="url"
                  className={classes.sitesItem}
                  key={`site-${site.url}`}
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

export default FooterChildElComercio
