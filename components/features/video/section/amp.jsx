import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import {
  publicidadAmp,
  publicidadAmpAd,
} from '../../../utilities/story/helpers-amp'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import ElePrincipal from '../../story/contents/_children/amp-ele-principal'
import StoryContentChildVideoJwplayer from '../../story/contents/_children/amp-video-jwplayer'
import StoryContentChildTags from '../../story/contents/_children/tags'
import StorySocialChildAmpSocial from '../../story/social/_children/amp-social'
import StoryContentChildRelated from './_children/related'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description: 'amp-sh__description mt-0 text-md text-gray-300 secondary-font',
  adsAmp: 'text-center ad-amp-movil',
  author: 'amp-story-content__author mt-15 mb-15 secondary-font',
  bbcHead: 'bbc-head',
}
const VideoSectionAmp = () => {
  const {
    globalContent: data,
    arcSite,
    contextPath,
    deployment,
    isAmp,
    siteProperties: { adsAmp },
  } = useFusionContext()

  const {
    id,
    title,
    subTitle,
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

  const namePublicidad = arcSite !== 'peru21g21' ? arcSite : 'peru21'

  const width = '300'
  const height = '250'
  const parametersCaja1 = {
    // top
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja1`,
    width: '320',
    height: '100',
    movil1: false,
    arcSite,
  }

  const parametersCaja2 = {
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja2`,
    width,
    height,
    movil1: true,
    arcSite,
  }

  const parametersCaja3 = {
    // movil4 caja4 caja3
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja3`,
    width,
    height,
    movil1: true,
    arcSite,
  }
  const parametersCaja4 = {
    // movil5 caja5 caja4
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja4`,
    width,
    height,
    movil1: true,
    arcSite,
  }

  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

  return (
    <>
      <div className={classes.stories}>
        <header>
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parametersCaja1)}
          />
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <amp-img
                  alt="BBC"
                  layout="responsive"
                  width="500"
                  height="30"
                  src={imgBbc}
                  data-src={imgBbc}
                />
              </a>
            </div>
          )}
          <h1 className={classes.titleAmp}>{title}</h1>
        </header>
        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmp(parametersCaja2)}
        />

        <div className={classes.description}> {subTitle}</div>
        <StorySocialChildAmpSocial />
      </div>
      <div className={classes.content}>
        {promoItemJwplayer && promoItemJwplayer.key ? (
          <StoryContentChildVideoJwplayer
            data={promoItemJwplayer} />
        ) : (
          <>{promoItems && <ElePrincipal data={promoItems} />}</>
        )}

        <p className={classes.author}>
          <a href={authorLink}>{author}</a>
        </p>

        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja3)}
        />
        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja4)}
        />
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

VideoSectionAmp.static = true
export default VideoSectionAmp
