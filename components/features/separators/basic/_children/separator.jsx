import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'
import SeparatorItem from './item'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-20 pb-15 pl-20 border-t-1 border-solid col-3 `,
  boxTitle: 'position-relative',
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-lg',
  titleLink: 'separator__header-link font-bold',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 flex justify-between',
  showMore:
    'separator__btn position-absolute font-bold block text-black text-sm pt-10 pb-10 pr-15 pl-15 rounded-sm',
}

const SeparatorsBasicChildSeparator = props => {
  const {
    editableField,
    isAdmin,
    model,
    seeMore,
    seeMoreLink,
    textAling,
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
    <div
      className={`${classes.separator} ${
        model === 'video' ? 'separator--video' : ''
      }`}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      ) : (
        <div className={classes.boxTitle}>
          <h2 className={`${classes.title} text-${textAling}`}>
            <a
              href={titleLink}
              className={`${classes.titleLink}`}
              {...editableField('titleSeparator')}
              suppressContentEditableWarning>
              {titleSeparator}
            </a>
          </h2>
          {seeMore && (
            <a href={seeMoreLink} className={classes.showMore}>
              Ver Mas
            </a>
          )}
        </div>
      )}
      <div role="list" className={classes.body}>
        {items &&
          items.map(el => {
            const params = {
              title: el.title,
              link: el.link,
              section: el.primarySection,
              sectionLink: el.primarySectionLink,
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
