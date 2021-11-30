import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import StoryData from '../../../utilities/story-data'
import ElePrincipal from '../../story/contents/_children/amp-ele-principal'
import StoryContentChildVideoJwplayer from '../../story/contents/_children/amp-video-jwplayer'
import StoryContentChildTags from '../../story/contents/_children/tags'
import StoryContentChildRelated from './_children/related'
import customFields from './_dependencies/custom-fields'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description: 'amp-sh__description mt-0 text-md text-gray-300 secondary-font',
  adsAmp: 'text-center ad-amp-movil',
  author: 'amp-story-content__author mt-15 mb-15 secondary-font',
  bbcHead: 'bbc-head',
}
const VideoSectionAmp = (props) => {
  const {
    globalContent: data,
    arcSite,
    contextPath,
    deployment,
    isAmp,
  } = useFusionContext()

  const { customFields: dataCustomFields } = props

  const {
    id,
    tags,
    promoItems,
    authorLink,
    author,
    promoItemJwplayer,
  } = new StoryData({
    data,
    contextPath,
  })

  const { basic: relatedContent = [] } =
    useContent({
      source: 'related-content',
      query: {
        _id: id,
        presets: 'no-presets',
      },
    }) || {}

  const activeAds = Object.keys(dataCustomFields).filter((prop) =>
    prop.match(/ampAdLoadBlock(\d)/)
  )

  return (
    <>
      <div className={classes.content}>
        {promoItemJwplayer && promoItemJwplayer.key ? (
          <StoryContentChildVideoJwplayer data={promoItemJwplayer} />
        ) : (
          <>{promoItems && <ElePrincipal data={promoItems} />}</>
        )}

        <p className={classes.author}>
          <a href={authorLink}>{author}</a>
        </p>

        {activeAds.map((el) => {
          let htmlPublicidad = ''
          if (
            dataCustomFields[el] === 3 ||
            dataCustomFields[el] === 4 ||
            dataCustomFields[el] === 5
          ) {
            const matches = el.match(/([0-9])+/)
            htmlPublicidad = dataCustomFields[`freeHtml${matches[1]}`]
          }
          return (
            <div
              className={classes.adsAmp}
              dangerouslySetInnerHTML={{
                __html: htmlPublicidad,
              }}
            />
          )
        })}

        <StoryContentChildTags data={tags} {...isAmp} />
        {relatedContent.length > 0 && (
          <div className={classes.related}>
            <div className={classes.relatedTitle}>Relacionadas </div>
            {relatedContent.map((item, i) => {
              const { type } = item
              const key = `related-${i}`
              return type !== ELEMENT_STORY ? (
                ''
              ) : (
                <StoryContentChildRelated
                  key={key}
                  {...item}
                  contextPath={contextPath}
                  arcSite={arcSite}
                  deployment={deployment}
                  isAmp="true"
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
VideoSectionAmp.propTypes = {
  customFields,
}

VideoSectionAmp.static = true
export default VideoSectionAmp
