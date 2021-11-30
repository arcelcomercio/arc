import { useAppContext } from 'fusion:context'
import React from 'react'

import { createResizedParams } from '../../../../utilities/resizer/resizer'
import { ampHtml } from '../../../../utilities/story/helpers-amp'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative pt-20 gvi',
  galleryNumber:
    'story-gallery__number bg-white flex items-center justify-center rounded-lg',
  image: 'story-gallery__img w-full h-full mb-5',
  caption: 'story-gallery__caption-image text-gray-200 text-sm mb-15 mt-10',
  title: 'story-gallery__title mb-15 mt-10',
  figure: 'story-gallery__figure pt-10',
  adsAmp: 'text-center ad-amp-movil',
}

const StoryHeaderChildAmpGallery = (props) => {
  const { data, dataCustomFields } = props

  const { arcSite } = useAppContext()
  const extractImage = (urlImg, presets) => {
    if (typeof window === 'undefined') {
      const imageObject =
        createResizedParams({
          url: urlImg,
          presets,
          arcSite,
        }) || {}
      return imageObject.meddiun
    }
    return urlImg
  }

  const activeAds = Object.keys(dataCustomFields).filter((prop) =>
    prop.match(/ampAdLoadBlock(\d)/)
  )
  return (
    <>
      <div className={classes.gallery}>
        {data.map(
          (
            {
              url,
              caption,
              credits: { affiliation: [{ name = '' } = {}] = [] } = {},
              width,
              height,
              subtitle,
            },
            i
          ) => {
            const presets = 'large:1024x,meddiun:560x,small:330x'

            return (
              <>
                <div className={classes.galleryItem}>
                  <div className={classes.galleryNumber}>
                    <strong> {i + 1} </strong> de {data.length}
                  </div>
                  <div className={classes.figure}>
                    <amp-img
                      src={extractImage(url, presets) || url}
                      alt={caption}
                      class={classes.image}
                      height={width < height ? 800 : 360}
                      width="600"
                      layout="responsive"
                    />
                    <span className="credit mb-10">{name}</span>
                  </div>
                  <div className={classes.title}>
                    <strong
                      dangerouslySetInnerHTML={{
                        __html: ampHtml(subtitle),
                      }}
                    />
                  </div>
                  <div
                    className={classes.caption}
                    dangerouslySetInnerHTML={{
                      __html: ampHtml(caption),
                    }}
                  />
                </div>
                {activeAds.map((el) => {
                  let htmlPublicidad = ''
                  if (i === dataCustomFields[el]) {
                    const matches = el.match(/([0-9])+/)
                    htmlPublicidad = dataCustomFields[`freeHtml${matches[1]}`]
                  }
                  return (
                    htmlPublicidad && (
                      <div
                        className={classes.adsAmp}
                        dangerouslySetInnerHTML={{
                          __html: htmlPublicidad,
                        }}
                      />
                    )
                  )
                })}
              </>
            )
          }
        )}
      </div>
    </>
  )
}

export default StoryHeaderChildAmpGallery
