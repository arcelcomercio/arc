import React from 'react'

const classes = {
  footer: 'lay-foot f just-between',
  logo: 'lay-foot__logo',
  img: 'lay-foot__img',
  legal: 'lay-foot__legal f',
  item: 'lay-foot__item f f-col just-center ',
}

const SecondaryFooter = ({ story = [], logoUrl, arcSite }) => (
  <footer className={classes.footer}>
    {/* Logo */}

    <a itemProp="url" href="/" className={classes.logo}>
      <img className={classes.img} src={logoUrl} alt={`Logo de ${arcSite}`} />
    </a>
    {/* Cuerpo */}

    {/* Información del sitio */}
    <div className={classes.legal}>
      {story.map(({ position, name }) => (
        <div className={classes.item} key={position}>
          <div>{position}</div>
          <div>{name}</div>
        </div>
      ))}
    </div>
  </footer>
)

export default SecondaryFooter
