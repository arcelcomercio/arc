import React from 'react'

export default ({ url, isAmp = false, siteUrl }) => {
  const classes = {
    container: `${
      isAmp ? 'amp-story-content__stamp-trust' : 'story-content__stamp-trust'
    }`,
    box_left: `${
      isAmp
        ? 'amp-story-content__stamp-trust__box-left'
        : 'story-content__stamp-trust__box-left'
    }`,
    img: `${
      isAmp
        ? 'amp-story-content__stamp-trust__img'
        : 'story-content__stamp-trust__img'
    }`,
  }

  const urlTrust = url || `${siteUrl}/buenas-practicas/`
  const urlImgTrust =
    'https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/banner-trust-project/logo-trust.png'

  const imgTag = isAmp ? (
    <amp-img
      class={classes.img}
      src={urlImgTrust}
      alt="Trust Project"
      width="150"
      height="25"
      tabIndex="0"
    />
  ) : (
    <img src={urlImgTrust} alt="Trust Project" width="100%" />
  )

  return (
    <div className={classes.container}>
      <div className={classes.box_left}>
        <p>Conforme a los criterios de</p>
        {imgTag}
      </div>
      <a href={urlTrust} target="_blank" rel="noreferrer">
        Saber más
      </a>
    </div>
  )
}
