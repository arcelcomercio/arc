import React, { useState, useEffect } from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import { includePromoItems } from '../../../utilities/included-fields'
import LiveScoreChild from './_children/live-score'

const PHOTO_SOURCE = 'photo-resizer'

const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

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
  const { nombre: firstName, score: firstScore } = firstTeam
  const { nombre: secondName, score: secondScore } = secondTeam

  const imgUrl = landscapeL || imgField || multimediaLandscapeL

  const params = {
    isAdmin,
    title,
    subTitle,
    websiteLink,
    multimediaLazyDefault,
    imgUrl,
    codeField,
    titleField,
    subTitleField,
    isLive,
    firstName,
    firstScore,
    secondName,
    secondScore,
  }

  return <LiveScoreChild {...params} />
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
