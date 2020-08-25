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
  }

  const urlTrust = url || `${siteUrl}/proyecto-confianza/`
  return (
    <div className={classes.container}>
      <div className={classes.box_left}>
        <p>Conforme a los criterios de</p>
        <img
          src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/banner-trust-project/logo-trust.png"
          alt="Trust Project"
          width="100%"
        />
      </div>
      <a href={urlTrust} target="_blank" rel="noreferrer">
        Saber más
      </a>
    </div>
  )
}
