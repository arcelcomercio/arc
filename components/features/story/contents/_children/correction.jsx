import React from 'react'
import { nlToBrTag } from '../../../../utilities/helpers'

const CORRECTION_TYPE_CORRECTION = 'correction'

export default ({ content = '', isAmp, type = CORRECTION_TYPE_CORRECTION }) => {
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

  return (
    <div className={classes.correction}>
      <span className={classes.title}>
        {type === CORRECTION_TYPE_CORRECTION ? 'Corrección: ' : 'Aclaración: '}
      </span>
      {nlToBrTag(content)}
    </div>
  )
}
