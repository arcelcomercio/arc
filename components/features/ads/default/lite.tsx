import * as React from 'react'
import { FC } from 'types/features'

import customFields from './_dependencies/custom-fields'

interface AdsFeatLiteProps {
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
    isContainer?: boolean
  }
}

const AdsFeatLite: FC<AdsFeatLiteProps> = (props) => {
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
      isContainer,
    } = {},
  } = props

  const getDiv = (): JSX.Element => (
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
  )

  if (isContainer === true && liteAdId) {
    return <div className={`content_${liteAdId}_ads`}>{getDiv()}</div>
  }
  if (liteAdId || liteAdName || liteAdDimensions) {
    return getDiv()
  }
  return null
}

AdsFeatLite.propTypes = {
  customFields,
}

AdsFeatLite.label = 'Publicidad'
AdsFeatLite.static = true

export default AdsFeatLite
