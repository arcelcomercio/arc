import React from 'react'

const classes = {
  info: 'footer-secction__info',
  logo: 'footer-secction__image-logo',
  paragraph: 'footer-secction__text mt-20 mb-0',
  footerLink: 'footer-secction__link-footer',
  footerLinkNewDesign: 'footer-secction__link-footer__new-design',
  footerLinkNewDesignLastChild: 'footer-secction__link-footer__new-design__last-child',
  titleList: 'footer-secction__list-title',
  titleListNewDesign: 'footer-secction__list-title__new-design',
  listItem: 'footer-secction__site-item',
  listItemNewDesign: 'footer-secction__site-item__new-design',
}

const SITE_TITLE = 'Visite también: '

const ItemSite = ({ url, name, newDesign }) => (
  <a
    itemProp="url"
    className={`${classes.listItem} ${(newDesign) && classes.listItemNewDesign}`}
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
  newDesign
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
      {(!newDesign) && (
        <>
          <a itemProp="url" href={legalLinks[0].url} className={classes.footerLink}>
            {legalLinks[0].name} {"|"}
          </a>
          <a itemProp="url" href={legalLinks[1].url} className={classes.footerLink}>
            {legalLinks[1].name} {"|"}
          </a>
          <a itemProp="url" href={legalLinks[2].url} className={classes.footerLink}>
            {legalLinks[2].name} {""}
          </a>
        </>
      )}
      {(newDesign) && (
        <>
          <a itemProp="url" href={legalLinks[0].url} className={classes.footerLinkNewDesign}>
            {legalLinks[0].name}
          </a>
          <a itemProp="url" href={legalLinks[1].url} className={classes.footerLinkNewDesign}>
            {legalLinks[1].name}
          </a>
          <a itemProp="url" href={legalLinks[2].url}
            className={`${classes.footerLinkNewDesign} ${classes.footerLinkNewDesignLastChild}`}>
            {legalLinks[2].name}
          </a>
        </>
      )}
      <p itemProp="description">
        <h5 itemProp="name" className={`${(newDesign) ? classes.titleListNewDesign : classes.titleList}`}>
          {SITE_TITLE}
        </h5>
        {gecSites &&
          gecSites.map(({ url = '', name = '' }, index) => {
            const KeyString = `key${index}`
            const result =
              name !== 'depor.com' ? (
                <ItemSite key={KeyString} url={url} name={name} newDesign={newDesign} />
              ) : null
            return result
          })}
      </p>
    </div>
  )
}

export default React.memo(FooterInfo)
