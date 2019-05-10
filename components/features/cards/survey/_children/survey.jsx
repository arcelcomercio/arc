import React, { PureComponent } from 'react'
import SurveyChoices from './choices'
import SurveyResults from './result'

const classes = {
  cardSurvey: 'card-survey full-width',
  surveyHeader: 'survey-header text-uppercase text-center',
  surveyQuestion: 'survey-question position-relative',
  surveyTitle: 'survey-question__title',
  surveyChoices: 'survey-choices',
  surveyButtons:
    'survey-buttons full-width position-absolute flex-center-vertical flex--justify-between',
  surveyResults: 'survey-buttons__results',
  surveySubmit: 'survey-buttons__submit text-uppercase',
}

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
      <div className={classes.cardSurvey}>
        <h3 className={classes.surveyHeader}>encuesta</h3>
        <form className={classes.surveyQuestion}>
          <p className={classes.surveyTitle}>
            ¿El congreso volvera a blindar a Donayre pese al ultimo fallo de la
            Corte suprema?
          </p>
          <div className={classes.SurveyChoices}>
            {!hasVote && (
              <SurveyChoices
                {...paramsOptions}
                onChange={evt => this.setChoiceSelected(evt)}
              />
            )}
            {hasVote && <SurveyResults choices={quiz.choices} />}
          </div>
          {!hasVote && (
            <div className={classes.surveyButtons}>
              <a href={`/encuesta/${slug}`} className={classes.surveyResults}>
                Ver Resultados
              </a>
              <button
                type="button"
                className={classes.surveySubmit}
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
