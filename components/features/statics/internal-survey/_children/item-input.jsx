import React from 'react'

const classes = {
  input: 'hidden',
  iteminput: 'internal-survey__item-input',
  check: 'internal-survey__check inline-b position-relative',
  inputcheck: 'internal-survey__input-check',
  lblinput: 'internal-survey__lblinput block overflow-hidden',
}

const SurveyInternalChildInput = ({ value = '', index = '', onChange }) => {
  return (
    <li className={classes.iteminput}>
      <label htmlFor={index} className={classes.lblinput}>
        <input
          type="radio"
          id={index}
          value={value}
          name="vote"
          className={classes.input}
          onChange={onChange}
        />
        <span className={classes.check} />
        <span>{value}</span>
      </label>
    </li>
  )
}

export default SurveyInternalChildInput
