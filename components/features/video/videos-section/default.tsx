import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'

import VideosSection from './_children/videos-section'
import customFields from './_dependencies/custom-fields'

interface Props {
  customFields?: {
    urlSection?: string
    nameSection?: string
  }
}

const VideoSectionsList: FC<Props> = (props) => {
  const { arcSite } = useAppContext()
  const {
    customFields: { urlSection = '/videos', nameSection = 'Videos' } = {},
  } = props

  return <VideosSection arcSite={arcSite} url={urlSection} name={nameSection} />
}

VideoSectionsList.label = 'Separador de videos de sección'

VideoSectionsList.static = true

VideoSectionsList.propTypes = {
  customFields,
}

export default VideoSectionsList
