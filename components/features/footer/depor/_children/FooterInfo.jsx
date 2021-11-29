import React from 'react'

const classes = {
  info: 'footer-secction__info',
  logo: 'footer-secction__image-logo',
  paragraph: 'footer-secction__text mt-20 mb-0 md:mb-10',
  footerLink: 'footer-secction__link-footer',
  titleList: 'footer-secction__list-title',
  listItem: 'footer-secction__site-item',
}

const SITE_TITLE = 'Visite también: '

const ItemSite = ({ url, name }) => (
  <a
    itemProp="url"
    className={classes.listItem}
    href={url}
    rel="noopener noreferrer"
    target="_blank">
    {' '}
    {name}
  </a>
)

const FooterInfo = ({
  siteUrl,
  imageDefault,
  gecSites,
  legalLinks,
  contacts = [],
  corporateInfo,
  draftingContact = [],
  copyrightText,
  isBook,
  bookUrl,
  bookLogo,
  isAdmin,
}) => {
  let listContacs = ''
  contacts.forEach(({ position, name }) => {
    listContacs += `${position}: ${name} `
  })

  listContacs += `${corporateInfo.name}: ${corporateInfo.direction}`

  return (
    <div className={classes.info}>
      <a itemProp="url" href={siteUrl}>
        <img
          src={imageDefault}
          className={classes.logo}
          alt="depor.com"
          loading="lazy"
        />
      </a>
      <p itemProp="description" className={classes.paragraph}>
        {listContacs}
        <br />
        {draftingContact.length > 0 &&
          `${draftingContact[0].name}: ${draftingContact[0].value} | ${draftingContact[1].name}: ${draftingContact[1].value}`}
        <br />
        {copyrightText}
      </p>
      <a itemProp="url" href={legalLinks[0].url} className={classes.footerLink}>
        {legalLinks[0].name} |
      </a>
      <a itemProp="url" href={legalLinks[1].url} className={classes.footerLink}>
        {legalLinks[1].name} |
      </a>
      <a itemProp="url" href={legalLinks[2].url} className={classes.footerLink}>
        {legalLinks[2].name}{' '}
      </a>
      {isBook && (
        <div className="foot-book__info">
          <a className={classes.book} href={bookUrl}>
            <img
              className={`${isAdmin ? '' : 'lazy'} `}
              src={isAdmin ? bookLogo : ''}
              data-src={bookLogo}
              alt="Libro de reclamaciones"
              style={{ width: 145 }}
            />
          </a>
        </div>
      )}
      <p itemProp="description">
        <h5 itemProp="name" className={classes.titleList}>
          {SITE_TITLE}
        </h5>
        {gecSites &&
          gecSites.map(({ url = '', name = '' }, index) => {
            const KeyString = `key${index}`
            const result =
              name !== 'depor.com' ? (
                <ItemSite key={KeyString} url={url} name={name} />
              ) : null
            return result
          })}
      </p>
    </div>
  )
}

export default React.memo(FooterInfo)
