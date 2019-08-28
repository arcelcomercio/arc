import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'
import SeparatorItem from './item'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-20 pb-15 pl-20 border-t-1 border-solid`,
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-lg',
  titleLink: 'separator__header-link font-bold',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 flex justify-between',
}

const SeparatorsBasicChildSeparator = props => {
  const {
    editableField,
    isAdmin,
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
      numline = classes.threeline
      break
  }
  const getImgUrl = el => {
    if (arcSite === 'peru21') {
      return el.multimediaPortraitMD
    }
    return el.multimediaLandscapeS
  }
  return (
    <div className={classes.separator}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      ) : (
        <h2 className={`${classes.title}`}>
          <a
            href={titleLink}
            className={`${classes.titleLink}`}
            {...editableField('titleSeparator')}
            suppressContentEditableWarning>
            {titleSeparator}
          </a>
        </h2>
      )}
      <div role="list" className={classes.body}>
        {items &&
          items.map(el => {
            const params = {
              title: el.title,
              link: el.link,
              numline,
              imageUrl: getImgUrl(el),
              lazyImage: el.multimediaLazyDefault,
              mediaIcon: el.multimediaType,
              isAdmin,
            }
            return <SeparatorItem key={el.link || '/'} {...params} />
          })}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
