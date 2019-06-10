import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  surveyChoicesItem: 'survey-choices__item',
  surveyRadio: 'survey-question__radio overflow-hidden flex items-center',
  surveyInput: 'survey-question__input hidden',
  surveyCheck: 'survey-question__check position-relative',
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
