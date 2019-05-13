import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import { setSurveyCookie, getCookie } from '../../../utilities/helpers'
import CardSurveyChildSurvey from './_children/survey'

@Consumer
class CardSurvey extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      quizData: {
        title: '',
        slug: '',
        dateStart: '',
        dateEnd: '',
        choices: [],
        slugNext: {
          id: 0,
          slug: '',
        },
        slugPrev: {
          id: 0,
          slug: '',
        },
      },
    }

    this.currentSurveyId = 674
    this.hasVote = getCookie(`idpoll${this.currentSurveyId}`) || false
  }

  componentDidMount() {
    this.gestQuiz()
  }

  gestQuiz = () => {
    const service = 'quiz-by-id'
    const params = {
      id: this.currentSurveyId,
    }
    const { fetched } = this.getContent(service, params)
    fetched.then(response => {
      this.setState({ quizData: response })
    })
  }

  sendQuiz = optionSelected => {
    const body = {
      id: this.currentSurveyId,
      option: optionSelected,
      website: 'peru21',
    }
    const URL = 'https://jab.pe/f/arc/services/encuesta.php'
    const { contextPath } = this.props
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
          const { quizData: { slug = '' } = {} } = this.state
          setSurveyCookie(body.id, 1)
          window.location.href = `${contextPath}/encuesta/${slug}`
        }
      })
  }

  render() {
    const { contextPath } = this.props
    const {
      quizData: { slug = '', choices = [] },
    } = this.state
    const params = {
      contextPath,
      slug,
      choices,
      hasVote: this.hasVote,
      sendQuiz: this.sendQuiz,
    }

    return <CardSurveyChildSurvey {...params} />
  }
}

CardSurvey.label = 'Encuesta'

export default CardSurvey
