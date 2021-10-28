import { useContent } from 'fusion:content'
import React from 'react'
import { FC } from 'types/features'
import { ArcSite, ContentConfig } from 'types/fusion'

import { formatSections } from '../../../../utilities/helpers'
// import Section from './_children/section'
import { SchemaHierarchy } from '../_dependencies/schema-filter'

interface Props {
  hierarchyConfig?: ContentConfig
  arcSite?: ArcSite
}

const classes = {
  wrapper: 'video-categories-list__wrapper',
}

const SectionsList: FC<Props> = (props) => {
  const DEFAULT_HIERARCHY = 'header-default'

  const { hierarchyConfig, arcSite } = props

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

  console.log('==========arrSections============')
  console.log(arrSections)
  console.log('=================================')

  return (
    <div className={classes.wrapper}>
      {/* {arrSections.map((el) => (
        <Section url={el.url} name={el.name} key={el.url} />
      ))} */}
    </div>
  )
}

export default SectionsList
