import React, { useState, useEffect } from 'react'
import { useContent, useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import { getPhotoId } from '../../../utilities/helpers'
import { includePromoItems } from '../../../utilities/included-fields'

const PHOTO_SOURCE = 'photo-resizer'

const ExtraordinaryStoryLifeScore = props => {
  const { customFields } = props
  const {
    storyConfig: { contentService = '', contentConfigValues = {} } = {},
    codeField = '',
    titleField = '',
    subTitleField = '',
    isLive,
    imgField,
  } = customFields || {}

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const { editableField } = useEditableContent()

  const [results, setResults] = useState({})
  const [count, setCount] = useState(0)

  const presets = 'landscape_l:648x374'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,${includePromoItems}`

  const story = useContent({
    source: contentService,
    query: Object.assign(contentConfigValues, { presets, includedFields }),
    filter: schemaFilter(arcSite),
    transform(data) {
      const {
        title,
        subTitle,
        multimediaLandscapeL,
        websiteLink,
        multimediaLazyDefault,
      } = new StoryData({
        data,
        arcSite,
        contextPath,
        deployment,
        defaultImgSize: 'md',
      })
      return {
        title,
        subTitle,
        multimediaLandscapeL,
        websiteLink,
        multimediaLazyDefault,
      }
    },
  })

  // Solo acepta custom image desde Photo Center
  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: imgField,
              presets,
            },
          }
        : {}
    ) || {}

  const customFetch = first => {
    const actualCount = first || count

    fetch(
      `https://w.ecodigital.pe/data/depor/${codeField}_xalok.js?_=${actualCount}`
    )
      .then(res => res.json())
      .then(res => {
        setResults(res)
        setCount(actualCount + 1)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  useEffect(() => {
    setCount(Date.now())
    if (codeField) {
      customFetch(Date.now())
      setInterval(() => {
        customFetch()
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: { equipos: teams = [] } = {} } = results || {}
  const {
    title,
    subTitle,
    multimediaLandscapeL,
    websiteLink,
    multimediaLazyDefault,
  } = story || {}
  const { resized_urls: { landscape_l: landscapeL } = {} } = customPhoto || {}

  const [firstTeam = {}, secondTeam = {}] = teams

  const imgUrl = landscapeL || imgField || multimediaLandscapeL

  return (
    <div className="extraordinary-l-score bg-gray-300 lg:flex flex-row-reverse">
      <a
        className="extraordinary-l-score__img-link block lg:p-20"
        href={websiteLink}>
        <picture className="extraordinary-l-score__picture">
          <img
            className={`${
              isAdmin ? '' : 'lazy'
            } extraordinary-l-score__img w-full object-cover`}
            src={isAdmin ? imgUrl : multimediaLazyDefault}
            data-src={imgUrl}
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
        <h1 className="extraordinary-l-score__title mb-15 overflow-hidden">
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
