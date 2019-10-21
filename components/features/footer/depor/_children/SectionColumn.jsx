import React from 'react'
import ItemTop from './ComponentStyles'

const classes = {
  sectionColumn:
    'footer-secction__content-column footer-secction__item-border flex flex-col',

  item: 'footer-secction__item',
}

const SectionColumn = ({
  section: {
    name: title = '',
    _id: urlSec = '',
    children: listSubSections = [],
  } = {},
}) => {
  return (
    <ul className={classes.sectionColumn}>
      <li className={classes.item}>
        <a href={urlSec} style={ItemTop}>
          {title}
        </a>
      </li>
      {listSubSections.map(
        ({ display_name: subsectionName = '', url = '' }) => {
          return (
            <li className={classes.item}>
              <a href={url}>{subsectionName}</a>
            </li>
          )
        }
      )}
    </ul>
  )
}

export default SectionColumn
