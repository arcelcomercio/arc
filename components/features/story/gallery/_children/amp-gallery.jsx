import React from 'react'
import { useAppContext } from 'fusion:context'
import { createResizedParams } from '../../../../utilities/resizer/resizer'
import { publicidadAmp, ampHtml } from '../../../../utilities/story/helpers-amp'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'

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

const StoryHeaderChildAmpGallery = props => {
  const { data, primarySectionLink, adsAmp } = props

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

  const publicidadAmpAd = (
    caja,
    size = '300x250,320x100,320x50,300x100,300x50',
    fluid
  ) => {
    const namePublicidad = arcSite !== 'peru21g21' ? arcSite : SITE_PERU21
    const dataSlot = `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/${caja}`
    const prebidSlot = `19186-${namePublicidad}-amp-${caja}`
    return {
      dataSlot,
      prebidSlot,
      width: '300',
      height: '250',
      primarySectionLink,
      arcSite,
      movil1: true,
      size,
      fluid
    }
  }
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

                {i === 0 && (
                  <div
                    className={classes.adsAmp}
                    dangerouslySetInnerHTML={publicidadAmp(
                      publicidadAmpAd('caja2', '320x100,320x50', true)
                    )}
                  />
                )}
                {i === 2 && (
                  <div
                    className={classes.adsAmp}
                    dangerouslySetInnerHTML={publicidadAmp(
                      publicidadAmpAd('caja3', '320x100,320x50,300x1', false)
                    )}
                  />
                )}
                {i === 4 && (
                  <div
                    className={classes.adsAmp}
                    dangerouslySetInnerHTML={publicidadAmp(
                      publicidadAmpAd('caja4', '320x100,320x50', false)
                    )}
                  />
                )}
                {i === 6 && (
                  <div
                    className={classes.adsAmp}
                    dangerouslySetInnerHTML={publicidadAmp(
                      publicidadAmpAd('caja5', '320x100,320x50', false)
                    )}
                  />
                )}
              </>
            )
          }
        )}
      </div>
    </>
  )
}

export default StoryHeaderChildAmpGallery
