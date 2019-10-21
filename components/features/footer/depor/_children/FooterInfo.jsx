import React from 'react'

const classes = {
  info: 'footer-secction__info',
  logo: 'footer-secction__image-logo',
}

const SITE_TITLE = 'Visite también: '

const ItemSite = ({ url, name }) => (
  <li>
    <a href={url}>{name}</a>
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
      <p>
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
      <a href={legalLinks[0].url}>{legalLinks[0].name} |</a>
      <a href={legalLinks[1].url}>{legalLinks[1].name} |</a>
      <a href={legalLinks[2].url}>{legalLinks[2].name} </a>
      <ul>
        <li>{SITE_TITLE}</li>
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
