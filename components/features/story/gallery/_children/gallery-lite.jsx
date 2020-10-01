import React from 'react'

import UtilListKey from '../../../../utilities/list-keys'
import StoryGalleryChildPicture from './picture'

const classes = {
  gallery: 'story-gallery  ',
  galleryItem: 'story-gallery__item pr  gvi',
  galleryCredit: 'story-gallery__credit text-sm',
  galleryNumber: 'story-gallery__number f ',
  image: 'story-gallery__img w-full h-full ',
  caption: 'story-gallery__caption ',
  figure: 'story-gallery__figure ',
  captionImage: 'story-gallery__caption-image ',
  title: 'story-gallery__title',
}

const StoryHeaderChildGallery = props => {
  const {
    defaultImageGallery,
    contentElementGallery: { content_elements: sliders = [] } = {},
  } = props

  return (
    <>
      <div className={classes.gallery}>
        {sliders.map((slide, i) => {
          const {
            credits: { affiliation: [{ name = '' } = {}] = [] } = {},
            width,
            height,
          } = slide
          const itemv = width < height && true
          return (
            <div
              className={`${classes.galleryItem} ${itemv && 'itemv'}  `}
              key={UtilListKey(i)}>
              <span className={classes.galleryNumber}>
                <strong> {i + 1} </strong>
                de {sliders.length}
              </span>
              <div className={classes.figure}>
                <StoryGalleryChildPicture
                  {...slide}
                  defaultImageGallery={defaultImageGallery}
                  itemv={itemv}
                  i={i}
                />
              </div>
              {name && <span className={classes.galleryCredit}>{name}</span>}
              <figcaption className={classes.caption}>
                <strong
                  className={classes.title}
                  dangerouslySetInnerHTML={{
                    __html: slide.subtitle,
                  }}
                />
                <p
                  itemProp="description"
                  className={classes.captionImage}
                  dangerouslySetInnerHTML={{
                    __html: slide.caption,
                  }}
                />
              </figcaption>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default StoryHeaderChildGallery
