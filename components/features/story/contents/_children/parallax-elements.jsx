/* eslint-disable camelcase */
import React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import StoryData from '../../../../utilities/story-data'
import { formatDayMonthYearBasic } from '../../../../utilities/date-time/dates'

const placeholderSrc = (width, height) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`

const ImageRatioElement = ({ galleryId = '' }) => {
  const data =
    useContent({
      source: 'gallery-by-id',
      query: {
        _id: galleryId,
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
    <>
      <div
        className="parallax-el__ratio-cont"
        style={{ maxWidth: '1070px', margin: '0 auto' }}>
        {(data?.content_elements || []).map(item => {
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
                data-src={item?.url}
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
      {/* 
      <div style={{ maxWidth: 'none', margin: '0 auto' }} className="par-gal">
        <div
          style={{ overflow: 'hidden', position: 'relative' }}
          className="wrapper d-flex flex-nowrap">
          <h3
            style={{
              position: 'absolute',
              top: 0,
              textAlign: 'center',
              width: '100%',
              margin: '50px 0',
            }}>
            H3 Este es el titulo de la galeria
          </h3>
          <section className="par-gal-item flex-shrink-0 vh-100 d-flex justify-content-center align-items-center">
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/YIDYX63WYNCUTCLN2GR2GXYA6E.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/YIDYX63WYNCUTCLN2GR2GXYA6E.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/YIDYX63WYNCUTCLN2GR2GXYA6E.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/L4HYTHGMENGKLOADGX74QOMIX4.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/YIDYX63WYNCUTCLN2GR2GXYA6E.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
            <div className="section-container">
              <figure>
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/YIDYX63WYNCUTCLN2GR2GXYA6E.jpg"
                  alt=""
                />
                <figcaption>galley of type and scrambled</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";var setScrollTrigger=function(){window.gsap.registerPlugin(window.ScrollTrigger);var e=gsap.utils.toArray(".par-gal-item"),r=0,n=function(){r=0,e.forEach(function(e){r+=e.offsetWidth})};n(),window.ScrollTrigger.addEventListener("refreshInit",n),window.gsap.to(e,{x:function(){return"-"+(r-window.innerWidth)},ease:"none",scrollTrigger:{trigger:".wrapper",pin:!0,scrub:!0,end:function(){return"+="+r},invalidateOnRefresh:!0}})},target=document.querySelector(".wrapper");window.addEventListener("DOMContentLoaded",function(){var e=new IntersectionObserver(function(r){r.forEach(function(r){r.isIntersecting&&(setScrollTrigger(),e.unobserve(target))})});e.observe(target)});',
        }}></script> */}
    </>
  )
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
      {block === 'image' ? (
        <div style={{ padding: '64px 0', margin: 0, maxWidth: 'none' }}>
          <div id={id} className="parallax-image lazy-background">
            <h3>{data?.title}</h3>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `[id="${id}"].visible{background-image:url("${data?.url_mobile}")}@media screen and (min-width:640px){[id="${id}"].visible{background-image:url("${data?.url}")}}`,
            }}></style>
        </div>
      ) : null}

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
              }}></div>
          </div>
        </div>
      ) : null}

      {block === 'image_ratio' ? (
        <ImageRatioElement galleryId={data?.gallery_id} />
      ) : null}
    </>
  )
}
