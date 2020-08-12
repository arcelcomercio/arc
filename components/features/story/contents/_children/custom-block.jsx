import React from 'react'
import { nlToBrTag } from '../../../../utilities/helpers'

const CUSTOMBLOCK_TYPE_BACKSTORY = 'backstory'

export default ({
  content = '',
  isAmp,
  type = CUSTOMBLOCK_TYPE_BACKSTORY,
}) => {
  const classes = {
    customblock: `${
      isAmp ? 'amp-story-content__customblock__backstory' : 'story-content__customblock__backstory'
    }  mb-10 mt-10 pr-10 pb-10 pt-10 pl-10`,
    title: `${
      isAmp
        ? 'amp-story-content__customblock__backstory__title'
        : 'story-content__customblock__backstory__title'
    }`,
  }

  const renderType = blockType => {
    let ret;
    switch(blockType){
      case 'backstory':
        ret = 'Cómo se hizo esta historia'
        break
      default: 
        ret = 'Cómo se hizo esta historia'
    }

    return ret
  }

  return (
    <div className={classes.customblock}>
      <span className={classes.title}>
        {renderType(type)}
      </span>
      {nlToBrTag(content)}
    </div>
  )
}