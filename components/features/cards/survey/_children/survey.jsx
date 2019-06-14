import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './choices'
import SurveyResults from './result'

const classes = {
  cardSurvey: 'survey-card w-full pt-15',
  header:
    'survey-card__header uppercase text-center font-bold pt-20 pb-20 text-white',
  question: 'survey-card__question position-relative pt-15 pb-10 pl-10 ',
  title:
<<<<<<< HEAD
    'survey-card__title overflow-hidden font-bold mb-15 pr-20 pl-20 text-xl line-h-xs',
=======
    'survey-card__title overflow-hidden font-bold mb-15 pr-20 pl-20 text-xl text-gray-300',
>>>>>>> 864344712bfb2016a044adcb38a9e9ebb9095c7f
  choices: 'mb-10 pr-20 pl-20',
  buttons:
    'bottom-0 w-full position-absolute flex items-center justify-between pr-20 pl-20 pb-15',
  results: 'survey-card__results font-bold text-sm text-gray-300',
  submit:
    'survey-card__submit uppercase pt-10 pb-10 pr-40 pl-40 text-xs text-white',
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
        <h3 className={classes.header}>encuesta</h3>
        <form className={classes.question}>
          <p className={classes.title}>{title}</p>
          <div className={classes.choices}>
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
            <div className={classes.buttons}>
              <a
                href={`${contextPath}/encuesta/${slug}`}
                className={classes.results}>
                Ver Resultados
              </a>
              <button
                type="button"
                className={classes.submit}
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
