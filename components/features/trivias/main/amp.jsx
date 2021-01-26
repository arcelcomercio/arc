import * as React from 'react'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import TriviaStart from './amp/_children/start'
import TriviaQuestion from './amp/_children/question'
import TriviaResult from './amp/_children/result'

/**
 * @param {object} props
 * @param {object} props.customFields
 * @param {string} [props.customFields.messageNull]
 * @param {string} [props.customFields.messagePoor]
 * @param {string} [props.customFields.messageGood]
 * @param {string} [props.customFields.messagePerfect]
 */
const TriviasMainAmp = ({
  customFields: {
    messageNull = 'Puedes investigar un poco más y regresar',
    messagePoor = 'Bien, pero puedes investigar un poco más',
    messageGood = 'Bien hecho, por lo visto has investigado',
    messagePerfect = '¡Puntaje perfecto!  ',
  },
}) => {
  const { globalContent } = useFusionContext()

  const {
    content_elements: contentElements = '',
    promo_items: { basic: { url: triviaImage = '', caption = '' } = {} } = {},
    headlines: { basic: title = '' } = {},
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
            image: { url: image = '', alt = '' } = {},
            question: options = [],
          },
        } = {},
      } = trivia || {}

      return {
        question,
        response,
        image,
        alt,
        options,
      }
    })

  return (
    <>
      <amp-story
        standalone
        publisher="Stories Format"
        title="Soccer facts"
        poster-portrait-src="./last_supper.jpg"
        publisher-logo-src="https://amp.dev/static/img/icons/icon-512x512.png">
        <TriviaStart title={title} image={triviaImage} alt={caption} />
        {questions &&
          questions.map(el => {
            return <TriviaQuestion title={title} question={el} />
          })}
        <TriviaResult
          title={title}
          messageNull={messageNull}
          messagePoor={messagePoor}
          messageGood={messageGood}
          messagePerfect={messagePerfect}
          triviaImage={triviaImage}
        />
      </amp-story>
    </>
  )
}

TriviasMainAmp.propTypes = {
  customFields,
}

TriviasMainAmp.label = 'Trivias Preguntas Amp'

export default TriviasMainAmp
