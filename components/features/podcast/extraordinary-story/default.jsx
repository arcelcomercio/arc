/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import Icon from '../../../global-components/multimedia-icon'
import StoryData from '../../../utilities/story-data'
import {
  includeSections,
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'

const PodcastExtraordinazryStory = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const presets = 'landscape_l:648x374'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,promo_items.path_mp3.content,${includePromoItems},${includePrimarySection},${includeSections}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: `
      { 
        headlines { basic }
        subheadlines { basic }
        promo_items {
          path_mp3 {
            content
          }
          youtube_id {
            content
          }
          basic { 
            url 
            type 
            resized_urls { 
              landscape_l 
            } 
          }
          basic_video {
            promo_items {
              basic { 
                url 
                type 
                resized_urls { 
                  landscape_l 
                } 
              }
            }
          }
          basic_gallery {
            promo_items {
              basic { 
                url 
                type 
                resized_urls { 
                  landscape_l 
                } 
              }
            }
          }
        }
        websites {
          ${arcSite} {
            website_url
          }
        }
        taxonomy { 
          primary_section { 
            name
            path 
          }
          sections {
            name
            path 
          }
        }
      }
      `,
    }) || {}

  const {
    multimediaLandscapeL,
    websiteLink,
    primarySectionLink,
    primarySection,
    title,
    subTitle,
    mp3Path,
    multimediaType,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div className="podcast-extraordinary flex flex-wrap flex-col-reverse md:flex-row p-20 md:pl-0 md:pr-0 md:pt-20 md:pb-20">
      <div className="podcast-extraordinary__content flex flex-col justify-center pr-20 w-full">
        <div className="podcast-extraordinary__section-container flex items-center md:mb-10 md:mt-10 mb-15 mt-15">
          <h3 itemProp="name" className="podcast-extraordinary__section mr-10">
            <a
              itemProp="url"
              href={primarySectionLink}
              className="podcast-extraordinary__section-link text-lg text-gray-200 font-bold">
              {primarySection}
            </a>
          </h3>
          <span className="podcast-extraordinary__tag text-sm font-bold text-white rounded-lg pt-5 pb-5 pl-10 pr-10 secondary-font">
            Nuevo
          </span>
        </div>
        <h2 itemProp="name" className="podcast-extraordinary__title mb-15">
          <a
            itemProp="url"
            href={websiteLink}
            className="podcast-extraordinary__title-link text-black font-bold secondary-font line-h-xs">
            {title}
          </a>
        </h2>
        <p
          itemProp="description"
          className="podcast-extraordinary__subtitle mb-15">
          <a
            itemProp="url"
            href={websiteLink}
            className="podcast-extraordinary__subtitle-link text-md line-h-sm text-gray-300 secondary-font overflow-hidden">
            {subTitle}
          </a>
        </p>

        <audio controls className="w-full">
          <source src={mp3Path} type="audio/mpeg" />
        </audio>
      </div>
      <a
        itemProp="url"
        href={websiteLink}
        className="podcast-extraordinary__img-link w-full position-relative">
        <picture className="podcast-extraordinary__picture">
          <img
            src={multimediaLandscapeL}
            alt={title}
            className="podcast-extraordinary__img w-full object-cover"
          />
          <Icon type={multimediaType} iconClass="podcast-extraordinary__icon" />
        </picture>
      </a>
    </div>
  )
}

PodcastExtraordinazryStory.label = 'Podcast - Apertura Extraordinaria'
PodcastExtraordinazryStory.static = true

PodcastExtraordinazryStory.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default PodcastExtraordinazryStory
