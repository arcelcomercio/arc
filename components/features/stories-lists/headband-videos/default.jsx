/* eslint-disable no-undef */
import React from 'react'
import { useFusionContext } from 'fusion:context'

const classes = {
}


const HeadbandVideo = props => {
  const { contextPath, arcSite } = useFusionContext()

  const {
    customFields = {},
  } = props

  return (
    <>
      cintillo video
    </>
  )
}

HeadbandVideo.propTypes = {
  // customFields,
}

HeadbandVideo.label = 'Cintillo de Videos'
HeadbandVideo.static = true

export default HeadbandVideo
