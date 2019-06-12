import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'
import SeparatorItem from './item'

const classes = {
  separator: 'separator mt-20 w-full pt-0 pr-15 pb-15 pl-15',
  headerHtml: 'separator__header-html mt-0 mb-10',
  title: 'separator__header-title uppercase pb-20 pt-20',
  titleLink: 'separator__header-link',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0',
}

const SeparatorsBasicChildSeparator = props => {
  const {
    data: {
      titleSeparator = '',
      arcSite,
      titleLink = '/',
      htmlCode = '',
      items,
    } = {},
  } = props
  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twoline
      break
  }
  return (
    <div className={classes.separator}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      ) : (
        <h1 className={`${classes.title}`}>
          <a href={titleLink} className={`${classes.titleLink}`}>
            {titleSeparator}
          </a>
        </h1>
      )}
      <div className={classes.body}>
        {items &&
          items.map(el => {
            const params = {
              title: el.title,
              link: el.link,
              numline,
              imageUrl: el.multimedia,
              typeNote: el.multimediaType,
            }
            return <SeparatorItem key={el.link || '/'} {...params} />
          })}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
