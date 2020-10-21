/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { formatDayMonthYear } from '../../../utilities/date-time/dates'
import {
  includePromoItems,
  includePrimarySection,
  includeSections,
} from '../../../utilities/included-fields'

// TODO: Subir clases a objeto
// TODO: sacar schemaFilter

const PodcastList = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const presets = 'landscape_l:648x374'
  const includedFields = `headlines.basic,subheadlines.basic,promo_items.path_mp3.content,${includePromoItems},websites.${arcSite}.website_url,${includePrimarySection},${includeSections},display_date`

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: `
      {
        content_elements {
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
            basic_jwplayer {
              subtype
              type
              embed{
                config{
                  thumbnail_url
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
          display_date
        }
      }
      `,
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      multimediaLandscapeL,
      websiteLink,
      date,
      title,
      subTitle,
      mp3Path,
    } = storyData
    return {
      multimediaLandscapeL,
      websiteLink,
      date,
      title,
      subTitle,
      mp3Path,
    }
  })

  return (
    <div className="podcast-list md:pl-0 md:pr-0 pl-20 pr-20 pt-20 pb-20">
      <div className="podcast-list__title-container pt-10 mb-10 border-t-1 border-solid border-black">
        <h2
          itemProp="name"
          className="podcast-list__title title-xs font-bold secondary-font text-black">
          Todos los episodios
        </h2>
      </div>
      <div className="podcast-list__body">
        {stories.map(
          (
            {
              multimediaLandscapeL,
              websiteLink,
              date,
              title,
              subTitle,
              mp3Path,
            },
            i
          ) => (
            <div
              className="podcast-list__item md:flex pt-20 pb-20 border-b-1 border-solid border-gray"
              key={websiteLink}>
              <a
                itemProp="url"
                href={websiteLink}
                className="podcast-list__img-link">
                <picture className="podcast-list__picture">
                  <img
                    src={multimediaLandscapeL}
                    alt={title}
                    className="podcast-list__img w-full"
                  />
                </picture>
              </a>
              <div className="podcast-list__item-body pl-20">
                <h3
                  itemProp="name"
                  className="podcast-list__item-title mt-15 md:mt-0 mb-15">
                  <a
                    itemProp="url"
                    href={websiteLink}
                    className="podcast-list_item-t-link title-sm font-bold secondary-font text-black line-h-sm">
                    {title}
                  </a>
                  {i === 0 && (
                    <span className="podcast-list__tag text-sm font-bold text-white rounded-lg pt-5 pb-5 pl-10 pr-10 ml-10 secondary-font">
                      Nuevo
                    </span>
                  )}
                </h3>
                <p
                  itemProp="description"
                  className="podcast-list__item-subtitle">
                  <a
                    itemProp="url"
                    href={websiteLink}
                    className="podcast-list__item-s-link text-lg line-h-sm text-gray-300 secondary-font overflow-hidden block mb-10 line-h-md">
                    {subTitle}
                  </a>
                </p>
                <time
                  dateTime={date}
                  className="podcast-list__time text-sm line-h-sm text-gray-300 secondary-font overflow-hidden text-gray-200 block mb-10">
                  {date && formatDayMonthYear(date, false)}
                </time>
                <audio controls className="w-full">
                  <source src={mp3Path} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

PodcastList.label = 'Podcast - lista'
PodcastList.static = true

PodcastList.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default PodcastList
