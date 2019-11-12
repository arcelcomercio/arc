import React from 'react'
import AmpImage from '@arc-core-components/element_image'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative mt-30',
  galleryNumber:
    'story-gallery__number bg-white flex items-center justify-center position-absolute rounded-lg',
  image: 'story-gallery__img w-full h-full mb-10',
  caption: 'story-gallery__caption text-gray-200 text-sm',
  controlRight: 'story-gallery__control-right',
  pager: 'story-gallery__pager pb-15 pt-15 mb-5',
  count: 'story-gallery__count font-bold text-center mx-auto',
}

const StoryHeaderChildAmpGallery = props => {
  const { data, link, siteUrl } = props
  const slider = '[slide]="selectedSlide"'
  const imgTag = 'amp-img'
  const sizerImg = 'amp'
  const numeroFoto = ' [text]="+selectedSlide + 1"'
  return (
    <>
      <div className={classes.gallery}>
        <div className={classes.pager}>
          <div className={classes.count}>
            Foto <span {...numeroFoto}>1 </span> de {data.length}
          </div>
        </div>
        <amp-carousel
          width="600"
          height="480"
          layout="responsive"
          type="slides"
          {...slider}
          on={`slideChange:AMP.setState({selectedSlide: event.index}),AMP.navigateTo(url='${siteUrl}${link}?foto=2&source=amp')`}
          class="media gallery">
          {data.map(({ resized_urls: resizedUrls, url, caption }) => (
            <>
              <div className="slide">
                <div className="inner">
                  <amp-img
                    src={(resizedUrls && resizedUrls.amp) || url}
                    alt={caption}
                    class={classes.image}
                    height="360"
                    width="600"
                    layout="responsive"
                  />
                  <a
                    href={`${siteUrl}${link}?foto=2`}
                    className={classes.controlRight}>
                    {``}
                  </a>
                </div>
                <div className="legend">
                  <div className="caption">{caption}</div>
                </div>
              </div>
            </>
          ))}
        </amp-carousel>
        <amp-carousel width="600" height="480" layout="nodisplay" type="slides">
          {data.map(item => (
            <div className="slide">
              <AmpImage
                {...item}
                ImgTag={imgTag}
                imgClassName={classes.image}
                layout="responsive"
                sizePreset={sizerImg}
              />
            </div>
          ))}
        </amp-carousel>
      </div>
    </>
  )
}

export default StoryHeaderChildAmpGallery
