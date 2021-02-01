import * as React from 'react'

import Image from '../../../../../global-components/image'

const classes = {
  container: 'trivias-start',
  image: 'trivias-start__image',
  title: 'trivias-start__title',
  header: 'trivias-start__header',
  button: 'trivias-start__button',
}
const TriviasMainStart = ({
  image = '',
  title = '',
  alt = '',
  children = {},
} = {}) => {
  return (
    <amp-story-page id="ysjlrjtqex" class="ysjlrjtqex ms-st-pg">
      <amp-story-grid-layer
        template="fill"
        style={{ 'background-color': 'black' }}>
        <Image
          src={image}
          width={360}
          height={640}
          sizes=""
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
          className={classes.container}
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: '1170px',
            height: '100%',
            minHeight: '660px',
          }}>
          <h1
            className={classes.title}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
            {title}
          </h1>
          <div
            className={classes.button}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
            Empezar
          </div>
        </div>
      </amp-story-grid-layer>
    </amp-story-page>
  )
}

export default TriviasMainStart
