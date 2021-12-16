import * as React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'
import { PromoItems } from 'types/story'

import UtilListKey from '../../../../../utilities/list-keys'
import { processText } from '../../../../../utilities/story/content'
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

interface FeatureProps {
  promoItems?: PromoItems
  arcSite?: ArcSite
  seccioPublicidad?: string
}

const StoryHeaderChildGallery: FC<FeatureProps> = (props) => {
  const { promoItems, arcSite } = props

  const slides = promoItems?.basic_gallery?.content_elements || []
  const { seccioPublicidad } = props

  return (
    <>
      <div className={classes.gallery}>
        {slides.map((slide, i) => {
          const name = slide?.credits?.affiliation?.name
          const width = slide?.width
          const height = slide?.height
          const subtitle = slide?.subtitle
          const caption = slide?.caption
          const large = slide?.resized_urls?.large
          const medium = slide?.resized_urls?.landscape_md
          const small = slide?.resized_urls?.landscape_s
          const itemv = width < height && true
          return (
            <>
              {i === 1 && (
                <div className="content_gpt_caja2">
                  <div
                    id="gpt_caja2"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja2`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="4"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 3 && (
                <div className="content_gpt_caja3">
                  <div
                    id="gpt_caja3"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja3`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 5 && (
                <div className="content_gpt_caja4">
                  <div
                    id="gpt_caja4"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja4`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 7 && (
                <div className="content_gpt_caja5">
                  <div
                    id="gpt_caja5"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja5`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 9 && (
                <div className="content_gpt_caja6">
                  <div
                    id="gpt_caja6"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja6`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 11 && (
                <div className="content_gpt_caja7">
                  <div
                    id="gpt_caja7"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja7`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 13 && (
                <div className="content_gpt_caja8">
                  <div
                    id="gpt_caja8"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja8`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 15 && (
                <div className="content_gpt_caja9">
                  <div
                    id="gpt_caja9"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja9`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 17 && (
                <div className="content_gpt_caja10">
                  <div
                    id="gpt_caja10"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja10`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 19 && (
                <div className="content_gpt_caja11">
                  <div
                    id="gpt_caja11"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja11`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 21 && (
                <div className="content_gpt_caja12">
                  <div
                    id="gpt_caja12"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja12`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 23 && (
                <div className="content_gpt_caja13">
                  <div
                    id="gpt_caja13"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja13`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 25 && (
                <div className="content_gpt_caja14">
                  <div
                    id="gpt_caja14"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja14`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
              )}
              {i === 27 && (
                <div className="content_gpt_caja15">
                  <div
                    id="gpt_caja15"
                    className="f just-center"
                    data-ads-name={`/28253241/${arcSite}/web/galeria_v/${seccioPublicidad}/caja15`}
                    data-ads-dimensions="[[300,250]]"
                    data-bloque="3"
                    data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"
                  />
                </div>
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
                    large={large}
                    medium={medium}
                    small={small}
                    caption={caption}
                    subtitle={subtitle}
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
