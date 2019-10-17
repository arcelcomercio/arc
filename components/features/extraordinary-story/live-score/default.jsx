/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import StoryData from '../../../utilities/story-data'

@Consumer
class ExtraordinaryStoryLifeScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {},
      count: 1,
    }

    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
        arcSite,
        contextPath,
        deployment,
      } = {},
    } = this.props

    this.fetchContent({
      story: {
        source: contentService,
        query: contentConfigValues,
        // filter: '',
        transform(data) {
          const { title, subTitle, multimediaLandscapeXL } = new StoryData({
            data,
            arcSite,
            contextPath,
            deployment,
            defaultImgSize: 'sm',
          })
          return { title, subTitle, multimediaLandscapeXL }
        },
      },
    })
  }

  componentDidMount() {
    this.fetch()
    const { customFields: { codeField } = {} } = this.props
    setInterval(() => {
      if (codeField) {
        this.fetch()
      }
    }, 5000)
  }

  fetch() {
    const { count } = this.state
    const { customFields: { codeField = '' } = {} } = this.props

    // Fetch cors
    fetch(
      `https://w.ecodigital.pe/data/depor/${codeField}_xalok.js?_=${count}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      this.setState({ results: res, count: count + 1 })
    })

    /* const { fetched } = this.getContent('get-live-score', {
      id: codeField,
      count,
    })
    fetched.then(res => {
      this.setState({ results: res, count: count + 1 })
    }) */
  }

  render() {
    const {
      results: { data: { equipos: teams = [] } = {} } = {},
      story: { title, subTitle, multimediaLandscapeXL } = {},
    } = this.state || {}

    const [firstTeam = {}, secondTeam = {}] = teams

    return (
      <div className="extraordinary-l-score bg-gray-300 lg:flex flex-row-reverse">
        <a className="extraordinary-l-score__img-link block lg:p-20" href="/">
          <picture className="extraordinary-l-score__picture">
            <img
              className="extraordinary-l-score__img w-full"
              src={multimediaLandscapeXL}
              alt={title}
            />
          </picture>
        </a>
        <div className="extraordinary-l-score__content p-10 lg:p-20">
          <a
            href="/"
            className="extraordinary-l-score__score-content text-white flex mb-15">
            <div className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex justify-end items-center">
              {firstTeam.nombre || ''}
            </div>
            <div className="p-10 title-xs font-bold bg-black">{`${firstTeam.score ||
              ''} - ${secondTeam.score || ''}`}</div>
            <div className="extraordinary-l-score__team p-10 text-xl font-bold flex-1 flex items-center">
              {secondTeam.nombre || ''}
            </div>
          </a>
          <h1 className="extraordinary-l-score__title mb-15">
            <a
              href="/"
              className="extraordinary-l-score__title-link text-white title-md font-bold line-h-sm">
              {title}
            </a>
          </h1>
          <p className="extraordinary-l-score__subtitle text-white hidden md:block text-lg line-h-sm mb-20">
            {subTitle}
          </p>
        </div>
      </div>
    )
  }
}

ExtraordinaryStoryLifeScore.label = 'Apertura extraordinaria - Score en vivo'

ExtraordinaryStoryLifeScore.propTypes = {
  customFields: PropTypes.shape({
    codeField: PropTypes.string.isRequired.tag({
      name: 'Código del partido',
    }),
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default ExtraordinaryStoryLifeScore
