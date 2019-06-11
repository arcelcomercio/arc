import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  surveyItem: 'survey-card__item mb-5 pt-5 pr-20 pb-5',
  surveyRadio: 'cursor-pointer overflow-hidden flex items-center',
  surveyInput: 'survey-card__input hidden',
  surveyCheck: 'survey-card__check position-relative mr-10',
}

const CardSurveyChildSurveyOptions = ({ choices, onChange }) => {
  return choices.map((choice, index) => {
    const idChoice = `radio${index}`
    return (
      <div key={choice.option} className={classes.surveyChoicesItem}>
        <label htmlFor={idChoice} className={classes.surveyRadio}>
          <input
            id={idChoice}
            className={classes.surveyInput}
            type="radio"
            name="survey"
            value={choice.option}
            onChange={onChange}
          />
          <span className={classes.surveyCheck} />
          <span>{choice.option}</span>
        </label>
      </div>
    )
  })
}

CardSurveyChildSurveyOptions.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
  onChange: PropTypes.func,
}

export default CardSurveyChildSurveyOptions
