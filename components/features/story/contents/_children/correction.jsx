import React from 'react'
import { nlToBrTag } from '../../../../utilities/helpers'

const CORRECTION_TYPE_CORRECTION = 'correction'
const CORRECTION_TYPE_CLARIFICATION = 'clarification'

export default ({
  content,
  isAmp,
  correctionType = CORRECTION_TYPE_CORRECTION,
}) => {
  const classes = {
    correction: `${
      isAmp ? 'amp-story-content__correction' : 'story-content__correction'
    }  mb-10 mt-10 mr-20 pr-10 pb-10 pt-10 pl-10`,
    title: `${
      isAmp
        ? 'amp-story-content__correction__title'
        : 'story-content__correction__title'
    } pb-10`,
  }

  return (
    <div className={classes.correction}>
      <h5 className={classes.title}>
        {correctionType === CORRECTION_TYPE_CORRECTION
          ? 'Corrección'
          : 'Aclaración'}
      </h5>
      {nlToBrTag(content)}
    </div>
  )
}
