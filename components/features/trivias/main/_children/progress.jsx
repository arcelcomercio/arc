import * as React from 'react'

const classes = {
  container: 'trivias-progress',
  title: 'trivias-progress__title',
}

/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string[]} props.points
 * @param {number} props.totalQuestions
 */
const TriviasProgress = ({ title, points, totalQuestions = 0 }) => {
  // Crea un arreglo con la cantidad de preguntas
  let counter = 0
  const questionSlots = []
  for (let i = 0; i < totalQuestions; i++) {
    counter += 1
    questionSlots.push(counter)
  }

  return (
    <div
      className={classes.container}
      style={{
        padding: '45px 20px 30px',
        width: '100%',
        minHeight: '87px',
      }}>
      <h2
        className={classes.title}
        style={{
          paddingBottom: '15px',
        }}>
        {title}
      </h2>
      <div
        style={{
          display: 'flex',
          width: '100%',
        }}>
        {questionSlots.map((slot, index) => {
          // Asinga color a cada pregunta segun su estado
          let bgColor = '#E2E2E2' // gray - sin responder
          if (points[index] === 'yes') {
            bgColor = '#26D340' // green - correcta
          } else if (points[index] === 'no') {
            bgColor = '#D92323' // red - erronea
          }

          return (
            <div
              key={`progress-${slot}`}
              style={{
                width: '28px',
                height: '4px',
                backgroundColor: bgColor,
                flex: 1,
                margin: '0 3px',
              }}></div>
          )
        })}
      </div>
    </div>
  )
}

export default TriviasProgress
