import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import { setCookieSurvey, getCookie } from '../../../utilities/helpers'
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
    const url = 'http://jab.pe/f/arc/services/encuesta.php'
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(error => error)
      .then(response => {
        console.log('post request', response)
        if (response.status === 200) {
          const {
            quizData: { slug },
          } = this.state
          setCookieSurvey(body.id, 1)
          window.location.href = `/encuesta/${slug}`
        }
      })
  }

  render() {
    const { quizData } = this.state
    const params = {
      quiz: quizData,
      hasVote: this.hasVote,
      sendQuiz: this.sendQuiz,
    }

    return (
      <div>
        <CardSurveyChildSurvey {...params} />
      </div>
    )
  }
}

CardSurvey.label = 'Encuesta - peru21'

export default CardSurvey
