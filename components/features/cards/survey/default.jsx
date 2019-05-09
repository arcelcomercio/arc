import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

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
  }

  componentDidMount() {
    this.gestQuiz()
  }

  gestQuiz = () => {
    const service = 'quiz-by-id'
    const params = {
      id: 675,
    }
    const { fetched } = this.getContent(service, params)
    fetched.then(response => {
      this.setState({ quizData: response })
    })
  }

  sendQuiz = () => {
    const body = {
      id: 673,
      option: 'Si',
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
      })
  }

  render() {
    const { quizData } = this.state
    const params = {
      quiz: quizData,
      hasVote: true,
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
