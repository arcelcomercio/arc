import React, { PureComponent } from 'react'
import SurveyChoices from './choices'
import SurveyResults from './result'

class CardSurveyChildSurvey extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      optionSelected: '',
    }
  }

  setChoiceSelected(evt) {
    this.setState({
      optionSelected: evt.target.value,
    })
  }

  sendOption() {
    const { sendQuiz } = this.props
    const { optionSelected } = this.state
    sendQuiz(optionSelected)
  }

  render() {
    const { quiz, hasVote } = this.props
    const { choices, slug } = quiz
    const paramsOptions = {
      choices,
      setChoiceSelected: this.setChoiceSelected,
    }

    return (
      <div className="card-survey full-width">
        <h3 className="card-survey__header text-uppercase text-center">
          encuesta
        </h3>
        <form className="card-survey__question position-relative">
          <p className="card-survey__question__title">
            ¿El congreso volvera a blindar a Donayre pese al ultimo fallo de la
            Corte suprema?
          </p>
          <div className="card-survey__question__choices">
            {!hasVote && (
              <SurveyChoices
                {...paramsOptions}
                onChange={evt => this.setChoiceSelected(evt)}
              />
            )}
            {hasVote && <SurveyResults choices={quiz.choices} />}
          </div>
          {!hasVote && (
            <div className="card-survey__buttons full-width position-absolute flex-center-vertical flex--justify-between">
              <a
                href={`/encuesta/${slug}`}
                className="card-survey__buttons__results">
                Ver Resultados
              </a>
              <button
                type="button"
                className="card-survey__buttons__submit text-uppercase"
                onClick={() => this.sendOption()}>
                votar
              </button>
            </div>
          )}
        </form>
      </div>
    )
  }
}

export default CardSurveyChildSurvey
