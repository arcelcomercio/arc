import React from 'react'
import { useAppContext } from 'fusion:context'

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
    seccioPublicidad,
    contentElementGallery: { content_elements: sliders = [] } = {},
  } = props
  const { arcSite } = useAppContext()

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
                <div
                  id="gpt_caja2"
                  className="f just-center"
                  data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja2`}
                  data-ads-dimensions="[[300,250]]"
                  data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>
              )}
              {i === 3 && (
                <div
                  id="gpt_caja3"
                  className="f just-center"
                  data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja3`}
                  data-ads-dimensions="[[300,250]]"
                  data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>
              )}
              {i === 5 && (
                <div
                  id="gpt_caja4"
                  className="f just-center"
                  data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja4`}
                  data-ads-dimensions="[[300,250]]"
                  data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>
              )}
              {i === 7 && (
                <div
                  id="gpt_caja5"
                  className="f just-center"
                  data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja5`}
                  data-ads-dimensions="[[300,250]]"
                  data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>
              )}
              <div
                className={`${classes.galleryItem} ${itemv && 'itemv'} `}
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
            </>
          )
        })}
      </div>
    </>
  )
}

export default StoryHeaderChildGallery
