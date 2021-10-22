/* eslint-disable camelcase */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'

import { formatDayMonthYearBasic } from '../../../../utilities/date-time/dates'
import StoryData from '../../../../utilities/story-data'

const placeholderSrc = (width, height) =>
  `data:image/svg+xml,%3Csvg  viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`

const ParallaxImage = ({ data, id }) => {
  const { resized_urls: { image } = {} } =
    useContent(
      data?.url
        ? {
            source: 'photo-resizer',
            query: {
              url: data?.url,
              presets: 'image:2000x0',
            },
          }
        : ''
    ) || {}

  const { resized_urls: { mobile_image: mobileImage } = {} } =
    useContent(
      data?.url_mobile
        ? {
            source: 'photo-resizer',
            query: {
              url: data?.url_mobile,
              presets: 'mobile_image:640x0',
            },
          }
        : ''
    ) || {}

  return (
    <div style={{ padding: '64px 0', margin: 0, maxWidth: 'none' }}>
      <div id={id} className="parallax-image lazy-background">
        <h3 style={{ color: data?.color || '#fff' }}>{data?.title}</h3>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `[id="${id}"].visible{background-image:url("${mobileImage}")}@media screen and (min-width:640px){[id="${id}"].visible{background-image:url("${image}")}}`,
        }}
      />
    </div>
  )
}

const ImageRatioElement = ({ galleryId = '' }) => {
  const data =
    useContent({
      source: 'gallery-by-id',
      query: {
        _id: galleryId,
        presets: 'image:860x0',
      },
    }) || []

  const getSizesByRatio = (w, h) => {
    const sizes = {
      width: '860px',
      height: 'auto',
    }

    // 16:9
    if (Math.round((w / h) * 100) / 100 === Math.round((16 / 9) * 100) / 100) {
      sizes.width = '860px'
      sizes.height = '484px'
    }
    // 4:3
    else if (
      Math.round((w / h) * 100) / 100 ===
      Math.round((4 / 3) * 100) / 100
    ) {
      sizes.width = '640px'
      sizes.height = '360px'
    }
    // 2:3
    else if (h > w) {
      sizes.width = '320px'
      sizes.height = '480px'
    }
    // 1:1
    else if (w / h === 1 / 1) {
      sizes.width = '580px'
      sizes.height = '580px'
    }

    return sizes
  }
  return (
    <div
      className="parallax-el__ratio-cont"
      style={{ maxWidth: '1070px', margin: '0 auto' }}>
      {(data?.content_elements || []).map((item) => {
        const sizesRatios = getSizesByRatio(item?.width, item?.height)
        return (
          <div>
            <img
              style={{
                height: sizesRatios.height,
                width: sizesRatios.width,
                maxWidth: sizesRatios.width,
              }}
              className="lazy"
              data-src={item?.resized_urls?.image}
              src={placeholderSrc(item?.width, item?.height)}
              alt={item?.caption}
            />
            <figcaption
              style={{
                maxWidth: sizesRatios.width,
                textAlign: item?.width < item?.height ? 'right' : 'left',
              }}>
              {item?.caption}
            </figcaption>
          </div>
        )
      })}
    </div>
  )
}

const GalleryWithScroll = ({ galleryId }) => {
  const data =
    useContent({
      source: 'gallery-by-id',
      query: {
        _id: galleryId,
        presets: 'image:0x650',
      },
    }) || []
  return galleryId ? (
    <>
      <div
        style={{ maxWidth: 'none', margin: '0 auto' }}
        className="scrolling-gallery"
        id={`scrolling-gallery${galleryId}`}>
        <div className="scrolling-gallery__wrapper" id={`wrapper${galleryId}`}>
          <h3 className="scrolling-gallery__title">
            <span>{data?.headlines?.basic || ''}</span>
          </h3>
          <section
            className="scrolling-gallery__container"
            id={`container${galleryId}`}>
            {(data?.content_elements || []).map(
              ({ resized_urls, caption, width, height }) => (
                <div className="scrolling-gallery__item">
                  <figure>
                    <img
                      className="lazy"
                      data-src={resized_urls?.image}
                      src={placeholderSrc(width, height)}
                      alt={caption}
                    />
                    <figcaption>
                      <span>{caption}</span>
                    </figcaption>
                  </figure>
                </div>
              )
            )}
          </section>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: '"use strict";window.addEventListener("DOMContentLoaded",function(){window.gsap.registerPlugin(window.ScrollTrigger);var e=document.getElementById("scrolling-gallery__container");window.gsap.to(e,{x:function(){return"-"+(e.clientWidth-window.innerWidth)},ease:"none",scrollTrigger:{trigger:"#scrolling-gallery__wrapper",pin:!0,scrub:!0,end:function(){return"+="+e.clientWidth},invalidateOnRefresh:!0}});var n=document.getElementById("scrolling-gallery__observer");new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(console.log("trigger refresh"),window.ScrollTrigger.refresh())})},{rootMargin:"500px 0px 500px 0px"}).observe(n)});'
            .replace(/scrolling-gallery__container/g, `container${galleryId}`)
            .replace(/scrolling-gallery__wrapper/g, `wrapper${galleryId}`)
            .replace(
              /scrolling-gallery__observer/g,
              `scrolling-gallery${galleryId}`
            ),
        }}
      />
    </>
  ) : null
}

export default function StoryContentsChildParallaxElements({ config, id }) {
  const { block, data } = config || {}

  const { globalContent, arcSite, contextPath, deployment } = useAppContext()

  const { displayDate, authorLink, author, locality } = new StoryData({
    data: globalContent,
    contextPath,
    deployment,
    arcSite,
  })

  const displayLoc = locality === '' ? 'Lima' : locality

  return (
    <>
      {block === 'image' ? <ParallaxImage data={data} id={id} /> : null}

      {block === 'author' ? (
        <div className="parallax-el__cont">
          <div className="parallax-el__author-desc">
            {data?.text_type === 'custom' ? (
              <div>{data?.text}</div>
            ) : (
              <time dateTime={displayDate}>
                {displayDate &&
                  `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                    displayDate,
                    false,
                    true
                  )}`}
              </time>
            )}
          </div>
          <a
            className="parallax-el__author"
            href={data?.author_type === 'custom' ? data?.url : authorLink}>
            {data?.author_type === 'custom' ? data?.name : author}
          </a>
        </div>
      ) : null}

      {block === 'credits' ? (
        <div style={{ padding: '40px 0' }}>
          <div className="parallax-el__credits">
            <h5 className="parallax-el__credits-title">Créditos</h5>
            <div
              className="parallax-el__credits-text"
              dangerouslySetInnerHTML={{
                __html: data?.html,
              }}
            />
          </div>
        </div>
      ) : null}

      {block === 'image_ratio' ? (
        <ImageRatioElement galleryId={data?.gallery_id} />
      ) : null}

      {block === 'scroll_gallery' ? (
        <GalleryWithScroll galleryId={data?.gallery_id} id={id} />
      ) : null}
    </>
  )
}
