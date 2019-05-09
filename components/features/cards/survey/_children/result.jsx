import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const CardsSurveyChildResult = props => {
  const { choices } = props
  const totalVotes = choices.reduce(
    (prev, current) => prev + (current.votes || 0),
    0
  )

  /*const indexOfBiggest = a => {
    return a.reduce((prev, next, index) => {
      return next > a[prev] ? index : next
    }, 0)
  }*/

  // console.log(indexOfBiggest(choices))

  return (
    <ul className="card-survey__result">
      {choices.map(result => (
        <li key={result.option} className="card-survey__result__list">
          <span className="card-survey__result__item">{result.option}</span>
          <span className="card-survey__result__item">{`${Math.round(
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
