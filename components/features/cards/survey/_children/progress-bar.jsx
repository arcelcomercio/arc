import React from 'react'
import PropTypes from 'prop-types'

const CardsSurveyChildProgressBar = props => {
  const { percentage, isHighlight } = props
  const highLightBarClass = isHighlight ? 'progress-bar__highlight' : ''
  return (
    <div className="progress-bar">
      <div
        className={`progress-bar__filler ${highLightBarClass}`}
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
