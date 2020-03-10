import React from 'react'

import { useFusionContext } from 'fusion:context'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import StorySeparatorChildItemAmp from '../interest-by-tag/_children/amp'
import { getResizedUrl } from '../../../utilities/resizer'

const classes = {
  storyInterest:
    'amp-story-interest flex flex-col w-full h-auto pr-20 pl-20 mx-auto amp-story-header',
  title:
    'amp-story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-15 text-center md:text-left',
}

const StoryRelatedAmp = () => {
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext()

  const { relatedContent: storyData } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const instance =
    storyData &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

  const presets = 'landscape_l:648x374,landscape_md:314x157'

  const getSize = () => {
    const dataStorys = storyData.map((story, i) => {
      if (story.type !== 'story') return false

      instance.__data = story

      const {
        landscape_md: multimediaLandscapeMD,
        landscape_l: multimediaLandscapeL,
      } =
        getResizedUrl({
          url: instance.multimediaLandscapeMD,
          presets,
          arcSite,
        }) || {}

      const data = {
        title: instance.title,
        link: `${instance.link}?ref=amp&source=relacionadas${
          instance.isPremium === false ? '&outputType=amp' : ''
        }`,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        lazyImage: instance.multimediaLazyDefault,
        multimediaLandscapeS: instance.multimediaLandscapeS,
        multimediaLandscapeL,
        multimediaLandscapeMD,
        multimediaType: instance.multimediaType,
        isAdmin,
      }
      return (
        <>
          <StorySeparatorChildItemAmp
            data={data}
            key={UtilListKey(i)}
            arcSite={arcSite}
          />
        </>
      )
    })
    return dataStorys
  }

  return (
    <>
      {storyData.length > 0 && (
        <div className={classes.storyInterest}>
          <div className={classes.title}>Relacionadas </div>
          {getSize()}
        </div>
      )}
    </>
  )
}

StoryRelatedAmp.label = 'Artículo - Te puede interesar'
StoryRelatedAmp.static = true

export default StoryRelatedAmp
