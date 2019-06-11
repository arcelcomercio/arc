import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  bar: 'survey-bar position-relative w-full',
  filler: 'survey-bar__filler',
}

const CardsSurveyChildProgressBar = ({ percentage, isHighlight }) => {
  const highLightBarClass = isHighlight ? 'active' : ''
  return (
    <div className={classes.bar}>
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

export default CardsSurveyChildProgressBar
