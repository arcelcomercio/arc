import React from 'react'
import PropTypes from 'prop-types'

const CardsSurveyChildProgressBar = props => {
  const { percentage, isHighlight } = props
  const highLightBarClass = isHighlight ? 'survey-bar__highlight' : ''
  return (
    <div className="survey-bar position-relative full-width">
      <div
        className={`survey-bar__filler ${highLightBarClass}`}
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
