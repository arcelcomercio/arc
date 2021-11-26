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
    promo_items: {
      basic: { url: triviaImageDefault = '', caption = '' } = {},
      basic_movil: { url: triviaImageMovil = '' } = {},
    } = {},
    headlines: { basic: title = '' } = {},
  } = globalContent || {}

  const triviaImage = triviaImageMovil || triviaImageDefault
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

  const namePublicidad = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/28253241/${namePublicidad}/amp/post/default/zocalo`

  return (
    <>
      <amp-story
        standalone=""
        title={title}
        publisher="AMP"
        publisher-logo-src={triviaImage}
        poster-portrait-src={triviaImage}
        poster-square-src={triviaImage}
        poster-landscape-src={triviaImage}>
        <AmpTagManager
          requestUri={requestUri}
          arcSite={arcSite}
          globalContent={globalContent}
          sections={sections}
          autors={autors}
          siteProperties={siteProperties}
        />

        <amp-story-auto-ads>
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: `{
                  "ad-attributes": {
                    "type": "doubleclick",
                    "data-slot": "${dataSlot}",
                  }
                }`,
            }}
          />
        </amp-story-auto-ads>

        <TriviaStart title={title} image={triviaImage} alt={caption}>
          <Header
            requestUri={requestUri}
            siteUrl={siteUrl}
            arcSite={arcSite}
            twitter={user}
            width={90}
            height={35}
            customLogo=""></Header>
        </TriviaStart>
        {questions &&
          questions.map(el => {
            return (
              <TriviaQuestion
                title={title}
                question={el}
                triviaImage={triviaImage}>
                {' '}
                <Header
                  requestUri={requestUri}
                  siteUrl={siteUrl}
                  arcSite={arcSite}
                  width={90}
                  height={35}
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
            width={90}
            height={35}
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
