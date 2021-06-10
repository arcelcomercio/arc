import * as React from 'react'
import { FC } from 'types/features'
import { EmbedConfig, PromoItems, Story, Taxonomy } from 'types/story'

import {
  BIG_IMAGE,
  SPECIAL,
  SPECIAL_BASIC,
} from '../../../../utilities/constants/subtypes'
import { storyTagsBbc } from '../../../../utilities/tags'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildMultimedia from './_children/multimedia'

interface FeatureProps {
  data?: Story
  promoItems?: PromoItems
  primarySection?: string
  primarySectionLink?: string
  subtype?: string
  multimedia?: string
  promoItemJwplayer: EmbedConfig
  tags?: Taxonomy[]
}

const StoryChildrenMultimediaLte: FC<FeatureProps> = (props) => {
  const {
    promoItems,
    primarySection = '',
    primarySectionLink,
    subtype,
    multimedia,
    promoItemJwplayer,
    tags,
  } = props
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
            />
          )
        : promoItems &&
          subtype !== BIG_IMAGE &&
          subtype !== SPECIAL_BASIC &&
          subtype !== SPECIAL && (
            <StoryContentsChildMultimedia
              promoItems={promoItems}
              multimedia={multimedia as string}
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

StoryChildrenMultimediaLte.label = 'Artículo - multimedia '

export default StoryChildrenMultimediaLte
