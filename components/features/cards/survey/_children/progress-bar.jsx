import React from 'react'
import PropTypes from 'prop-types'

const CardsSurveyChildProgressBar = props => {
  const { percentage } = props
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__filler"
        style={{ width: `${percentage || 0}%` }}
      />
    </div>
  )
}

CardsSurveyChildProgressBar.propTypes = {
  percentage: PropTypes.number,
}

export default CardsSurveyChildProgressBar
