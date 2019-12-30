import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SurveyChoices from './choices'
import SurveyResults from './result'

const classes = {
  cardSurvey: 'survey-card w-full pt-15',
  header: `survey-card__header uppercase text-center font-bold pt-20 pb-20 text-white`,
  question: 'survey-card__question position-relative pt-15 pb-10 pl-10 ',
  title: `survey-card__title overflow-hidden font-bold mb-15 pr-20 pl-20 text-xl text-gray-300 line-h-sm`,
  choices: 'mb-10 pr-20 pl-20',
  buttons: `bottom-0 w-full position-absolute flex items-center justify-between pr-20 pl-20 pb-15`,
  results: 'survey-card__results font-bold text-sm text-gray-300',
  submit: `survey-card__submit uppercase pt-10 pb-10 pr-40 pl-40 text-xs text-white`,
}

const CardSurveyChildSurvey = props => {
  const {
    BASE_PATH,
    title = '',
    choices = [],
    slug = '',
    hasVote = false,
  } = props

  const [optionSelected, setOptionSelected] = useState('')

  const setChoiceSelected = e => {
    setOptionSelected(e.target.value)
  }

  const sendOption = () => {
    const { sendQuiz } = props
    sendQuiz(optionSelected)
  }

  const paramsOptions = {
    choices,
    setChoiceSelected,
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
              onChange={e => setChoiceSelected(e)}
            />
          ) : (
            <SurveyResults choices={choices} />
          )}
        </div>
        {!hasVote && (
          <div className={classes.buttons}>
            <a href={`${BASE_PATH}/${slug}`} className={classes.results}>
              Ver Resultados
            </a>
            <button
              type="button"
              className={classes.submit}
              onClick={() => sendOption()}>
              votar
            </button>
          </div>
        )}
      </form>
    </div>
  )
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
