import React from 'react'
import { createMarkup, getMultimediaIcon } from '../../../../utilities/helpers'
import SeparatorItem from './item'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-15 pb-15 pl-15 grid border-1 border-solid border-gray`,
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-sm',
  titleLink: 'separator__header-link',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 grid',
}

const SeparatorsBasicChildSeparator = props => {
  const {
    editableField,
    data: {
      items,
      arcSite,
      titleSeparator = '',
      titleLink = '/',
      htmlCode = '',
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
    case 'publimetro':
      numline = classes.threeline
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
          <a
            href={titleLink}
            className={`${classes.titleLink}`}
            {...editableField('titleSeparator')}
            suppressContentEditableWarning>
            {titleSeparator}
          </a>
        </h1>
      )}
      <div role="list" className={classes.body}>
        {items &&
          items.map(el => {
            const params = {
              title: el.title,
              link: el.link,
              numline,
              imageUrl: el.multimedia,
              mediaIcon: getMultimediaIcon(el.multimediaType),
            }
            return <SeparatorItem key={el.link || '/'} {...params} />
          })}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
