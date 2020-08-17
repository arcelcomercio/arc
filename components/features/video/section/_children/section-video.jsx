import React, { useEffect, useState } from 'react'
import { useContent } from 'fusion:content'

import { VIDEO } from '../../../../utilities/constants/multimedia-types'
import PlayList from './play-list'
import VideoBar from './video-navbar'
import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import { getResultVideo } from '../../../../utilities/story/helpers'

const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

export default ({
  principalVideo,
  playListVideo,
  arcSite,
  contextPath,
  deployment,
  isAdmin,
  arrSections,
  siteProperties,
}) => {
  // const [hasFixedSection, changeFixedSection] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { urlPreroll } = siteProperties
  const { resized_urls: { videoPoster } = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: principalVideo.image,
        presets: 'videoPoster:560x0',
      },
    }) || {}

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    // No ocultar si es desktop
    if (arcSite !== 'peru21') {
      setHidden(false)
    } else {
      setHidden(!isDesktop)
    }

    if (window.powaBoot) {
      window.powaBoot()
    }

    if (window.PoWaSettings) {
      window.preroll = urlPreroll
      window.PoWaSettings.advertising = {
        adBar: false,
        adTag: () => (principalVideo.hasAdsVideo ? urlPreroll : ''),
      }
      window.PoWaSettings.promo = {
        style: {
          '.powa-shot-image': {
            backgroundImage: `url('${videoPoster || principalVideo.image}')`,
            backgroundSize: 'contain',
          },
          '.powa-shot-play-btn': {
            color: 'rgb(240, 248, 255)',
            fill: 'rgb(240, 248, 255)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.25s',
            borderRadius: '2em',
          },
          '.powa-shot-play-icon': {
            opacity: '0.85',
          },
          '.powa-shot-loading-icon': {
            opacity: '0.85',
          },
        },
      }
    }

    if (window.innerWidth < 640) {
      window.addEventListener('powaReady', ({ detail: { element } }) => {
        element.setAttribute('data-sticky', 'true')
      })
    }
    if (!isAdmin) {
      const playList = document.querySelector('.play-list')
      const sectionVideo = document.querySelector('.section-video__wrapper')
      const videoNavBar = document.querySelector('.video-navbar')
      const videoList = document.querySelector('.video-list')
      const videoFrame = document.querySelector('.section-video__frame')
      const adsMiddle = document.getElementById('ads_d_middle1')
      const mTop = 450

      const playOff = playList.offsetTop
      if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', () => {
          const scrollHeight = window.scrollY
          if (scrollHeight >= playOff && arcSite !== 'gestion') {
            sectionVideo.classList.add('fixed')
            // changeFixedSection(true)
            videoNavBar.classList.add('fixed')
            if (typeof adsMiddle !== 'undefined' && adsMiddle != null) {
              adsMiddle.style.marginTop = `${mTop}px`
            } else {
              videoList.style.marginTop = `${mTop}px`
            }
          }
          if (scrollHeight < playOff) {
            sectionVideo.classList.remove('fixed')
            // changeFixedSection(false)
            videoNavBar.classList.remove('fixed')
            videoFrame.removeAttribute('style')
            if (typeof adsMiddle !== 'undefined' && adsMiddle != null) {
              adsMiddle.style.marginTop = `0px`
            } else {
              videoList.style.marginTop = `50px`
            }
          }
        })
      }
    }
  }, [arcSite, isAdmin, principalVideo.hasAdsVideo, urlPreroll, siteProperties])

  /* const formateDay = () => {
    const _date = new Date(principalVideo.displayDate)
    const day = _date.getDate()
    const month = _date.getMonth()
    const year = _date.getFullYear()
    const hora = _date.getHours()
    const minutes = _date.getMinutes()
    return {
      fecha: `${day}.${month + 1}.${year}`,
      hora: `${hora}:${minutes}`,
    }
  } */

  const {
    social: {
      twitter: { user: siteNameRedSocial },
    },
    siteUrl = '',
  } = siteProperties

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    principalVideo.websiteLink,
    principalVideo.title,
    siteNameRedSocial
  )

  const shareNew = origin => {
    popUpWindow(urlsShareList[origin], '', 600, 400)
  }

  // const { fecha } = formateDay()

  const fecha = formatDayMonthYear(principalVideo.displayDate, true, false)

  const playListParams = {
    ...playListVideo,
    arcSite,
    contextPath,
    deployment,
  }

  let htmlVideo

  if (principalVideo.video && principalVideo.promoItemsType === VIDEO) {
    const arrayMatch = principalVideo.video.match(/"powa-([\w\d-]+)"/)
    const idVideoPwa = arrayMatch.length > 0 ? arrayMatch[1] : ''

    htmlVideo = `<div class="powa" id="powa-${idVideoPwa}" data-sticky=true data-org="elcomercio" data-env="prod" data-stream="${getResultVideo(
      principalVideo && principalVideo.videoStreams,
      arcSite
    )}" data-uuid="${idVideoPwa}" data-aspect-ratio="0.562" data-api="prod" data-preload=none ></div>`
  }

  return (
    <div className="section-video">
      <div className="section-video__box">
        <div className="section-video__wrapper">
          <div className="section-video__top">
            <div className="section-video__left">
              {principalVideo.video &&
              principalVideo.promoItemsType === VIDEO ? (
                <div className="section-video__frame">
                  <div
                    data-preroll={principalVideo.hasAdsVideo ? urlPreroll : ''}
                    data-time={
                      principalVideo.videoDuration
                        ? principalVideo.videoDuration
                        : ''
                    }
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: htmlVideo,
                    }}
                  />
                </div>
              ) : (
                <div className="section-video__frame">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${principalVideo.video}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen
                    title="Video"
                  />
                </div>
              )}

              {/* <iframe
                title="video"
                className="section-video__frame"
                src="https://www.youtube.com/embed/60ItHLz5WEA"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              /> */}
            </div>
            <div className="section-video__right">
              <div className="section-video__information">
                <div className="section-video__box-section">
                  <a
                    itemProp="url"
                    href={principalVideo.primarySectionLink}
                    className="section-video__section block text-white">
                    {principalVideo.primarySection}
                  </a>
                </div>
                <h1 itemProp="name">
                  <a
                    itemProp="url"
                    href={principalVideo.websiteLink}
                    className="section-video__title block text-white">
                    {principalVideo.title}
                  </a>
                </h1>
                {arcSite === 'peru21' && (
                  <div className="section-video__content-share pt-10 pb-20 flex flex-row justify-between border-b-1 border-solid">
                    <div className="section-video__share">
                      <button
                        onClick={() => shareNew('facebook')}
                        type="button"
                        className="section-video__btn section-video__btn--facebook">
                        <span className="icon-facebook" />
                      </button>
                      <button
                        onClick={() => shareNew('twitter')}
                        type="button"
                        className="section-video__btn section-video__btn--twitter">
                        <span className="icon-twitter" />
                      </button>
                      <button
                        onClick={() => shareNew('whatsapp')}
                        type="button"
                        className="section-video__btn section-video__btn--whatsapp">
                        <span className="icon-whatsapp" />
                      </button>
                    </div>
                    {!hidden ? (
                      <button
                        type="button"
                        onClick={() => setHidden(true)}
                        className="section-video__read">
                        Mostrar menos{' '}
                        <i className="section-video__icon section-video__icon--up icon-down"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setHidden(false)}
                        className="section-video__read">
                        Mostrar más{' '}
                        <i className="section-video__icon icon-down"></i>
                      </button>
                    )}
                  </div>
                )}
                {!hidden && (
                  <p itemProp="description" className="section-video__subtitle">
                    {principalVideo.subTitle}
                  </p>
                )}
              </div>
              {principalVideo.captionVideo && !hidden && (
                <span className="section-video__caption text-sm text-gray-200">
                  {principalVideo.captionVideo}
                </span>
              )}
            </div>
          </div>
          <div className="section-video__detail">
            <div className="section-video__share">
              <button
                onClick={() => shareNew('facebook')}
                type="button"
                className="section-video__btn section-video__btn--facebook">
                <span className="icon-facebook" />
              </button>
              <button
                onClick={() => shareNew('twitter')}
                type="button"
                className="section-video__btn section-video__btn--twitter">
                <span className="icon-twitter" />
              </button>
            </div>
            {!hidden && (
              <ul className="section-video__list-text">
                {principalVideo.author !== '' && (
                  <li className="section-video__text">
                    {principalVideo.author}
                  </li>
                )}
                {principalVideo.displayDate !== '' && (
                  <li className="section-video__text">{fecha}</li>
                )}
                {!(
                  principalVideo.videoDuration === '00:00' ||
                  principalVideo.videoDuration === '00:00:00'
                ) && (
                  <li className="section-video__text">
                    Duración: {principalVideo.videoDuration}
                  </li>
                )}
              </ul>
            )}
          </div>
          <div
            className={
              playListParams.arcSite === 'gestion'
                ? 'section-video__fixed--none'
                : 'section-video__fixed'
            }
          />
        </div>
        <PlayList {...playListParams} />
      </div>
      <VideoBar sections={arrSections} />
    </div>
  )
}
