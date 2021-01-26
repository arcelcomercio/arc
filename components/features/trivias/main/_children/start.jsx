import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  container: 'trivias-start',
  image: 'trivias-start__image',
  title: 'trivias-start__title',
  button: 'trivias-start__button',
}

const TriviasMainStart = ({ title, image, alt, start }) => {
  return (
    <div
      className={classes.container}
      style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: '1170px',
        height: '100%',
        minHeight: '660px',
        position: 'relative',
      }}>
      <Image
        src={image}
        width={1170}
        height={660}
        sizes="(max-width: 360px) 360px, (max-width: 480px) 480px, (max-width: 768px) 768px, 1170px"
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
      <h1
        className={classes.title}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
        {title}
      </h1>
      <button
        type="button"
        onClick={start}
        className={classes.button}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
        Empezar
      </button>
    </div>
  )
}

export default React.memo(TriviasMainStart)
