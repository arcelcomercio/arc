import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SurveyInternalChildSurvey from './_children/survey'
import { setSurveyCookie, getCookie } from '../../../utilities/helpers'

@Consumer
class StaticInternalSurvey extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    const { globalContent: { id = '' } = {} } = this.props
    this.currentSurveyId = id
    this.hasVote = getCookie(`idpoll${this.currentSurveyId}`) || false
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
        .catch(e => console.log(e))
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

  render() {
    const { globalContent, arcSite, contextPath } = this.props
    const {
      title = '',
      dateStart: date = '',
      choices = [],
      slugNext: { slug: next = '' },
      slugPrev: { slug: prev = '' },
    } = globalContent || {}

    const params = {
      arcSite,
      contextPath,
      title,
      date,
      next,
      prev,
      choices,
      hasVote: this.hasVote,
      sendQuiz: this.sendQuiz,
      getResults: this.getResults,
    }
    return <SurveyInternalChildSurvey {...params} />
  }
}

StaticInternalSurvey.label = 'Encuesta Interna'
export default StaticInternalSurvey
