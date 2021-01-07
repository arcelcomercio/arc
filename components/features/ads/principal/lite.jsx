import * as React from 'react'
import customFields from '../_dependencies/custom-fields'

const AdsFeatLite = props => {
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

  return (
    <>
      {liteAdId || liteAdName || liteAdDimensions ? (
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
      ) : null}
    </>
  )
}

AdsFeatLite.propTypes = {
  customFields,
}

AdsFeatLite.label = 'Publicidad - Beta'
AdsFeatLite.static = true

export default AdsFeatLite
