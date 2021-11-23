import React from 'react'

import { addSlashToEnd } from '../../../../utilities/parse/strings'

const classes = {
  sectionColumn:
    'footer-secction__content-column footer-secction__item-border flex flex-col',
  item: 'footer-secction__item',
  itemTitle: 'footer-secction__item__title',
}

const ItemLinkSubSection = ({ url, subsectionName, isBold }) => (
  <li className={`${classes.item} ${isBold ? 'footer-secction__bold' : ''}`}>
    <a itemProp="url" href={addSlashToEnd(url)}>
      {subsectionName}
    </a>
  </li>
)

const SectionColumn = ({
  section: {
    name: title = '',
    _id: urlSec = '',
    children: listSubSections = [],
  } = {},
}) => (
  <ul className={classes.sectionColumn}>
    <li className={`${classes.item} ${classes.itemTitle}`}>
      <a itemProp="url" href={urlSec} className={classes.itemTop}>
        {title}
      </a>
    </li>
    {listSubSections.map(
      ({ display_name: subsectionName = '', url = '' }, index) => {
        const keyString = `id${index}`
        let subItemName = subsectionName
        const rawMatch = subItemName.match(/\[.*\]/g)
        const match =
          rawMatch === null ? '' : rawMatch[0].replace('[', '').replace(']', '')

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

export default React.memo(SectionColumn)
