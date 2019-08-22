import React from 'react'
import AmpImage from '@arc-core-components/element_image'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative mt-30',
  galleryNumber:
    'story-gallery__number bg-white flex items-center justify-center position-absolute rounded-lg',
  image: 'story-gallery__img w-full h-full mb-10',
  caption: 'story-gallery__caption text-gray-200 text-sm',
}

const StoryHeaderChildAmpGallery = props => {
  const { data, websiteUrl } = props

  const slider = '[slide]="selectedSlide"'
  const imgTag = 'amp-img'
  const sizerImg = 'amp'
  return (
    <>
      <div className={classes.gallery}>
        <amp-carousel
          width="600"
          height="375"
          layout="responsive"
          type="slides"
          {...slider}
          on={`slideChange:AMP.setState({selectedSlide: event.index}),AMP.navigateTo(url='${websiteUrl}?foto=2')`}
          class="media gallery">
          {data.map(item => (
            <>
              <AmpImage
                {...item}
                ImgTag={imgTag}
                imgClassName={classes.image}
                layout="responsive"
                sizePreset={sizerImg}
              />
            </>
          ))}
        </amp-carousel>

        <amp-carousel width="600" height="375" layout="nodisplay" type="slides">
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
