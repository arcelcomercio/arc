import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const CardsSurveyChildResult = props => {
  const { choices } = props
  const totalVotes = choices.reduce(
    (prev, current) => prev + (current.votes || 0),
    0
  )

  const getIndexBiggestOf = (a = []) => {
    let indexOfBiggest = 0
    a.reduce((prev, current, index) => {
      const auxCurrent = current ? current.votes : 0
      if (auxCurrent > prev) {
        indexOfBiggest = index
        return auxCurrent
      }
      return prev
    }, 0)
    return indexOfBiggest
  }

  const indexOfTheHighlight = getIndexBiggestOf(choices)

  return (
    <ul className="quiz-result">
      {choices.map((result, i) => {
        const isBiggestValue = i === indexOfTheHighlight
        const textHighightClass = isBiggestValue ? 'quiz-result__highlight' : ''
        return (
          <li key={result.option} className="quiz-result__list quiz-result__mb">
            <div className="flex flex--justify-between quiz-result__mb">
              <span className={`quiz-result__item ${textHighightClass}`}>
                {result.option}
              </span>
              <span
                className={`quiz-result__item ${textHighightClass}`}>{`${Math.round(
                (result.votes / totalVotes) * 100
              )}%`}</span>
            </div>
            <CardsSurveyChildProgressBar
              percentage={(result.votes / totalVotes) * 100}
              isHighlight={isBiggestValue}
            />
          </li>
        )
      })}
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
