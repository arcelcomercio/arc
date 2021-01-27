import * as React from 'react'
import { useFusionContext, useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import TriviaStart from './amp/_children/start'
import TriviaQuestion from './amp/_children/question'
import TriviaResult from './amp/_children/result'

import Header from '../../header/simple/_children/amp/header'
import AmpTagManager from '../../../output-types/_children/amp-tag-manager'

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
  const { globalContent, siteProperties } = useFusionContext()
  const { requestUri, arcSite } = useAppContext()
  const { siteUrl, social: { twitter: { user } = {} } = {} } = getProperties(
    arcSite
  )

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
  const bookend = `{
  "bookendVersion": "v1.0",
  "shareProviders": [
    "twitter",
    {
      "provider": "facebook",
      "app_id": "254325784911610"
    },
    "tumblr",
    "email"
  ],
  "components": []
}`
  const { taxonomy: { sections } = {}, credits: { by: autors } = {} } =
    globalContent || {}

  const parametros = {
    sections,
    autors,
    siteProperties,
    arcSite,
    globalContent,
    requestUri,
  }
  return (
    <>
      <amp-story
        standalone=""
        title={title}
        publisher="The AMP Team"
        publisher-logo-src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5BBQDK5IZVCTVMSINQADQ2YWRI.jpg"
        poster-portrait-src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5BBQDK5IZVCTVMSINQADQ2YWRI.jpg"
        poster-square-src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5BBQDK5IZVCTVMSINQADQ2YWRI.jpg"
        poster-landscape-src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5BBQDK5IZVCTVMSINQADQ2YWRI.jpg">
        <AmpTagManager {...parametros} />

        <TriviaStart title={title} image={triviaImage} alt={caption}>
          <Header
            requestUri={requestUri}
            siteUrl={siteUrl}
            arcSite={arcSite}
            twitter={user}
            customLogo=""></Header>
        </TriviaStart>
        {questions &&
          questions.map(el => {
            return (
              <TriviaQuestion title={title} question={el}>
                {' '}
                <Header
                  requestUri={requestUri}
                  siteUrl={siteUrl}
                  arcSite={arcSite}
                  twitter={user}
                  customLogo=""></Header>
              </TriviaQuestion>
            )
          })}
        <TriviaResult
          title={title}
          requestUri={requestUri}
          messageNull={messageNull}
          messagePoor={messagePoor}
          messageGood={messageGood}
          messagePerfect={messagePerfect}
          triviaImage={triviaImage}>
          <Header
            requestUri={requestUri}
            siteUrl={siteUrl}
            arcSite={arcSite}
            twitter={user}
            customLogo=""></Header>
        </TriviaResult>
        <amp-story-bookend layout="nodisplay">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: bookend,
            }}></script>
        </amp-story-bookend>
      </amp-story>
    </>
  )
}

TriviasMainAmp.propTypes = {
  customFields,
}

TriviasMainAmp.label = 'Trivias Preguntas Amp'

export default TriviasMainAmp
