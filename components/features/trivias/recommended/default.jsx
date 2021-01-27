import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import { includePromoItems } from '../../../utilities/included-fields'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import TriviaReItem from './_children/trivia-card'

const classes = {
  container: 'trivias-re',
  title: 'trivias-re__title',
}

/**
 *
 * @param {object} props
 * @param {boolean} props.clientResize
 * @param {object} props.customFields
 * @param {object} props.customFields.triviasConfig
 * @param {string} props.customFields.triviasConfig.contentService
 * @param {object} props.customFields.triviasConfig.contentConfigValues
 */
const TriviasRecommended = ({
  clientResize = false,
  customFields: {
    triviasConfig: {
      // default values
      contentService = 'story-feed-by-section',
      contentConfigValues = {
        section: '/trivias',
        stories_qty: 8,
      },
    } = {},
  } = {},
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
      <h2 className={classes.title}>
        <strong>+Trivias</strong> que te pueden interesar
      </h2>
      {trivias.map(({ multimedia, alt, title, websiteLink }) => {
        return (
          <TriviaReItem
            key={`trivia-list-${title}`}
            title={title}
            image={multimedia}
            alt={alt}
            link={websiteLink}
            clientResize={clientResize}
          />
        )
      })}
    </div>
  )
}

TriviasRecommended.propTypes = {
  customFields,
}

TriviasRecommended.label = 'Trivias Recomendadas'
TriviasRecommended.static = true

export default TriviasRecommended
