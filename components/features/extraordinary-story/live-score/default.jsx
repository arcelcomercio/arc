/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'

import { getPhotoId } from '../../../utilities/helpers'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l   
  }
}`

@Consumer
class ExtraordinaryStoryLifeScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {},
      count: 0,
    }

    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
        imgField,
      } = {},
      arcSite,
      contextPath,
      deployment,
    } = this.props

    this.fetchContent({
      story: {
        source: contentService,
        query: contentConfigValues,
        filter: schemaFilter(arcSite),
        transform(data) {
          const {
            title,
            subTitle,
            multimediaLandscapeL,
            websiteLink,
          } = new StoryData({
            data,
            arcSite,
            contextPath,
            deployment,
            defaultImgSize: 'sm',
          })
          return { title, subTitle, multimediaLandscapeL, websiteLink }
        },
      },
    })
    if (imgField) {
      const photoId = getPhotoId(imgField)
      if (photoId) {
        this.fetchContent({
          customPhoto: {
            source: PHOTO_SOURCE,
            query: {
              _id: photoId,
            },
            filter: PHOTO_SCHEMA,
          },
        })
      }
    }
  }

  componentDidMount() {
    this.setState({ count: Date.now() })
    const { customFields: { codeField } = {} } = this.props
    if (codeField) {
      this.fetch(Date.now())
      setInterval(() => {
        this.fetch()
      }, 5000)
    }
  }

  fetch(first) {
    const { count } = this.state
    const { customFields: { codeField = '' } = {} } = this.props

    const actualCount = first || count

    fetch(
      `https://w.ecodigital.pe/data/depor/${codeField}_xalok.js?_=${actualCount}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res, count: actualCount + 1 })
      })
      .catch(err => console.error(err))
  }

  render() {
    const {
      results: { data: { equipos: teams = [] } = {} } = {},
      story: { title, subTitle, multimediaLandscapeL, websiteLink } = {},
      customPhoto: { resized_urls: { landscape_l: landscapeL } = {} } = {},
    } = this.state || {}
    const {
      customFields: {
        codeField = '',
        titleField = '',
        subTitleField = '',
        isLive,
        imgField,
      } = {},
      editableField,
    } = this.props

    const [firstTeam = {}, secondTeam = {}] = teams

    return (
      <div className="extraordinary-l-score bg-gray-300 lg:flex flex-row-reverse">
        <a
          className="extraordinary-l-score__img-link block lg:p-20"
          href={websiteLink}>
          <picture className="extraordinary-l-score__picture">
            <img
              className="extraordinary-l-score__img w-full object-cover"
              src={landscapeL || imgField || multimediaLandscapeL}
              alt={title}
            />
          </picture>
        </a>
        <div className="extraordinary-l-score__content p-10 lg:p-20">
          {codeField && (
            <a
              href={websiteLink}
              className="extraordinary-l-score__score-content text-white flex mb-15">
              <div className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex justify-end items-center">
                {firstTeam.nombre || ''}
              </div>
              <div className="extraordinary-l-score__score p-10 title-xs font-bold bg-black flex items-center">{`${firstTeam.score ||
                ''} - ${secondTeam.score || ''}`}</div>
              <div className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex items-center">
                {secondTeam.nombre || ''}
              </div>
            </a>
          )}
          <h1 className="extraordinary-l-score__title mb-15">
            {isLive && (
              <div className="extraordinary-l-score__live text-white inline-block mr-10">
                <span className="extraordinary-l-score__live-icon inline-block rounded mr-5" />
                EN VIVO
              </div>
            )}
            <a
              href={websiteLink}
              className="extraordinary-l-score__title-link text-white title-md font-bold line-h-xs"
              {...editableField('titleField')}
              suppressContentEditableWarning>
              {titleField || title}
            </a>
          </h1>
          <p
            className="extraordinary-l-score__subtitle text-white hidden md:block text-lg line-h-sm mb-20"
            {...editableField('subTitleField')}
            suppressContentEditableWarning>
            {subTitleField || subTitle}
          </p>
        </div>
      </div>
    )
  }
}

ExtraordinaryStoryLifeScore.label = 'Apertura extraordinaria - En vivo'

ExtraordinaryStoryLifeScore.propTypes = {
  customFields: PropTypes.shape({
    codeField: PropTypes.string.tag({
      name: 'Código del partido',
    }),
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
    isLive: PropTypes.bool.tag({
      name: 'En vivo',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    subTitleField: PropTypes.string.tag({
      name: 'Bajada',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    imgField: PropTypes.string.tag({
      name: 'Imagen',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
  }),
}

export default ExtraordinaryStoryLifeScore
