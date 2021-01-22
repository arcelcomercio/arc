import * as React from 'react'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import { ACTION_START, ACTION_RESTART, ACTION_NEXT_QUESTION, getActionPayload } from './_dependencies/actions'
import TriviaStart from './_children/start'
import TriviaQuestion from './_children/question'
import TriviaResult from './_children/result'

/**
 * @param {object} props
 * @param {object} props.customFields
 * @param {string} [props.customFields.messageNull]
 * @param {string} [props.customFields.messagePoor]
 * @param {string} [props.customFields.messageGood]
 * @param {string} [props.customFields.messagePerfect]
 */
const TriviasMain = ({
  customFields: {
    messageNull = 'Puedes investigar un poco más y regresar',
    messagePoor = 'Bien, pero puedes investigar un poco más',
    messageGood = 'Bien hecho, por lo visto has investigado',
    messagePerfect = '¡Puntaje perfecto!  ',
  },
}) => {
  const { globalContent } = useAppContext()

  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [points, setPoints] = React.useState(0)
  const [started, setStarted] = React.useState(false)

  // verificar cuantos custom_embeds de tipo trivia
  // vienen en content_elements, esa es la cantidad de preguntas.
  const {
    headlines: { basic: title = '' } = {},
    promo_items: { basic: { url: triviaImage ='', caption = '' } = {} } = {},
    content_elements: contentElements = '',
  } = globalContent || {}

  const questions = contentElements
    .filter(
      element => element.subtype === 'trivia' && element.type === 'custom_embed'
    )
    .map(trivia => {
      const {
        embed: {
          config: {
            name: question = '',
            response = '',
            image: {
              url: image = '',
              alt = '',
              // width,
              // height
            } = {},
            question: options = [],
          },
        } = {},
      } = trivia || {}

      // question enviada a `<TriviaQuestion>`
      return {
        question,
        response,
        image,
        alt,
        options,
      }
    })

  const pushEvent = (action, payload = {}) => {
    // envio de evento a tagManager
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      ...getActionPayload(action, payload)
    })
  }

  // refresh de publicidad
  const refreshAds = () => {
    window.googletag = window.googletag || { cmd: [] }
    window.googletag.cmd.push(() => {
      window.googletag.pubads().refresh()
    })
  }

  // se ejecuta al empezar de nuevo la trivia
  const handleRestart = () => {
    pushEvent(ACTION_RESTART, {
      url: window.location.pathname,
    })

    setPoints(0)
    setCurrentQuestion(0)
    setStarted(false)
  }

  // se ejecuta al empezar la trivia
  const handleStart = () => {
    pushEvent(ACTION_START, {
      url: window.location.pathname,
    })

    setStarted(true)
  }

  // se ejecuta al pasar a siguiente pregunta
  const handleAnswer = (rightAnswer = false) => {
    pushEvent(ACTION_NEXT_QUESTION, {
      url: window.location.pathname,
      question: [currentQuestion, questions.length]
    })
    refreshAds()
    
    if (rightAnswer) setPoints(points + 1)
    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <main style={{ width: '100%' }}>
      {!started && <TriviaStart 
        title={title} 
        image={triviaImage}
        alt={caption}
        start={handleStart} 
      />}
      {started && currentQuestion < questions.length && (
        <TriviaQuestion
          title={title}
          question={questions[currentQuestion]}
          setAnswer={handleAnswer}
        />
      )}
      {started && currentQuestion >= questions.length && (
        <TriviaResult
          title={title}
          messageNull={messageNull}
          messagePoor={messagePoor}
          messageGood={messageGood}
          messagePerfect={messagePerfect}
          points={points}
          restart={handleRestart}
        />
      )}
    </main>
  )
}

TriviasMain.propTypes = {
  customFields,
}

TriviasMain.label = 'Trivias Preguntas'

export default TriviasMain
