import * as React from 'react'

import { FC } from '../../../../types/features'
import customFields from './_dependencies/custom-fields'

interface AdsFeatMonoProps {
  customFields?: {
    liteAdId?: string
    liteAdName?: string
    liteAdDimensions?: string
    liteAdMobileDimensions?: string
    liteAdLoadFirst?: boolean
    liteAdLoadBlock?: '0' | '1' | '2' | '3' | '4'
    liteAdInlineStyles?: string
    prebidAdEnabled?: boolean
    prebidAdDimensions?: string
  }
}

const AdsFeatMono: FC<AdsFeatMonoProps> = props => {
  const {
    customFields: {
      liteAdId,
      liteAdName,
      liteAdDimensions,
      liteAdMobileDimensions,
      liteAdLoadFirst,
      liteAdLoadBlock,
      liteAdInlineStyles,
      prebidAdEnabled,
      prebidAdDimensions,
    } = {},
  } = props

  return liteAdId || liteAdName || liteAdDimensions ? (
    <div
      id={liteAdId}
      data-ads-name={liteAdName}
      data-ads-dimensions={liteAdDimensions}
      data-ads-dimensions-m={liteAdMobileDimensions}
      data-ads-load-first={liteAdLoadFirst}
      data-bloque={liteAdLoadBlock}
      data-prebid-enabled={prebidAdEnabled}
      data-prebid-dimensions={prebidAdDimensions}
      style={liteAdInlineStyles && (JSON.parse(liteAdInlineStyles) || {})}
    />
  ) : null
}

AdsFeatMono.propTypes = {
  customFields,
}

AdsFeatMono.label = 'Publicidad'
// AdsFeatMono.static = true

export default AdsFeatMono
