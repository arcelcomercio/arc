import React from 'react'

const classes = {
  info: 'footer-secction__info',
  logo: 'footer-secction__image-logo',
  paragraph: 'mt-10 mb-10',
  footerLink: 'footer-secction__link-footer',
  titleList: 'footer-secction__list-title',
  listItem: 'footer-secction__site-item',
}

const SITE_TITLE = 'Visite también: '

const ItemSite = ({ url, name }) => (
  <li className={classes.listItem}>
    <a href={url}> {name}</a>
  </li>
)

const FooterInfo = ({
  siteUrl,
  imageDefault,
  gecSites,
  legalLinks,
  contacts,
  corporateInfo,
  draftingContact,
  copyrightText,
}) => {
  return (
    <div className={classes.info}>
      <a href={siteUrl}>
        <img src={imageDefault} className={classes.logo} alt="depor.com" />
      </a>
      <p className={classes.paragraph}>
        {contacts &&
          `${contacts[0].position}: ${contacts[0].name} ${
            contacts[1].position
          }: ${contacts[1].name} ${corporateInfo.name}: ${
            corporateInfo.direction
          }`}
        <br />
        {`${draftingContact[0].name}: ${draftingContact[0].value} | ${
          draftingContact[1].name
        }: ${draftingContact[1].value}`}
        <br />
        {copyrightText}
      </p>
      <a href={legalLinks[0].url} className={classes.footerLink}>
        {legalLinks[0].name} |
      </a>
      <a href={legalLinks[1].url} className={classes.footerLink}>
        {legalLinks[1].name} |
      </a>
      <a href={legalLinks[2].url} className={classes.footerLink}>
        {legalLinks[2].name}{' '}
      </a>
      <ul>
        <li className={classes.titleList}>{SITE_TITLE}</li>
        {gecSites &&
          gecSites.map(({ url = '', name = '' }, index) => {
            const KeyString = `key${index}`
            const result =
              name !== 'depor.com' ? (
                <ItemSite key={KeyString} url={url} name={name} />
              ) : null
            return result
          })}
      </ul>
    </div>
  )
}

export default FooterInfo
