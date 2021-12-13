import { useFusionContext } from 'fusion:context'
import React from 'react'

import ShareButtons from '../../../global-components/lite/share'
import { SITE_DEPOR, SITE_TROME } from '../../../utilities/constants/sitenames'
import StoryData from '../../../utilities/story-data'
import PremiumTag from './_children/premium'
import customFields from './_dependencies/custom-fields'

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

  const isStoryV2VideoStyle = metaValue('section_style') === 'story-v2-video'
  const styleList = isStoryV2VideoStyle
    ? null
    : { marginRight: '20px', marginLeft: '20px' }

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
      {items &&
        type === 'list' &&
        !isStoryV2StandarStyle ? (
        <>
          <div style={styleList}>
            <ul className={classes.listClasses}>
              {items.map(({ content }) => (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              ))}
            </ul>
          </div>
          {isStoryV2VideoStyle && <ShareButtons renderScripts />}
        </>
      ) : (
        <>
          <h2 itemProp="name" className={classes.description}>
            {subTitle}
          </h2>
          {!isStoryV2StandarStyle && (
            <PremiumTag isPremium={isPremium} arcSite={arcSite} />
          )}
          {items &&
            type === 'list' &&
            isStoryV2StandarStyle && (
              <ul className={classes.listClasses}>
                {items.map(({ content }) => (
                  <>
                    <li dangerouslySetInnerHTML={{ __html: content }} />
                  </>
                ))}
              </ul>
            )}
          {(isStoryV2StandarStyle || isStoryV2VideoStyle) && (
            <ShareButtons renderScripts />
          )}
          {arcSite === SITE_TROME && contentElementsQuoteOne && (
            <div
              className={classes.related}
              dangerouslySetInnerHTML={{ __html: contentElementsQuoteOne }}
            />
          )}
        </>
      )}
    </>
  )
}
StoryTitleLite.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  customFields,
}
StoryTitleLite.label = 'Artículo - Título '
StoryTitleLite.static = true

export default StoryTitleLite
