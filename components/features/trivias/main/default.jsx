import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import {
  ACTION_START,
  ACTION_RESTART,
  ACTION_NEXT_QUESTION,
  ACTION_ANSWER,
  getActionPayload,
} from './_dependencies/actions'
import TriviaStart from './_children/start'
import TriviaProgress from './_children/progress'
import TriviaQuestion from './_children/question'
import TriviaResult from './_children/result'
import TriviasRecommended from '../recommended/default'

/**
 * @param {object} props
 * @param {object} props.customFields
 * @param {string} [props.customFields.messageNull]
 * @param {string} [props.customFields.messagePoor]
 * @param {string} [props.customFields.messageGood]
 * @param {string} [props.customFields.messagePerfect]
 *
 * @todo creo que las funciones se pueden sacar en un archivo aparte
 * para dejar este mas limpio
 */
const TriviasMain = ({
  customFields: {
    messageNull = 'Puedes investigar un poco más y regresar',
    messagePoor = 'Bien, pero puedes investigar un poco más',
    messageGood = 'Bien hecho, por lo visto has investigado',
    messagePerfect = '¡Puntaje perfecto! que todos lo sepan',
  },
}) => {
  const { globalContent, requestUri, arcSite } = useAppContext()
  const {
    siteUrl,
    social: { twitter: { twitterUser } = {} } = {},
  } = getProperties(arcSite)

  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [points, setPoints] = React.useState([])
  // TODO: este estado no hace falta, puede usarse `points` cuando esta vacio
  const [started, setStarted] = React.useState(false)

  // verificar cuantos custom_embeds de tipo trivia
  // vienen en content_elements, esa es la cantidad de preguntas.
  const {
    headlines: { basic: title = '' } = {},
    promo_items: {
      basic: { url: triviaImage = '', caption = '' } = {},
      basic_movil: { url: movilImage = '' } = {},
    } = {},
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
            image: { url: image = '', alt = '', width, height } = {},
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
        width,
        height,
        options,
      }
    })

  const pushEvent = (action, payload = {}) => {
    // envio de evento a tagManager
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      ...getActionPayload(action, payload),
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
    const url = window.location.pathname
    pushEvent(ACTION_RESTART, { url })

    refreshAds()
    window.history.pushState({ restart: true }, title, url)
    window.title = title
    setPoints([])
    setCurrentQuestion(0)
    setStarted(false)
    window.scrollTo(0, 0)
  }

  // se ejecuta al empezar la trivia
  const handleStart = () => {
    const url = window.location.pathname
    const newTitle = `1 - ${title}`
    pushEvent(ACTION_START, { url })

    window.history.pushState({ start: true }, newTitle, `${url}#1`)
    window.title = newTitle
    setStarted(true)
    setCurrentQuestion(1)
    window.scrollTo(0, 0)
  }

  // se ejecuta al responder una pregunta
  const handleAnswer = (rightAnswer = false) => {
    pushEvent(ACTION_ANSWER, {
      url: window.location.pathname,
      answer: rightAnswer,
      question: [currentQuestion, questions.length],
    })
    setPoints([...points, rightAnswer ? 'yes' : 'no'])
  }

  // se ejecuta al pasar a siguiente pregunta
  const handleNextQuestion = () => {
    const url = window.location.pathname
    const question = [currentQuestion, questions.length]
    const isTheLastQuestion = currentQuestion === questions.length
    const newTitle = `${
      isTheLastQuestion ? 'Resultado' : currentQuestion + 1
    } - ${title}`

    pushEvent(ACTION_NEXT_QUESTION, {
      url,
      question,
    })

    refreshAds()
    window.history.pushState(
      { question },
      newTitle,
      `${url}#${isTheLastQuestion ? 'resultado' : currentQuestion + 1}`
    )
    window.title = newTitle
    setCurrentQuestion(currentQuestion + 1)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <main style={{ width: '100%' }}>
        {!started && (
          <TriviaStart
            title={title}
            image={triviaImage}
            alt={caption}
            movilImage={movilImage}
            start={handleStart}
          />
        )}
        {started && currentQuestion <= questions.length && (
          <div
            style={{
              margin: '0 auto',
              width: '100%',
              maxWidth: '540px',
            }}>
            <TriviaProgress
              title={title}
              points={points}
              totalQuestions={questions.length}
            />
            <TriviaQuestion
              question={questions[currentQuestion - 1]}
              rightAnswer={points[currentQuestion - 1] === 'yes'}
              number={currentQuestion}
              setAnswer={handleAnswer}
              getNextQuestion={handleNextQuestion}
              fallbackImage={triviaImage}
            />
          </div>
        )}
        {started && currentQuestion > questions.length && (
          <>
            <div
              style={{
                margin: '0 auto',
                width: '100%',
                maxWidth: '540px',
              }}>
              <TriviaResult
                title={title}
                messageNull={messageNull}
                messagePoor={messagePoor}
                messageGood={messageGood}
                messagePerfect={messagePerfect}
                points={points}
                restart={handleRestart}
                siteUrl={siteUrl}
                requestUri={requestUri}
                twitter={twitterUser}
              />
            </div>
            <TriviasRecommended clientResize />
          </>
        )}
      </main>
    </>
  )
}

TriviasMain.propTypes = {
  customFields,
}

TriviasMain.label = 'Trivias Preguntas'

export default TriviasMain
