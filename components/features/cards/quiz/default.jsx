import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import QuizChildProgressBar from './_children/progress-bar'

@Consumer
class CardQuiz extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
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
      console.log('get request', response)
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
    return (
      <div>
        <button type="button" onClick={e => this.sendQuiz(e)}>
          POSTTTT
        </button>
        <QuizChildProgressBar percentage="60" />
      </div>
    )
  }
}

CardQuiz.label = 'Encuesta - peru21'

export default CardQuiz
