import { useFusionContext } from 'fusion:context'
import React from 'react'

import { SITE_DEPOR } from '../../../utilities/constants/sitenames'
import StoryData from '../../../utilities/story-data'
import PremiumTag from './_children/premium'

const classes = {
  description: 'sht__summary',
  listClasses: 'sht__list',
  title: 'sht__title',
  category: 'sht__category',
  related: 'sht__related',
}

const StoryTitleLite = () => {
  const {
    contextPath,
    globalContent: data,
    arcSite,
    requestUri,
  } = useFusionContext()

  const {
    title,
    subTitle,
    isPremium,
    primarySectionLink,
    primarySection,
    contentElementsListOne: { items = [], type = '' } = {},
    contentElementsQuoteOne,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
  })

  return (
    <>
      {arcSite === SITE_DEPOR &&
      !(/^\/mexico\//.test(requestUri) || /^\/colombia\//.test(requestUri)) ? (
        <div id="spc_post_stories" />
      ) : null}
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
            {items.map(({ content }) => (
              <>
                <li dangerouslySetInnerHTML={{ __html: content }} />
              </>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h2 itemProp="name" className={classes.description}>
            {subTitle}
          </h2>
          {contentElementsQuoteOne && (
            <div
              className={classes.related}
              dangerouslySetInnerHTML={{ __html: contentElementsQuoteOne }}
            />
          )}
          <PremiumTag isPremium={isPremium} arcSite={arcSite} />
        </>
      )}
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
