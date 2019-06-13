import React from 'react'

const classes = {
  item: 'i-survey-input mt-20',
  input: 'hidden',
  label: 'cursor-pointer block overflow-hidden',
  check: 'i-survey-input__check inline-b position-relative mr-15',
}

const InternalSurveyChildInput = ({ value = '', index = '', onChange }) => {
  return (
    <li className={classes.item}>
      <label htmlFor={index} className={classes.label}>
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

export default InternalSurveyChildInput
