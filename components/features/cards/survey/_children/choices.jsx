import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  item: 'c-survey-choices__item mb-5 pt-5 pr-20 pb-5 text-gray-300',
  radio: 'cursor-pointer overflow-hidden flex items-center',
  input: 'c-survey-choices__input hidden',
  check: 'c-survey-choices__check bg-white position-relative mr-10 rounded-md',
}

const CardSurveyChildSurveyOptions = ({ choices, onChange }) => {
  return choices.map((choice, index) => {
    const idChoice = `radio${index}`
    return (
      <div key={choice.option} className={classes.item}>
        <label htmlFor={idChoice} className={classes.radio}>
          <input
            id={idChoice}
            className={classes.input}
            type="radio"
            name="survey"
            value={choice.option}
            onChange={onChange}
          />
          <span className={classes.check} />
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

export default React.memo(
  CardSurveyChildSurveyOptions,
  (prevProps, nextProps) => {
    const { choices } = prevProps
    const { choices: nextChoices } = nextProps
    let memo = true

    choices.forEach((choice, i) => {
      const { option } = choice
      const { option: nextOption } = nextChoices[i]

      if (option !== nextOption) memo = false
    })

    return memo
  }
)
