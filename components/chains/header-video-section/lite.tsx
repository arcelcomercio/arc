import * as React from 'react'

const classes = {
  container: 'header-video-section',
  main: 'header-video-section__main',
  side: 'header-video-section__side',
}

const HeaderVideoSection: React.FC = ({ children }) => {
  const lastChildren = children.splice(-1)
  return (
    <div className={classes.container}>
      <section className={classes.main}>{children}</section>
      <section className={classes.side}>{lastChildren}</section>
    </div>
  )
}

HeaderVideoSection.label = 'Header de la sección de videos'
HeaderVideoSection.static = true

export default HeaderVideoSection
