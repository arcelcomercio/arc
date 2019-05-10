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

  const getHighestValue = (array = []) => {
    return array.map(item => item.votes).sort((a, b) => b - a)[0]
  }

  const highestValue = getHighestValue(choices)

  return (
    <ul className={classes.surveyResult}>
      {choices.map(result => {
        const isBiggestValue = result.votes === highestValue
        console.log(result.votes, highestValue, isBiggestValue)
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
