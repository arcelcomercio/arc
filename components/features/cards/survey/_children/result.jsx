import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const classes = {
  surveyResult: 'survey-result',
  list: 'survey-result__list survey-result__mb',
  itemContainer: 'flex flex--justify-between survey-result__mb',
  item: 'survey-result__item',
}

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
    <ul className={classes.surveyResult}>
      {choices.map((result, i) => {
        const isBiggestValue = i === indexOfTheHighlight
        const textHighightClass = isBiggestValue ? 'active' : ''
        return (
          <li key={result.option} className={classes.list}>
            <div className={classes.itemContainer}>
              <span className={`${classes.item} ${textHighightClass}`}>
                {result.option}
              </span>
              <span
                className={`${
                  classes.item
                } ${textHighightClass}`}>{`${Math.round(
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
