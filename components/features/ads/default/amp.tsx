import * as React from 'react'
import { FC } from 'types/features'

import customFields from './_dependencies/custom-fields'

interface AdsFeatAmpProps {
  customFields?: {
    ampAdjson?: string
    ampAdName?: string
    ampAdDimensions?: string
    ampAdInlineStyles?: string
    isContainer?: boolean
    ampAdSticky?: boolean
  }
}

const AdsFeatAmp: FC<AdsFeatAmpProps> = (props) => {
  const {
    customFields: {
      ampAdjson,
      ampAdName,
      ampAdDimensions,
      ampAdInlineStyles,
      ampAdSticky,
    } = {},
  } = props
  const medida = (ampAdDimensions && ampAdDimensions.split('x')) || []
  const width = medida[0]
  const height = medida[1]

  const getDiv = () =>
    `<amp-ad data-loading-strategy="prefer-viewability-over-views" type="doubleclick"  data-slot=${ampAdName} width="${width}"  height="${height}" json="${ampAdjson}" />`
  if (ampAdSticky) {
    return (
      <>
        <amp-sticky-ad
          layout="nodisplay"
          class="ad-amp-movil"
          dangerouslySetInnerHTML={{ __html: getDiv() }}
        />
      </>
    )
  }
  if (ampAdName) {
    return (
      <div
        style={ampAdInlineStyles && (JSON.parse(ampAdInlineStyles) || {})}
        className="text-center ad-amp-movil"
        dangerouslySetInnerHTML={{ __html: getDiv() }}
      />
    )
  }

  return null
}

AdsFeatAmp.propTypes = {
  customFields,
}

AdsFeatAmp.label = 'Publicidad'
AdsFeatAmp.static = true

export default AdsFeatAmp
