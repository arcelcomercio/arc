import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { separatorBasicFields } from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import SeparatorList from './_children/separator'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const STORIES_QTY_DEFAULT = 4
const CONTENT_SOURCE = 'story-feed-by-section'
const DEFAULT_TITLE = 'Últimas noticias'

const SeparatorBasic = (props) => {
  const {
    customFields: {
      section,
      titleSeparator,
      titleLink,
      htmlCode,
      model,
      seeMore,
      seeMoreLink,
      textAling,
    },
  } = props

  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const dataApi = useContent({
    source: CONTENT_SOURCE,
    query: {
      section,
      stories_qty: STORIES_QTY_DEFAULT,
      presets: 'landscape_s:234x161,portrait_md:314x374',
      includedFields: separatorBasicFields,
    },
    filter: schemaFilter(arcSite),
    transform: (data) => {
      const {
        content_elements: contentElements = [],
        section_name: sectionName = '',
      } = data || {}

      const dataFormat = new StoryData({
        deployment,
        contextPath,
        arcSite,
      })

      const newData =
        contentElements.length > 0
          ? contentElements.map((story) => {
              dataFormat.__data = story

              return {
                link: dataFormat.link,
                title: dataFormat.title,
                websiteLink: dataFormat.websiteLink,
                primarySection: dataFormat.primarySection,
                primarySectionLink: dataFormat.primarySectionLink,
                multimediaPortraitMD: dataFormat.multimediaPortraitMD,
                multimediaLandscapeS: dataFormat.multimediaLandscapeS,
                multimediaLazyDefault: dataFormat.multimediaLazyDefault,
                multimediaType: dataFormat.multimediaType,
                isPremium: dataFormat.isPremium,
              }
            })
          : []

      return { data: newData, sectionName }
    },
  })

  const { data, sectionName } = dataApi
  const title =
    titleSeparator ||
    (sectionName === 'Sección' && DEFAULT_TITLE) ||
    sectionName ||
    DEFAULT_TITLE

  const items = Object.values(data)

  return (
    <SeparatorList
      titleSeparator={title}
      arcSite={arcSite}
      titleLink={titleLink}
      htmlCode={htmlCode}
      items={items}
      isAdmin={isAdmin}
      model={model}
      seeMore={seeMore}
      seeMoreLink={seeMoreLink}
      textAling={textAling}
    />
  )
}

SeparatorBasic.propTypes = {
  customFields,
}

SeparatorBasic.label = 'Separador Básico'
SeparatorBasic.static = true

export default SeparatorBasic
