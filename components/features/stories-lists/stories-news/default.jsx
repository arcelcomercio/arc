import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { reduceWord } from '../../../utilities/helpers'
import StoryItem from '../../../global-components/story-new'
import Ads from '../../../global-components/ads'

const classes = {
  listado: 'w-full',
  listadoSeeMore: 'story-item__btn flex justify-center mt-20 uppercase',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListNew = props => {
  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      seeMoreLink,
    } = {},
  } = props
  const customFieldsProps = customFields

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const { content_elements: contentElements } = data || {}
  const stories = contentElements || []

  const activeAds = Object.keys(customFieldsProps)
    .filter(prop => prop.match(/adsMobile(\d)/))
    .filter(key => customFieldsProps[key] === true)

  const activeAdsArray = activeAds.map(el => {
    return {
      name: `movil${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }
  })

  const Story = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  return (
    <div className={classes.listado}>
      <div>
        {stories &&
          stories.map((story, index) => {
            console.log(story, 'HISTORIAAAAAAAAAAAAAAAA')
            const ads = hasAds(index + 1, activeAdsArray)
            Story.__data = story
            const {
              primarySectionLink,
              primarySection,
              date,
              websiteLink,
              title,
              subTitle,
              authorLink,
              author,
              multimediaType,
              multimediaLandscapeXS,
              multimediaLazyDefault,
              multimediaLandscapeS,
            } = Story
            return (
              <>
                <StoryItem
                  {...{
                    isAdmin,
                    primarySectionLink,
                    primarySection,
                    date,
                    websiteLink,
                    title: reduceWord(title),
                    subTitle: reduceWord(subTitle),
                    authorLink,
                    author,
                    multimediaType,
                    multimediaLandscapeXS,
                    multimediaLazyDefault,
                    multimediaLandscapeS,
                    formato: 'row',
                  }}
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads adElement={ads[0].name} isDesktop={false} isMobile />
                  </div>
                )}
              </>
            )
          })}
      </div>
      <div className={classes.listadoSeeMore}>
        <a href={seeMoreLink} tabIndex="0" role="button">
          Ver más
        </a>
      </div>
    </div>
  )
}

StoriesListNew.propTypes = {
  customFields,
}

StoriesListNew.label = 'Listado de Noticia'
// StoriesListNew.static = true

export default StoriesListNew
