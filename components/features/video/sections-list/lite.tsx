import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import { ContentConfig } from 'types/fusion'

import SectionsList from './_children/sections-list'
import customFields from './_dependencies/custom-fields'

interface Props {
  customFields?: {
    hierarchyConfig?: ContentConfig
  }
}

const VideoSectionsList: FC<Props> = (props) => {
  const { arcSite } = useAppContext()
  const { customFields: { hierarchyConfig } = {} } = props

  return <SectionsList arcSite={arcSite} hierarchyConfig={hierarchyConfig} />
}

VideoSectionsList.label = 'Listado de videos de secciones'

VideoSectionsList.static = true

VideoSectionsList.propTypes = {
  customFields,
}

export default VideoSectionsList
