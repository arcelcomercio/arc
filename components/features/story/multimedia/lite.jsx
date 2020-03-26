import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  BIG_IMAGE,
  SPECIAL_BASIC,
  SPECIAL,
} from '../../../utilities/constants/subtypes'

import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildMultimedia from './_children/multimedia'
import { storyTagsBbc } from '../../../utilities/helpers'
import { getDateSeo } from '../../../utilities/date-time/dates'

const StoryMultimediaLte = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: data,
  } = useFusionContext()

  const {
    publishDate: date,
    promoItems,
    displayDate: updatedDate,
    createdDate,
    authorImage,
    authorLink,
    author,
    primarySection,
    authorEmail,
    primarySectionLink,
    subtype,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    tags,
  } = new StoryData({
    data,
    contextPath,
    deployment,
    arcSite,
  })

  const params = {
    authorImage,
    author,
    authorLink,
    updatedDate: getDateSeo(updatedDate || createdDate),
    date,
    primarySectionLink,
    authorEmail,
    primarySection,
    subtype,
    ...promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    classImage: 's-multimedia',
  }

  return (
    <>
      <div className="s-multimedia">
        {primarySectionLink === '/impresa/' ||
        primarySectionLink === '/malcriadas/' ||
        storyTagsBbc(tags, 'portada-trome')
          ? promoItems && <StoryContentsChildImpresa data={promoItems} />
          : promoItems &&
            subtype !== BIG_IMAGE &&
            subtype !== SPECIAL_BASIC &&
            subtype !== SPECIAL && (
              <StoryContentsChildMultimedia data={params} />
            )}
      </div>
    </>
  )
}

StoryMultimediaLte.label = 'Artículo - multimedia'
StoryMultimediaLte.static = true

export default StoryMultimediaLte
