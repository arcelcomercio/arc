import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  bar: 'survey-bar position-relative full-width',
  filler: 'survey-bar__filler',
}

const CardsSurveyChildProgressBar = props => {
  const { percentage, isHighlight } = props
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
