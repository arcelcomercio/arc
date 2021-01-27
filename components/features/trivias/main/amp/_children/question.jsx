import * as React from 'react'

import Image from '../../../../../global-components/image'

const classes = {
  container: 'trivias-quiz',
  image: 'trivias-quiz__image',
  body: 'trivias-quiz__body',
  nextButton: 'trivias-quiz__next',
  header: '  trivias-start__header',
}

/**
 *
 * @param {object} props
 * @param {object} props.question
 * @param {string} props.question.question
 * @param {string} props.question.image
 * @param {string} props.question.alt
 * @param {Array} props.question.options
 */

const TriviasMainQuestionAmp = ({
  question: { question, image, alt, options } = {},
  children = {},
}) => {
  let optionsResul = ''
  options.forEach((el, index) => {
    // option-3-confetti="⚽"
    const option =
      el.response === true
        ? `option-${index + 1}-text="${el.name}" option-${index + 1}-correct`
        : `option-${index + 1}-text="${el.name}"`
    optionsResul = `${option} ${optionsResul}`
  })

  const optionsOptions = () => {
    return `
    <amp-story-interactive-quiz
    id="quiz-1"
    class="center"
    endpoint="https://amp.dev/documentation/examples/components/amp-story-interactive-poll/results"
    prompt-size="large"
    chip-style="transparent"
      ${optionsResul}
    ></amp-story-interactive-quiz>`
  }

  return (
    <>
      <amp-story-page
        id="page-quiz-1"
        class={classes.container}
        style={{ 'background-color': '#fff' }}>
        <amp-story-grid-layer template="horizontal">
          <div
            className={classes.header}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
            {children}
          </div>
          <div
            style={{
              'text-align': 'center',
              color: '#000',
              'font-size': '17px',
              'font-weight': 900,
            }}>
            {question}
          </div>
        </amp-story-grid-layer>
        <amp-story-grid-layer
          template="horizontal"
          style={{ padding: '110px 1px 4px;' }}>
          <Image
            src={image}
            width={460}
            height={340}
            sizes=""
            sizesHeight={[660, 660, 660]}
            alt={alt}
            className={classes.image}
            style={{
              position: 'absolute',
              objectFit: 'cover',
              objectPosition: 'center',
              height: '100%',
              width: '100%',
            }}
            loading="eager"
          />
        </amp-story-grid-layer>

        <amp-story-grid-layer
          template="vertical"
          style={{ 'margin-top': '286px' }}>
          <div
            animate-in="scale-fade-up"
            dangerouslySetInnerHTML={{
              __html: optionsOptions(options),
            }}></div>

          <div
            style={{
              transform: `scale(1)`,
            }}
            className={classes.nextButton}>
            Siguiente
          </div>
        </amp-story-grid-layer>
      </amp-story-page>
    </>
  )
}

export default TriviasMainQuestionAmp
