import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import CardSurveyChild from './_children/survey'

@Consumer
class CardSurvey extends PureComponent {
  render() {
    const listChoices = [
      {
        option: 'Si',
        votes: 107,
      },
      {
        option: 'No',
        votes: 268,
      },
      {
        option: 'tal vez',
        votes: 268,
      },
    ]

    const params = {
      listChoices,
    }

    return <CardSurveyChild {...params} />
  }
}

export default CardSurvey
