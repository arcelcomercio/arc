import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  container: 'trivias-start',
  title: 'trivias-start__title',
  button: 'trivias-start__button'
}

const TriviasMainStart = ({
  title, 
  image,
  alt,
  start, 
}) => {
  return (
    <div style={{
      margin: '0 auto',
      width: '100%',
      maxWidth: '1170px',
    }}>
      <div style={{
        width: '100%',
        position: 'relative',
        paddingTop: '56.25%',
        overflow: 'hidden'
      }}>
        <Image 
          src={image}
          width={1170}
          height={660}
          sizes='(max-width: 360px) 360px, 1170px'
          alt={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right:0,
            bottom:0
          }}
          loading="eager"
        />
        <h1 className={classes.title} style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>{title}</h1>
        <button type="button" onClick={start} className={classes.button} style={{
          position: 'absolute',
          top: '92%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          Empezar
        </button>
      </div>
    </div>
  )
}

export default TriviasMainStart
