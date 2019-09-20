/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { formatDayMonthYear } from '../../../utilities/helpers'

const PodcastSeparator = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleField = '',
      titleLinkField = '',
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: contentConfigValues,
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
              website_section {
                name
                path
              }
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
          website_url
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
      primarySection,
      primarySectionLink,
      mp3Path,
    } = storyData
    return {
      multimediaLandscapeL,
      websiteLink,
      date,
      title,
      subTitle,
      primarySection,
      primarySectionLink,
      mp3Path,
    }
  })

  const { primarySection, primarySectionLink } = stories[0] || {}

  return (
    <div className="podcast-separator md:pl-0 md:pr-0 pl-20 pr-20 pt-20 pb-20">
      <div className="podcast-separator__title-container flex justify-between pt-10 mb-20 border-t-1 border-solid border-black">
        <h2 className="podcast-separator__title">
          <a
            href={titleLinkField || primarySectionLink}
            className="podcast-separator__title-link title-xs font-bold secondary-font text-black">
            {titleField || primarySection || 'Episodios'}
          </a>
        </h2>
        <a
          href={titleLinkField || primarySectionLink}
          className="podcast-separator__title-button secondary-font font-bold text-sm text-black flex items-center">
          Ver todos
          <i className="icon-back podcast-separator__title-icon ml-5 text-sm font-bold"></i>
        </a>
      </div>
      <div className="podcast-separator__body">
        {stories.map(
          ({
            multimediaLandscapeL,
            websiteLink,
            date,
            title,
            subTitle,
            mp3Path,
          }) => (
            <div className="podcast-separator__item" key={websiteLink}>
              <a href={websiteLink} className="podcast-separator__img-link">
                <picture className="podcast-separator__picture">
                  <img
                    src={multimediaLandscapeL}
                    alt={title}
                    className="podcast-separator__img w-full"
                  />
                </picture>
              </a>
              <h3 className="podcast-separator__item-title mt-15 mb-15">
                <a
                  href={websiteLink}
                  className="podcast-separator_item-t-link text-xl font-bold secondary-font text-black">
                  {title}
                </a>
              </h3>
              <p className="podcast-separator__item-subtitle">
                <a
                  href={websiteLink}
                  className="podcast-separator__item-s-link text-md line-h-sm text-gray-300 secondary-font overflow-hidden block mb-10 line-h-sm">
                  {subTitle}
                </a>
              </p>
              <time
                dateTime={date}
                className="podcast-separator__time text-sm line-h-sm text-gray-300 secondary-font overflow-hidden text-gray-200 block mb-10">
                {date && formatDayMonthYear(date, false)}
              </time>
              <audio controls className="w-full">
                <source src={mp3Path} type="audio/mpeg" />
              </audio>
            </div>
          )
        )}
      </div>
    </div>
  )
}

PodcastSeparator.label = 'Podcast - Separador'
PodcastSeparator.static = true

PodcastSeparator.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      description:
        'El valor por defecto del campo "Título" es la sección principal de la primera noticia del contenido',
    }),
    titleLinkField: PropTypes.string.tag({
      name: 'Url del título',
      description:
        'El valor por defecto del campo " Url del título" es la url de la sección principal de la primera noticia del contenido',
    }),
  }),
}

export default PodcastSeparator
