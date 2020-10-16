import React from 'react'
import StorySocialAmpChildSocial from './_children/amp-social'
import NextStoryButton from '../next-story-button/amp'

const classes = {
  container:
    'amp-sh__fixed flex justify-center pl-15 pr-15 border-b-1 border-solid border-gray',
  buttonClass:
    'amp-sh__next-story flex items-center justify-center secondary-font text-sm',
  arrowClass: 'text-xl',
}

const StorySocialAmp = () => {
  return (
    <div className={classes.container}>
      <StorySocialAmpChildSocial />
      <NextStoryButton
        buttonClass={classes.buttonClass}
        arrowClass={classes.arrowClass}
      />
    </div>
  )
}

StorySocialAmp.label = 'Artículo - redes sociales'
StorySocialAmp.static = true

export default StorySocialAmp
