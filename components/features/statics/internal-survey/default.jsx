import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import InternalSurveyChildSurvey from './_children/survey'
import {
  setSurveyCookie,
  getCookie,
  socialMediaUrlShareList,
} from '../../../utilities/helpers'

@Consumer
class StaticInternalSurvey extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    const { globalContent: { id = '' } = {} } = this.props
    this.currentSurveyId = id
    this.hasVote = getCookie(`idpoll${this.currentSurveyId}`) || false

    this.sharelinks()
  }

  getResults = () => {
    const { globalContent: { id = '' } = {} } = this.props
    const source = 'quiz-by-id'
    const params = {
      id,
    }
    return new Promise(res => {
      const { fetched } = this.getContent(source, params)
      fetched
        .then(response => {
          res(response)
        })
        .catch(e => {
          throw new Error(e)
        })
    })
  }

  sendQuiz = optionSelected => {
    return new Promise(res => {
      const body = {
        id: this.currentSurveyId,
        option: optionSelected,
        website: 'peru21',
      }
      const URL = 'https://jab.pe/f/arc/services/encuesta.php'
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch(error => error)
        .then(response => {
          if (response.status === 200) {
            setSurveyCookie(body.id, 1)
            res(response)
          }
        })
    })
  }

  sharelinks = () => {
    const {
      globalContent,
      siteProperties: { siteUrl = '' } = {},
      requestUri = '',
    } = this.props
    const { title = '' } = globalContent || {}

    const { facebook, twitter } = socialMediaUrlShareList(
      siteUrl,
      requestUri,
      title
    )

    return { facebook, twitter }
  }

  render() {
    const { globalContent } = this.props
    const {
      title = '',
      dateStart: date = '',
      choices = [],
      slugNext: { slug: next = '' } = {},
      slugPrev: { slug: prev = '' } = {},
    } = globalContent || {}

    const params = {
      title,
      date,
      next,
      prev,
      choices,
      hasVote: this.hasVote,
      sendQuiz: this.sendQuiz,
      getResults: this.getResults,
      sharelinks: this.sharelinks(),
    }
    return <InternalSurveyChildSurvey {...params} />
  }
}

StaticInternalSurvey.label = 'Encuesta Interna'
export default StaticInternalSurvey
