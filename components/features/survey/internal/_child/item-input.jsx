import React from 'react'

const classes = {}

const SurveyInternalChildInput = ({ value = '' }) => {
  return (
    <li>
      <input type="radio" value={value} name="vote" />
      <span>{value}</span>
    </li>
  )
}

export default SurveyInternalChildInput
