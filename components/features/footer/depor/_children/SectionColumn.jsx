import React from 'react'

const classes = {
  sectionColumn:
    'footer-secction__content-column footer-secction__item-border flex flex-col',
  item: 'footer-secction__item',
}

const ItemLinkSubSection = ({ url, subsectionName, isBold }) => (
  <li className={`${classes.item} ${isBold ? 'footer-secction__bold' : ''}`}>
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
          let subItemName = subsectionName
          const rawMatch = subItemName.match(/\[.*\]/g)
          const match =
            rawMatch === null
              ? ''
              : rawMatch[0].replace('[', '').replace(']', '')

          if (match) {
            subItemName = subItemName.replace(/\[.*\]/g, '')
          }
          return (
            <ItemLinkSubSection
              key={keyString}
              subsectionName={subItemName}
              url={url}
              isBold={match === 'bold'}
            />
          )
        }
      )}
    </ul>
  )
}

export default SectionColumn
