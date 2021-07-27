import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  BIG_IMAGE,
  SPECIAL,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import { localISODate } from '../../../utilities/date-time/dates'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildMultimedia from './_children/multimedia'

const StoryMultimediaLte = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: data,
  } = useAppContext()

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
    multimedia,
    promoItemJwplayer,
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
    updatedDate: localISODate(updatedDate || createdDate),
    date,
    primarySectionLink,
    authorEmail,
    primarySection,
    subtype,
    ...promoItems,
    multimedia,
    primaryImage: true,
    completeImage: false,
    promoItemJwplayer,
    classImage: 's-multimedia',
    lite: true,
  }

  return (
    <div className="s-multimedia">
      {primarySectionLink === '/impresa/' ||
      primarySectionLink === '/malcriadas/' ||
      primarySectionLink === '/el-otorongo/' ||
      storyTagsBbc(tags, 'portada-trome')
        ? promoItems?.basic && (
            <StoryContentsChildImpresa
              url={promoItems?.basic?.url}
              subtitle={promoItems?.basic?.subtitle}
              height={promoItems?.basic?.height}
              width={promoItems?.basic?.width}
            />
          )
        : promoItems &&
          subtype !== BIG_IMAGE &&
          subtype !== SPECIAL_BASIC &&
          subtype !== SPECIAL && <StoryContentsChildMultimedia data={params} />}
    </div>
  )
}

StoryMultimediaLte.label = 'Artículo - multimedia '
StoryMultimediaLte.static = true

export default StoryMultimediaLte
