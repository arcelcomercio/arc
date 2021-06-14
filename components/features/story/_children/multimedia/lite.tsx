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
  multimediaLarge: string
  multimediaLandscapeMD: string
  multimediaLandscapeS: string
  promoItemJwplayer: EmbedConfig
  tags?: Taxonomy[]
}

const StoryChildrenMultimediaLite: FC<FeatureProps> = (props) => {
  const {
    promoItems,
    primarySection = '',
    primarySectionLink,
    subtype,
    multimediaLarge,
    multimediaLandscapeMD,
    multimediaLandscapeS,
    promoItemJwplayer,
    tags,
  } = props
  return (
    <div className="s-multimedia">
      {subtype && (
        <>
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
                  multimediaLarge={multimediaLarge}
                  multimediaLandscapeMD={multimediaLandscapeMD}
                  multimediaLandscapeS={multimediaLandscapeS}
                  primarySection={primarySection}
                  primaryImage
                  completeImage
                  promoItemJwplayer={promoItemJwplayer}
                  classImage="s-multimedia"
                  lite
                />
              )}
        </>
      )}
    </div>
  )
}

StoryChildrenMultimediaLite.label = 'Artículo - multimedia '

export default StoryChildrenMultimediaLite
