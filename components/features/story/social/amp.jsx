import React from 'react'
import StorySocialAmpChildSocial from './_children/amp-social'
import NextStoryButton from '../next-story-button/amp'

const StorySocialAmp = () => {
  return (
    <div className="amp-sh__fixed flex justify-center pl-15 pr-15 border-b-1 border-solid border-gray">
      <StorySocialAmpChildSocial />
      <NextStoryButton buttonClass="amp-sh__next-story flex items-center justify-center secondary-font text-sm" />
    </div>
  )
}

StorySocialAmp.label = 'Artículo - redes sociales'
StorySocialAmp.static = true

export default StorySocialAmp
