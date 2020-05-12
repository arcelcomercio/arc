import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  bar: 'c-survey-bar position-relative w-full rounded-lg',
  filler: 'c-survey-bar__filler h-full rounded-lg',
}

const CardsSurveyChildProgressBar = ({ percentage, isHighlight }) => {
  const highLightBarClass = isHighlight ? 'active' : ''
  return (
    <div
      role="progressbar"
      aria-valuenow={percentage || 0}
      aria-valuemin="0"
      aria-valuemax="100"
      className={classes.bar}>
      <div
        className={`${classes.filler} ${highLightBarClass}`}
        style={{ width: `${percentage || 0}%` }}
      />
    </div>
  )
}

CardsSurveyChildProgressBar.propTypes = {
  percentage: PropTypes.number,
  isHighlight: PropTypes.bool,
}

export default React.memo(CardsSurveyChildProgressBar)
