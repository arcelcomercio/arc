import { useEditableContent } from 'fusion:content'
import * as React from 'react'

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
    'separator__btn position-absolute font-bold block text-black text-sm pt-10 pb-10 pr-15 pl-15 rounded-sm capitalize',
}

const SeparatorsBasicChildSeparator = (props) => {
  const {
    isAdmin,
    model,
    seeMore,
    seeMoreLink,
    textAling,
    items,
    arcSite,
    titleSeparator = '',
    titleLink = '/',
    htmlCode = '',
  } = props
  const { editableField } = useEditableContent()

  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.threeline
      break
  }

  const getImgUrl = (el) => {
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
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      ) : (
        <div className={classes.boxTitle}>
          <h2 itemProp="name" className={`${classes.title} text-${textAling}`}>
            <a
              itemProp="url"
              href={titleLink}
              className={`${classes.titleLink}`}
              {...editableField('titleSeparator')}
              suppressContentEditableWarning>
              {titleSeparator}
            </a>
          </h2>
          {seeMore && (
            <a itemProp="url" href={seeMoreLink} className={classes.showMore}>
              Ver más
            </a>
          )}
        </div>
      )}
      <div role="list" className={classes.body}>
        {items &&
          items.map((el) => (
            <SeparatorItem
              key={el.link || '/'}
              title={el.title}
              link={el.websiteLink}
              section={el.primarySection}
              sectionLink={el.primarySectionLink}
              numline={numline}
              imageUrl={getImgUrl(el)}
              lazyImage={el.multimediaLazyDefault}
              mediaIcon={el.multimediaType}
              isPremium={el.isPremium}
              isAdmin={isAdmin}
              arcSite={arcSite}
            />
          ))}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
