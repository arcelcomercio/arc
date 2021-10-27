import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import { ContentConfig } from 'types/fusion'

import { formatSections } from '../../../utilities/helpers'
import Section from './_children/section'
import customFields from './_dependencies/custom-fields'
import { SchemaHierarchy } from './_dependencies/schema-filter'

interface Props {
  customFields?: {
    hierarchyConfig?: ContentConfig
  }
}

const classes = {
  wrapper: 'video-categories-list__wrapper',
}

const VideoSectionsList: FC<Props> = (props) => {
  const DEFAULT_HIERARCHY = 'header-default'

  const { arcSite } = useAppContext()

  const { customFields: { hierarchyConfig } = {} } = props

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const sourceHierarchy = isHierarchyReady
    ? contentService
    : 'navigation-by-hierarchy'
  const paramsFetch = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: DEFAULT_HIERARCHY,
      }

  const dataHierarchy =
    useContent({
      source: sourceHierarchy,
      query: paramsFetch,
      filter: SchemaHierarchy(),
    }) || {}

  const arrSections = formatSections(dataHierarchy)

  return (
    <div className={classes.wrapper}>
      {arrSections.map((el) => (
        <Section url={el.url} name={el.name} key={el.url} />
      ))}
    </div>
  )
}

VideoSectionsList.label = 'Listado de videos de secciones'

VideoSectionsList.static = true

VideoSectionsList.propTypes = {
  customFields,
}

export default VideoSectionsList
