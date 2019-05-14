import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SurveyInternalChildSurvey from './_children/survey'
import { setSurveyCookie, getCookie } from '../../../utilities/helpers'

@Consumer
class SurveyInternal extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.currentSurveyId = this.props.globalContent.id
    this.hasVote = getCookie(`idpoll${this.currentSurveyId}`) || false
  }

  sendQuiz = optionSelected => {
    return new Promise(res => {
      const body = {
        id: this.currentSurveyId,
        option: optionSelected,
        website: 'peru21',
      }
      const URL = 'http://jab.pe/f/arc/services/encuesta.php'
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
            console.log(response)
            setSurveyCookie(body.id, 1)
            res(true)
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
    } = globalContent

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
    }
    return <SurveyInternalChildSurvey {...params} />
  }
}

SurveyInternal.label = 'Encuesta Interna'
export default SurveyInternal
