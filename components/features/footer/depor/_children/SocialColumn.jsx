import React from 'react'
import ItemTop from './ComponentStyles'

const classes = {
  socialColumn: 'footer-secction__content-column  flex flex-col',
  item: 'footer-secction__item',
}

const SocialColumnSection = () => {
  return (
    <ul className={classes.socialColumn}>
      <li className={classes.item}>
        <a href="/" style={ItemTop}>
          Twitter
        </a>
      </li>
      <li className={classes.item}>
        <a href="/">Twitter</a>
      </li>
      <li className={classes.item}>
        <a href="/">Facebook</a>
      </li>
      <li className={classes.item}>
        <a href="/">Google+</a>
      </li>
      <li className={classes.item}>
        <a href="/">Pinterest</a>
      </li>
      <li className={classes.item}>
        <a href="/">RSSs</a>
      </li>
      <li className={classes.item}>
        <a href="/" style={ItemTop}>
          Mapa del Sitio
        </a>
      </li>
    </ul>
  )
}

export default SocialColumnSection
