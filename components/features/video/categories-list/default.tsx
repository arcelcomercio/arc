import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import Section from './_children/section'
import {
  SchemaHierarchy,
  SchemaMultiStory,
  SchemaSingleStory,
} from './_dependencies/schema-filter'

import customFields from './_dependencies/custom-fields'
import { formatSections } from '../../../utilities/helpers'

interface Props {
  customFields?: {
    hierarchyConfig?: string
  }
}

const classes = {
  wrapper: 'video-categories-list__wrapper',
}

const VideoCategoriesList: FC<Props> = (props) => {
  const DEFAULT_HIERARCHY = 'header-default'

  const {
    arcSite,
  } = useAppContext()

  const {
    customFields: {
      hierarchyConfig,
    } = {},
  } = props

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
      filter: SchemaHierarchy,
    }) || {}

  const arrSections = formatSections(dataHierarchy)

  return (
    <div className={classes.wrapper}>
      { arrSections.map((el) => (
          <Section section={el} />
        ))
      }
    </div>
  )
}

VideoCategoriesList.label = 'Listado de videos de categorías'

VideoCategoriesList.propTypes = {
  customFields,
}

export default VideoCategoriesList