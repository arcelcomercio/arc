/* eslint-disable react/no-unused-state */
import React from 'react'

import customFields from './_dependencies/custom-fields'

const BreakingNewsAmp = props => {
  const {
    customFields: { title, subTitle, storyLink = '' },
  } = props

  return <></>
}

BreakingNewsAmp.propTypes = {
  customFields,
}

BreakingNewsAmp.label = 'Cintillo Urgente'

export default BreakingNewsAmp
