import { useFusionContext } from 'fusion:context'
import React from 'react'

import ShareButtons from '../../../global-components/lite/share'
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
    metaValue,
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

  const isStoryV2StandarStyle =
    metaValue('section_style') === 'story-v2-standard'

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
      {items && type === 'list' && !isStoryV2StandarStyle ? (
        <div style={{ marginRight: '20px', marginLeft: '20px' }}>
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
          {!isStoryV2StandarStyle && (
            <PremiumTag isPremium={isPremium} arcSite={arcSite} />
          )}
          {items && type === 'list' && isStoryV2StandarStyle && (
            <ul className={classes.listClasses}>
              {items.map(({ content }) => (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              ))}
            </ul>
          )}
          {isStoryV2StandarStyle && <ShareButtons renderScripts />}
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
