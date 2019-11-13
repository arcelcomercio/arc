import React from 'react'

const classes = {
  sectionColumn:
    'footer-secction__content-column footer-secction__item-border flex flex-col',
  item: 'footer-secction__item',
}

const ItemLinkSubSection = ({ url, subsectionName }) => (
  <li className={classes.item}>
    <a href={url}>{subsectionName}</a>
  </li>
)

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
        <a href={urlSec} className={classes.itemTop}>
          {title}
        </a>
      </li>
      {listSubSections.map(
        ({ display_name: subsectionName = '', url = '' }, index) => {
          const keyString = `id${index}`
          return (
            <ItemLinkSubSection
              key={keyString}
              subsectionName={subsectionName}
              url={url}
            />
          )
        }
      )}
    </ul>
  )
}

export default SectionColumn
