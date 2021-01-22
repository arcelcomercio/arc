import * as React from 'react'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
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
    messagePerfect = '¡Puntaje perfecto!  '
  }
}) => {
  const { globalContent } = useFusionContext()

  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [points, setPoints] = React.useState(0)
  const [started, setStarted] = React.useState(false) 

  // verificar cuantos custom_embeds de tipo trivia
  // vienen en content_elements, esa es la cantidad de preguntas.
  const { 
    content_elements: contentElements = '',
    headlines: {
      basic: title = ''
    } = {}
  } = globalContent || {}

  const questions = contentElements
    .filter(element => element.subtype === 'trivia' && element.type === 'custom_embed')
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
            question: options = []
          }
        } = {}
      } = trivia || {}

      // question enviada a `<TriviaQuestion>`
      return {
        question,
        response,
        image,
        alt,
        options
      }
    })

  // hacer funcion aparte para refresh de publicidad
  // y para envio de data a tagManager
  // porque deberia ocurrir tambien cuando se 
  // inicia y reinicia la trivia
  
  // funcion que se ejecuta al pasar a siguiente pregunta
  const handleAnswer = (rightAnswer = false) => {
    if(rightAnswer) setPoints(points + 1)
    setCurrentQuestion(currentQuestion + 1)

    // envio de evento a tagManager
    window.dataLayer = window.dataLayer || [] 
    window.dataLayer.push({ 
      event: 'trivia', 
      data: 'hace falta definir informacion a enviar'
    });

    // refresh de publicidad
    window.googletag = window.googletag || {cmd: []}; 
    window.googletag.cmd.push(() => {
      window.googletag.pubads().refresh()
    })
  }

  return (
    <main style={{margin: '0 auto'}}>
      {!started && <TriviaStart title={title} start={() => setStarted(true)}/>}
      {started && currentQuestion < questions.length ? (
        <TriviaQuestion 
          title={title}
          question={questions[currentQuestion]}
          setAnswer={handleAnswer}
        />
      ) : (
        <TriviaResult 
          title={title}
          messageNull={messageNull}
          messagePoor={messagePoor}
          messageGood={messageGood}
          messagePerfect={messagePerfect}
          points={points}
          restart={() => setStarted(false)}
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