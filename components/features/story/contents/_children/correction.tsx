import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { nlToBrTag } from '../../../../utilities/helpers'

const CORRECTION_TYPE_CORRECTION = 'correction'

const Correction: React.FC<{
  content?: string
  isAmp: boolean
  type?: string
}> = ({ content = '', isAmp, type = CORRECTION_TYPE_CORRECTION }) => {
  const classes = {
    correction: `${
      isAmp ? 'amp-story-content__correction' : 'story-content__correction'
    }  mb-10 mt-10 pr-10 pb-10 pt-10 pl-10`,
    title: `${
      isAmp
        ? 'amp-story-content__correction__title'
        : 'story-content__correction__title'
    }`,
  }

  const { metaValue } = useAppContext()
  const isStoryV2StandarStyle =
    metaValue('section_style') === 'story-v2-standard'

  const correctionText = isStoryV2StandarStyle ? 'CORRECCIONES' : 'Corrección: '
  const defaultText = isStoryV2StandarStyle ? 'ACLARACIONES' : 'Aclaración: '

  return (
    <div className={classes.correction}>
      <span className={classes.title}>
        {type === CORRECTION_TYPE_CORRECTION ? correctionText : defaultText}
      </span>
      {nlToBrTag(content)}
    </div>
  )
}

export default Correction
