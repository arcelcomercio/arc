import * as React from 'react'

import QuestionImage from './question-image'

const classes = {
  container: 'trivias-quiz',
  body: 'trivias-quiz__body',
  question: 'trivias-quiz__question',
  questionButton: 'trivias-quiz__question-btn',
  questionText: 'trivias-quiz__question-txt',
  questionCheck: 'trivias-quiz__question-check',
  details: 'trivias-quiz__details',
  detailsBody: 'trivias-quiz__details-b',
  check: 'trivias-quiz__check',
  more: 'trivias-quiz__more',
  nextButton: 'trivias-quiz__next',
}

/**
 *
 * @param {object} props
 * @param {number} props.number
 * @param {boolean} props.rightAnswer
 * @param {function} props.setAnswer
 * @param {object} props.question
 * @param {string} props.question.question
 * @param {string} props.question.response
 * @param {string} props.question.image
 * @param {string} props.question.alt
 * @param {number} props.question.width
 * @param {number} props.question.height
 * @param {Array} props.question.options
 * @param {string} props.fallbackImage
 */
const TriviasMainQuestion = ({
  number,
  rightAnswer,
  setAnswer,
  getNextQuestion,
  fallbackImage,
  question: { question, response, image, alt, width, height, options } = {},
}) => {
  const longDetails = response?.length > 150
  const [select, setSelect] = React.useState(false)
  const expandibleText = React.useRef(null)

  const handleAnswer = (e) => {
    // check if the selected answer is the right one
    setSelect(true)
    const isRight = options.some(
      ({ name, response: isTheRightAnswer }) =>
        e.target?.textContent === name && isTheRightAnswer
    )
    setAnswer(isRight)
  }

  const handleExpandDetails = (e) => {
    e.target.remove()
    expandibleText.current.style.maxHeight = 'unset'
  }

  const handleNextQuestion = () => {
    setSelect(false)
    getNextQuestion()
  }

  return (
    <div>
      <QuestionImage
        image={image || fallbackImage}
        alt={alt}
        height={height}
        width={width}
      />
      <section
        className={classes.body}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <svg
          height="2"
          width="15%"
          aria-disabled="true"
          style={{
            alignSelf: 'baseline',
            stroke: '#FFCB05',
          }}>
          <line
            x2="100%"
            style={{
              strokeWidth: 2,
            }}
          />
        </svg>
        <h3 className={classes.question}>{`${number}. ${question}`}</h3>
        <ol
          type="A"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingBottom: '30px',
          }}>
          <>
            {options.map((option) => {
              const { name, response: isRight } = option
              const color = isRight ? '#26D340' : '#D92323'
              return name ? (
                <button
                  type="button"
                  onClick={handleAnswer}
                  disabled={select}
                  className={classes.questionButton}
                  style={{
                    borderColor: select ? color : '#F5F5F5',
                  }}
                  key={`q-${name}`}>
                  <li className={classes.questionText}>
                    {name}
                    {isRight && rightAnswer && select && (
                      <svg
                        width="22.354"
                        height="22.354"
                        viewBox="0 0 22.354 22.354"
                        className={classes.questionCheck}>
                        <path
                          d="M22.916,11.739A11.177,11.177,0,1,1,11.739.563,11.177,11.177,0,0,1,22.916,11.739Zm-12.47,5.918,8.292-8.292a.721.721,0,0,0,0-1.02l-1.02-1.02a.721.721,0,0,0-1.02,0L9.937,14.088,6.779,10.931a.721.721,0,0,0-1.02,0L4.74,11.95a.721.721,0,0,0,0,1.02l4.687,4.687A.721.721,0,0,0,10.446,17.657Z"
                          transform="translate(-0.563 -0.563)"
                        />
                      </svg>
                    )}
                  </li>
                </button>
              ) : null
            })}
            {select && response ? (
              <div className={classes.details}>
                <svg
                  className={classes.check}
                  fill="#26D340"
                  width="22.354"
                  height="22.354"
                  viewBox="0 0 22.354 22.354">
                  <path
                    d="M22.916,11.739A11.177,11.177,0,1,1,11.739.563,11.177,11.177,0,0,1,22.916,11.739Zm-12.47,5.918,8.292-8.292a.721.721,0,0,0,0-1.02l-1.02-1.02a.721.721,0,0,0-1.02,0L9.937,14.088,6.779,10.931a.721.721,0,0,0-1.02,0L4.74,11.95a.721.721,0,0,0,0,1.02l4.687,4.687A.721.721,0,0,0,10.446,17.657Z"
                    transform="translate(-0.563 -0.563)"
                  />
                </svg>

                <p className={classes.detailsBody} ref={expandibleText}>
                  {response}
                </p>
                {longDetails ? (
                  <button
                    type="button"
                    className={classes.more}
                    alt="Ver más"
                    title="Ver más"
                    onClick={handleExpandDetails}>
                    <svg
                      style={{
                        pointerEvents: 'none',
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14">
                      <g transform="translate(-1169 -781)">
                        <g
                          fill="#fff"
                          stroke="#000"
                          transform="translate(1169 781)">
                          <circle cx="7" cy="7" r="7" />
                          <circle cx="7" cy="7" r="6.5" />
                        </g>
                        <g transform="translate(1173.335 785.335)">
                          <line
                            stroke="#000"
                            y2="6"
                            transform="translate(2.665 -0.335)"
                          />
                          <line
                            stroke="#000"
                            x1="6"
                            transform="translate(-0.335 2.665)"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                ) : null}
              </div>
            ) : null}
          </>
        </ol>
        <button
          type="button"
          disabled={!select}
          onClick={handleNextQuestion}
          style={{
            opacity: select ? 1 : 0.3,
          }}
          className={classes.nextButton}>
          Siguiente
        </button>
      </section>
    </div>
  )
}

export default TriviasMainQuestion
