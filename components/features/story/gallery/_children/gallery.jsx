import React from 'react'

import UtilListKey from '../../../../utilities/list-keys'
import StoryGalleryChildPicture from './picture'

const classes = {
  gallery: 'story-gallery pt-5 pr-20 pl-20 ',
  galleryItem: 'story-gallery__item position-relative pt-20 gvi',
  galleryCredit: 'story-gallery__credit text-sm',
  galleryNumber:
    'story-gallery__number flex items-center ml-10 justify-center font-bold',
  image: 'story-gallery__img w-full h-full mb-10',
  caption: 'story-gallery__caption items-center pt-15 text-sm line-h-md',
  figure: 'story-gallery__figure pt-10',
  captionImage: 'story-gallery__caption-image mb-20 mt-5 text-gray-300 text-md',
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
            <>
              {i === 1 && (
                <div id="gpt_caja2" className="flex justify-center"></div>
              )}
              {i === 3 && (
                <div id="gpt_caja3" className="flex justify-center"></div>
              )}
              {i === 5 && (
                <div id="gpt_caja4" className="flex justify-center"></div>
              )}

              <div
                className={`${classes.galleryItem} ${itemv && 'itemv'} `}
                // data-slide-number importante para "resources/assets/js/vertical-gallery.js"
                data-slide-number={i + 1}
                key={UtilListKey(i)}>
                <div className="more-compartir"></div>
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
              {i === 6 && (
                <div id="gpt_caja5" className="flex justify-center"></div>
              )}
            </>
          )
        })}
      </div>
    </>
  )
}

export default StoryHeaderChildGallery
