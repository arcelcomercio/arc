import React from 'react'
import { useFusionContext } from 'fusion:context'
import StorySeparatorChildItemAmp from '../../story/interest-by-tag/_children/amp'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import StoriesRecent from '../../../global-components/stories-recent'

const classes = {
  storyInterest:
    'amp-story-interest flex flex-col w-full h-auto pr-20 pl-20 mx-auto amp-story-header',
  title:
    'amp-story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-15 text-center md:text-left',
  container: 'amp-story-interest__container block w-full h-auto ',
  list: 'amp-story-interest__list flex pl-20 pr-20',
}

const InterestByTag = () => {
  const {
    arcSite,
    globalContent: { _id: id },
    globalContent: storyDataPrimary,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext()

  const { primarySection, primarySectionLink } = new StoryData({
    data: storyDataPrimary,
    contextPath,
  })

  const parameters = {
    primarySectionLink,
    id,
    arcSite,
    cant: 6,
  }

  const resultStoryRecent = StoriesRecent(parameters)

  const instance =
    resultStoryRecent &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

  let key = 0

  const getSize = cant => {
    const dataStorys = resultStoryRecent.map((story, i) => {
      if (key === cant) return false
      instance.__data = story
      key += 1

      const data = {
        title: instance.title,
        link: `${instance.websiteLink}?ref=amp&source=mas-en-seccion`,
        section: instance.primarySection,
        sectionLink: instance.primarySectionLink,
        lazyImage: instance.multimediaLazyDefault,
        multimediaLandscapeS: instance.multimediaLandscapeS,
        multimediaLandscapeL: instance.multimediaLandscapeL,
        multimediaLandscapeMD: instance.multimediaLandscapeMD,
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
      {resultStoryRecent && resultStoryRecent[0] && (
        <div className={classes.storyInterest}>
          <div className={classes.title}>Más en {primarySection} </div>
          {getSize(6)}
        </div>
      )}
    </>
  )
}

InterestByTag.label = 'Artículo - Te puede interesar'
InterestByTag.static = true

export default InterestByTag
