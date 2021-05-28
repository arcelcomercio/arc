import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'
import { Story } from 'types/story'

import {
  BIG_IMAGE,
  SPECIAL,
  SPECIAL_BASIC,
} from '../../../../utilities/constants/subtypes'
import StoryData from '../../../../utilities/story-data'
import { storyTagsBbc } from '../../../../utilities/tags'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildMultimedia from './_children/multimedia'

interface FeatureProps {
  data?: Story
}

const StoryMultimediaLte: FC<FeatureProps> = (props) => {
  const { arcSite, contextPath } = useAppContext()
  const { data } = props
  const {
    promoItems,
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
    arcSite,
  })
  return (
    <div className="s-multimedia">
      {primarySectionLink === '/impresa/' ||
      primarySectionLink === '/malcriadas/' ||
      primarySectionLink === '/el-otorongo/' ||
      storyTagsBbc(tags, 'portada-trome')
        ? promoItems?.basic && (
            <StoryContentsChildImpresa
              url={promoItems.basic.url}
              subtitle={promoItems.basic.subtitle}
            />
          )
        : promoItems &&
          subtype !== BIG_IMAGE &&
          subtype !== SPECIAL_BASIC &&
          subtype !== SPECIAL && (
            <StoryContentsChildMultimedia
              authorEmail={authorEmail}
              promoItems={promoItems}
              multimedia={multimedia}
              primarySection={primarySection}
              primaryImage
              completeImage
              promoItemJwplayer={promoItemJwplayer}
              classImage="s-multimedia"
              lite
            />
          )}
    </div>
  )
}

StoryMultimediaLte.label = 'Artículo - multimedia '

export default StoryMultimediaLte
