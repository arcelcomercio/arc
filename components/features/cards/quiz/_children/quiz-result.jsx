import React from 'react'

const QuizChildProgressBar = props => {
  const { percentage } = props
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__filler"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export default QuizChildProgressBar
