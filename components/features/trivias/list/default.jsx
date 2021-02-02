import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import { includePromoItems } from '../../../utilities/included-fields'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import TriviaListItem from './_children/trivia-card'

const classes = {
  container: 'trivias-list',
}

/**
 *
 * @param {object} props
 * @param {object} props.customFields
 * @param {object} props.customFields.triviasConfig
 * @param {string} props.customFields.triviasConfig.contentService
 * @param {object} props.customFields.triviasConfig.contentConfigValues
 */
const TriviasList = ({
  customFields: {
    triviasConfig: { contentService = '', contentConfigValues = {} } = {},
  },
}) => {
  const { arcSite } = useAppContext()
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems}`

  const trivias =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'no-presets',
        includedFields,
      }),
      schema: schemaFilter,
      transform: ({ content_elements: contentElements = [] } = {}) => {
        const data = contentElements.map(trivia => {
          const {
            headlines: { basic: title } = {},
            promo_items: { basic: { url, caption } = {} } = {},
            websites = {},
          } = trivia || {}
          const { website_url: websiteLink } = websites[arcSite] || {}

          return {
            title,
            multimedia: url,
            alt: caption,
            websiteLink,
          }
        })
        return data
      },
    }) || []

  return (
    <div className={classes.container}>
      {trivias.map(({ multimedia, alt, title, websiteLink }) => {
        return (
          <TriviaListItem
            key={`trivia-list-${title}`}
            title={title}
            image={multimedia}
            alt={alt}
            link={websiteLink}
          />
        )
      })}
    </div>
  )
}

TriviasList.propTypes = {
  customFields,
}

TriviasList.label = 'Trivias Listado'
TriviasList.static = true

export default TriviasList
