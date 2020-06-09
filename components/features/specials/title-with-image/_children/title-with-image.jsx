import React from 'react'

const classes = {
  container: 'position-relative',
  containerText:
    'title-with-image__container-text position-absolute text-center text-white flex flex-col items-center',
  title: 'title-with-image__title',
  imageBg: 'w-full',
  mouseIcon: 'title-with-image__mouse-icon bg-white pt-10 pb-10 pl-15 pr-15',
  scroller: 'title-with-image__scroller bg-black',
}

const TitleWithImageChildSpecial = props => {
  const {
    storyTitle = '',
    imageStory: { resized_urls: { landscape_xl: landscapeXL = '' } = {} } = {},
    storySubtitle = '',
  } = props

  return (
    <div className={classes.container}>
      <picture>
        <img className={classes.imageBg} src={landscapeXL} alt="" />
      </picture>
      <div className={classes.containerText}>
        <h1 className={classes.title}>{storyTitle}</h1>
        <h2>{storySubtitle}</h2>
        <div className={classes.mouseIcon}>
          <div className={classes.scroller}></div>
        </div>
      </div>
    </div>
  )
}

export default TitleWithImageChildSpecial
