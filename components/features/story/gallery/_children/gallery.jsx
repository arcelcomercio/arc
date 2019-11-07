import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'
import StoryGalleryChildSocial from './social'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative mt-30',
  galleryNumber:
    'story-gallery__number flex items-center justify-center rounded-lg font-bold',
  image: 'story-gallery__img w-full h-full mb-10',
  caption: 'story-gallery__caption flex items-center text-sm',
  figure: 'story-gallery__figure',
  captionImage: 'story-gallery__caption-image ml-10 text-gray-300 text-md',
}

const StoryHeaderChildGallery = props => {
  const {
    isAdmin,
    contentElementGallery: { content_elements: sliders = [] } = {},
  } = props
  return (
    <>
      <div className={classes.gallery}>
        {sliders.map((slide, i) => (
          <div className={classes.galleryItem} key={UtilListKey(i)}>
            <div className={classes.figure}>
              <picture>
                <source
                  className={isAdmin ? '' : 'lazy'}
                  media="(max-width: 639px)"
                  srcSet={isAdmin ? slide.url : slide.url}
                  data-srcset={slide.url}
                />
                <img
                  src={isAdmin ? slide.url : slide.url}
                  data-src={slide.url}
                  alt={slide.caption || slide.subtitle}
                  title={slide.caption || slide.subtitle}
                  className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                />
              </picture>
            </div>
            <figcaption className={classes.caption}>
              <span className={classes.galleryNumber}>{i + 1}</span>
              <p className={classes.captionImage}>
                {slide.caption || slide.subtitle}
              </p>
              <StoryGalleryChildSocial />
            </figcaption>
          </div>
        ))}
      </div>
    </>
  )
}

export default StoryHeaderChildGallery
