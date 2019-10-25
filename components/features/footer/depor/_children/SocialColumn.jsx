import React from 'react'
import ItemTop from './ComponentStyles'

const classes = {
  socialColumn: 'footer-secction__content-column  flex flex-col',
  item: 'footer-secction__item',
}

const ItemLink = ({ url, name }) => (
  <li>
    <a href={url} rel="noopener noreferrer" target="_blank">
      {name}
    </a>
  </li>
)

const SocialColumnSection = ({ socialNetworks }) => {
  return (
    <ul className={classes.socialColumn}>
      <li className={classes.item} style={ItemTop}>
        Síguenos
      </li>
      {socialNetworks &&
        socialNetworks.map(({ name, url }, index) => {
          const keyString = `id${index}`
          return <ItemLink key={keyString} name={name} url={url} />
        })}
     
    </ul>
  )
}

export default SocialColumnSection
