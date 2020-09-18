import React from 'react'
import { useAppContext } from 'fusion:context'
import { createResizedParams } from '../../../../utilities/resizer/resizer'
import { getDateSeo } from '../../../../utilities/date-time/dates'
import { formatDateStoryAmp } from '../../../../utilities/story/helpers-amp'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative mt-30',
  galleryNumber:
    'story-gallery__number bg-white flex items-center justify-center position-absolute rounded-lg',
  image: 'story-gallery__img w-full h-full mb-5',
  caption: 'story-gallery__caption text-gray-200 text-sm',
  controlRight: 'story-gallery__control-right',
  pager: 'story-gallery__pager pb-15 pt-15 mb-5',
  count: 'story-gallery__count font-bold text-center mx-auto',
}

const StoryHeaderChildAmpGallery = props => {
  const { data, displayDate: updatedDate, author, authorLink } = props

  const { arcSite } = useAppContext()
  const extractImage = (urlImg, presets) => {
    if (typeof window === 'undefined') {
      const imageObject =
        createResizedParams({
          url: urlImg,
          presets,
          arcSite,
        }) || {}
      return {
        original: imageObject.original,
        large: imageObject.large,
        images: `${imageObject.large} 1024w,${imageObject.meddiun} 600w,${imageObject.small} 360w`,
      }
    }
    return urlImg
  }

  return (
    <>
      <p className={classes.author}>
        <a href={authorLink}>{author}</a>
      </p>
      <time dateTime={getDateSeo(updatedDate)} className={classes.datetime}>
        {formatDateStoryAmp(updatedDate)}
      </time>
      <div className={classes.gallery}>
        {data.map(
          (
            {
              url,
              caption,
              credits: { affiliation: [{ name = '' } = {}] } = {},
              width,
              height,
              subtitle,
            },
            i
          ) => {
            const presets =
              width < height
                ? 'large:1024x,meddiun:620x,small:330x'
                : 'large:1024x612,meddiun:620x280,small:330x178'

            return (
              <>
                <div className={classes.pager}>
                  <div className={classes.count}>
                    Foto <span>{i} </span> de {data.length}
                  </div>
                </div>
                <div className="slide">
                  <div className="inner">
                    <amp-img
                      sizes="(max-width: 360px) 50vw,(max-width: 750px) 50vw"
                      srcset={extractImage(url, presets).images || url}
                      alt={caption}
                      class={classes.image}
                      height={width < height ? 800 : 360}
                      width="600"
                      layout="responsive"
                    />
                  </div>
                  <span className="credit mb-10">{name}</span>
                  <div className="subtitle mb-15 mt-10">
                    <strong
                      dangerouslySetInnerHTML={{
                        __html: subtitle,
                      }}
                    />
                  </div>
                  <div
                    className="caption mb-15 mt-10"
                    dangerouslySetInnerHTML={{
                      __html: caption,
                    }}
                  />
                </div>
              </>
            )
          }
        )}
      </div>
    </>
  )
}

export default StoryHeaderChildAmpGallery
