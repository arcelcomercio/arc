import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const CardsSurveyChildResult = props => {
  const { choices } = props
  const totalVotes = choices.reduce(
    (prev, current) => prev + (current.votes || 0),
    0
  )

  const indexOfBiggest = a => {
    return a.reduce((prev, next, index) => {
      return next > a[prev] ? index : next
    }, 0)
  }

  // console.log(indexOfBiggest(choices))

  return (
    <ul className="quiz-result">
      {choices.map(result => (
        <li key={result.option} className="quiz-result__list">
          <span className="quiz-result__item">{result.option}</span>
          <span className="quiz-result__item">{`${Math.round(
            (result.votes / totalVotes) * 100
          )}%`}</span>
          <CardsSurveyChildProgressBar
            percentage={(result.votes / totalVotes) * 100}
          />
        </li>
      ))}
    </ul>
  )
}

CardsSurveyChildResult.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
}

export default CardsSurveyChildResult
