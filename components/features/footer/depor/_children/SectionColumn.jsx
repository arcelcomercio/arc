import React from 'react'
import ItemTop from './ComponentStyles'

const classes = {
  sectionColumn:
    'footer-secction__content-column footer-secction__item-border flex flex-col',

  item: 'footer-secction__item',
}

const SectionColumn = () => {
  return (
    <ul className={classes.sectionColumn}>
      <li className={classes.item}>
        <a href="/" style={ItemTop}>
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

export default SectionColumn
