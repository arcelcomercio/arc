import React from 'react'

import { useFusionContext } from 'fusion:context'

import PremiumTag from './_children/premium'
import StoryData from '../../../utilities/story-data'
import { SITE_DEPOR } from '../../../utilities/constants/sitenames'

const classes = {
  story: 'sht ',
  description: 'sht__summary',
  listClasses: 'sht__list',
  title: 'sht__title',
  category: 'sht__category',
}

const StoryTitleLite = () => {
  const { contextPath, globalContent: data, arcSite } = useFusionContext()

  const {
    title,
    subTitle,
    isPremium,
    primarySectionLink,
    primarySection,
    contentElementsListOne: { items = [], type = '' } = {},
  } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div
        className={`${classes.story} ${primarySectionLink.replace(/\//g, '')}`}>
        {arcSite === SITE_DEPOR && (
          <div className={classes.category}>{primarySection}</div>
        )}
        <h1 itemProp="name" className={classes.title}>
          {' '}
          {title}
        </h1>
        {items && type === 'list' ? (
          <ul className={classes.listClasses}>
            {items.map(({ content }) => {
              return (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )
            })}
          </ul>
        ) : (
          <>
            <h2 itemProp="name" className={classes.description}>
              {subTitle}
            </h2>
            <PremiumTag isPremium={isPremium} arcSite={arcSite} />
          </>
        )}
      </div>
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
