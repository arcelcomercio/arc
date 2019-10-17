import React from 'react'

const classes = {
  footer: 'footer-secction flex flex-row bg-white',
  contentColumn: 'footer-secction__content-column flex flex-col',
  item: 'footer-secction__item',
}
const itemTop = {
  color: '#007c31',
  fontWeight: 'bold',
}

const SectionColumn = () => {
  return (
    <ul className={classes.contentColumn}>
      <li className={classes.item}>
        <a href="/" style={itemTop}>
          seccion
        </a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
      <li className={classes.item}>
        <a href="/">sub seccion</a>
      </li>
    </ul>
  )
}

const SocialColumnSection = () => {
  return (
    <ul>
      <li className={classes.item}>
        <a href="/" style={itemTop}>
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
        <a href="/" style={itemTop}>
          Mapa del Sitio
        </a>
      </li>
    </ul>
  )
}

const SectionFooter = () => {
  return (
    <footer className={classes.footer}>
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SocialColumnSection />
    </footer>
  )
}

export default SectionFooter
