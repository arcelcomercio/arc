import React from 'react'

const TitleWithImageChildSpecial = props => {
  const {
    storyTitle = '',
    imageStory: { resized_urls: { landscape_xl: landscapeXL = '' } = {} } = {},
    storySubtitle = '',
    hideTitle,
    hideSubtitle,
  } = props

  const classes = {
    container: 'position-relative',
    containerText:
      'title-with-image__container-text position-absolute text-center text-white flex flex-col items-center',
    title: 'title-with-image__title font-bold',
    subtitle: 'title-with-image__subtitle mt-20 font-bold',
    imageBg: `${
      hideTitle || hideSubtitle
        ? 'title-with-image__image--wfull'
        : 'title-with-image__image'
    } w-full`,
    mouseIcon:
      'title-with-image__mouse-icon bg-white pt-10 pb-10 pl-15 pr-15 position-absolute',
    scroller: 'title-with-image__scroller bg-black',
  }

  return (
    <div className={classes.container}>
      <picture>
        <img className={classes.imageBg} src={landscapeXL} alt="" />
      </picture>
      <div className={classes.containerText}>
        {!hideTitle && <h1 className={classes.title}>{storyTitle}</h1>}
        {!hideSubtitle && <h2 className={classes.subtitle}>{storySubtitle}</h2>}
      </div>
      <div className={classes.mouseIcon}>
        <div className={classes.scroller}></div>
      </div>
    </div>
  )
}

export default TitleWithImageChildSpecial
