import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const classes = {
  list: 'mb-5 pt-5 pb-5',
  itemContainer: 'flex justify-between mb-5',
  item: 'c-survey-result__item primary-font text-md line-h-xs text-gray-300',
}

const CardsSurveyChildResultItem = ({
  highestValue,
  totalVotes,
  votes,
  option,
}) => {
  const isBiggestValue = votes === highestValue
  const textHighightClass = isBiggestValue ? 'active' : ''
  return (
    <li key={`survey-${option}`} className={classes.list}>
      <div className={classes.itemContainer}>
        <span className={`${classes.item} ${textHighightClass}`}>{option}</span>
        <span className={`${classes.item} ${textHighightClass}`}>{`${Math.round(
          (votes / totalVotes) * 100
        )}%`}</span>
      </div>
      <CardsSurveyChildProgressBar
        percentage={(votes / totalVotes) * 100}
        isHighlight={isBiggestValue}
      />
    </li>
  )
}

CardsSurveyChildResultItem.propTypes = {
  totalVotes: PropTypes.number,
  highestValue: PropTypes.number,
  option: PropTypes.string,
  votes: PropTypes.number,
}

export default React.memo(CardsSurveyChildResultItem)
