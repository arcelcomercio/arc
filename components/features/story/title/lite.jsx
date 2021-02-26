import React from 'react'

import { useFusionContext } from 'fusion:context'

import PremiumTag from './_children/premium'
import StoryData from '../../../utilities/story-data'
import { SITE_DEPOR } from '../../../utilities/constants/sitenames'

const classes = {
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
      {arcSite === SITE_DEPOR && (
        <h2 className={classes.category}>
          <a href={primarySectionLink}>{primarySection}</a>
        </h2>
      )}
      <h1 itemProp="name" className={classes.title}>
        {title}
      </h1>
      {items && type === 'list' ? (
        <div style={{ ' margin-right': '20px;', 'margin-left': '20px;' }}>
          <ul className={classes.listClasses}>
            {items.map(({ content }) => {
              return (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )
            })}
          </ul>
        </div>
      ) : (
        <>
          <h2 itemProp="name" className={classes.description}>
            {subTitle}
          </h2>
          <PremiumTag isPremium={isPremium} arcSite={arcSite} />
        </>
      )}
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
