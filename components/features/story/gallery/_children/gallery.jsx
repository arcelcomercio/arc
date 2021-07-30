import * as React from 'react'

import UtilListKey from '../../../../utilities/list-keys'
import { processText } from '../../../../utilities/story/content'
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

const StoryHeaderChildGallery = (props) => {
  const {
    contentElementGallery: { content_elements: slides = [] } = {},
  } = props

  return (
    <>
      <div className={classes.gallery}>
        {slides.map((slide, i) => {
          const {
            credits: { affiliation: [{ name = '' } = {}] = [] } = {},
            width,
            height,
            url,
            caption,
            subtitle,
          } = slide
          const itemv = width < height && true
          return (
            <>
              {i === 1 && (
                <div id="gpt_caja2" className="flex justify-center" />
              )}
              {i === 3 && (
                <div id="gpt_caja3" className="flex justify-center" />
              )}
              {i === 5 && (
                <div id="gpt_caja4" className="flex justify-center" />
              )}
              {i === 7 && (
                <div id="gpt_caja5" className="flex justify-center" />
              )}
              {i === 9 && (
                <div id="gpt_caja6" className="flex justify-center" />
              )}
              {i === 11 && (
                <div id="gpt_caja7" className="flex justify-center" />
              )}
              {i === 13 && (
                <div id="gpt_caja8" className="flex justify-center" />
              )}
              {i === 15 && (
                <div id="gpt_caja9" className="flex justify-center" />
              )}
              {i === 17 && (
                <div id="gpt_caja10" className="flex justify-center" />
              )}
              {i === 19 && (
                <div id="gpt_caja11" className="flex justify-center" />
              )}
              {i === 21 && (
                <div id="gpt_caja12" className="flex justify-center" />
              )}
              {i === 23 && (
                <div id="gpt_caja13" className="flex justify-center" />
              )}
              {i === 25 && (
                <div id="gpt_caja14" className="flex justify-center" />
              )}
              {i === 27 && (
                <div id="gpt_caja15" className="flex justify-center" />
              )}

              <div
                className={`${classes.galleryItem} ${itemv && 'itemv'} `}
                // data-slide-number importante para "resources/assets/js/vertical-gallery.js"
                data-slide-number={i + 1}
                key={UtilListKey(i)}>
                <div className="more-compartir" />
                <span className={classes.galleryNumber}>
                  <strong> {i + 1} </strong>
                  de {slides.length}
                </span>
                <div className={classes.figure}>
                  <StoryGalleryChildPicture
                    url={url}
                    caption={caption}
                    subtitle={subtitle}
                    itemv={itemv}
                    i={i}
                    height={height}
                    width={width}
                  />
                </div>
                {name ? (
                  <span className={classes.galleryCredit}>{name}</span>
                ) : null}
                <figcaption className={classes.caption}>
                  <strong
                    className={classes.title}
                    dangerouslySetInnerHTML={{
                      __html: processText(subtitle),
                    }}
                  />
                  <p
                    itemProp="description"
                    className={classes.captionImage}
                    dangerouslySetInnerHTML={{
                      __html: processText(caption),
                    }}
                  />
                </figcaption>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default StoryHeaderChildGallery
