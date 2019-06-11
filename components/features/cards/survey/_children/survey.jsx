import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './choices'
import SurveyResults from './result'

const classes = {
  cardSurvey: 'survey-card w-full pt-15',
  surveyHeader:
    'survey-card__header uppercase text-center font-bold pt-20 pb-20',
  surveyQuestion: 'survey-card__question position-relative pt-15 pb-10 pl-10',
  surveyTitle: 'survey-card__title overflow-hidden font-bold mb-15 pr-20 pl-20',
  surveyChoices: 'mb-10 pr-20 pl-20',
  surveyButtons:
    'survey-buttons w-full position-absolute flex items-center justify-between',
  surveyResults: 'survey-buttons__results',
  surveySubmit: 'survey-buttons__submit uppercase',
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
    const {
      contextPath,
      title = '',
      choices = [],
      slug = '',
      hasVote = false,
    } = this.props
    const paramsOptions = {
      choices,
      setChoiceSelected: this.setChoiceSelected,
    }

    return (
      <div className={classes.cardSurvey}>
        <h3 className={classes.surveyHeader}>encuesta</h3>
        <form className={classes.surveyQuestion}>
          <p className={classes.surveyTitle}>{title}</p>
          <div className={classes.surveyChoices}>
            {!hasVote ? (
              <SurveyChoices
                {...paramsOptions}
                onChange={evt => this.setChoiceSelected(evt)}
              />
            ) : (
              <SurveyResults choices={choices} />
            )}
          </div>
          {!hasVote && (
            <div className={classes.surveyButtons}>
              <a
                href={`${contextPath}/encuesta/${slug}`}
                className={classes.surveyResults}>
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

CardSurveyChildSurvey.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
  slug: PropTypes.string,
  hasVote: PropTypes.bool,
}

export default CardSurveyChildSurvey
