import React from 'react'

const classes = {
  input: 'internal-survey__input',
  check: 'internal-survey__check',
  inputcheck: 'internal-survey__input-check',
  lblinput: 'internal-survey__lblinput',
}

const SurveyInternalChildInput = ({ value = '', index = '' }) => {
  return (
    <li>
      <label htmlFor={index} className={classes.lblinput}>
        <input
          type="radio"
          id={index}
          value={value}
          name="vote"
          className={classes.input}
        />
        <span className={classes.check} />
        <span>{value}</span>
      </label>
    </li>
  )
}

export default SurveyInternalChildInput
