import * as React from 'react'

const TriviasMainResult = ({
  title,
  messageNull,
  messagePoor,
  messageGood,
  messagePerfect,
  points,
  restart,
}) => {
  const maxPoints = points.length
  const currentPoints = points.filter(value => value === 'yes').length

  const percentage = currentPoints / maxPoints

  let messageToShow
  if (percentage < 0.1) {
    messageToShow = messageNull
  } else if (percentage < 0.5) {
    messageToShow = messagePoor
  } else if (percentage < 0.99) {
    messageToShow = messageGood
  } else if (percentage === 1) {
    messageToShow = messagePerfect
  }

  return (
    <div>
      <h1>{title}</h1>
      <span>{`${currentPoints}/${maxPoints}`}</span>
      <p>{messageToShow}</p>
      <button type="button" onClick={restart}>
        Empezar de nuevo
      </button>
      <p>Comparte la trivia</p>
      <div>
        <span>F</span>
        <span>T</span>
        <span>W</span>
      </div>
    </div>
  )
}

export default TriviasMainResult
