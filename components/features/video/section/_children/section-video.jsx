import React, { useEffect, useState } from 'react'

import { VIDEO } from '../../../../utilities/constants/multimedia-types'
import PlayList from './play-list'
import VideoBar from './video-navbar'
import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import { getResultVideo } from '../../../../utilities/story/helpers'
import PowaPlayer from '../../../../global-components/powa-player'
import LiteYoutube from '../../../../global-components/lite-youtube'
import VideoJwplayer from '../../../../global-components/video-jwplayer'

/**
 *
 * Si piden que los videos vengan del CDN de Arc en lugar del
 * CDN de El Comercio, solo se debe comentar:
 *
 * import { getResultVideo } from '../../../../utilities/story/helpers'
 *
 * y descomentar la siguiente funcion
 */
/* const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
} */

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

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    // No ocultar si es desktop
    if (arcSite !== 'peru21') {
      setHidden(false)
    } else {
      setHidden(!isDesktop)
    }

    if (window.innerWidth < 640) {
      window.addEventListener('powaReady', ({ detail: { element } }) => {
        element.setAttribute('data-sticky', 'true')
      })
    }
    if (!isAdmin) {
      window.requestIdle(() => {
        const sectionVideo = document.body.querySelector('.section-video')
        const sectionVideoWrapper = sectionVideo.querySelector(
          '.section-video__wrapper'
        )
        const videoFrame = sectionVideoWrapper.querySelector(
          '.section-video__frame'
        )
        const playList = sectionVideo.querySelector('.play-list')
        const videoNavBar = sectionVideo.querySelector('.video-navbar')
        const videoList = document.body.querySelector('.video-list')
        const adsMiddle = document.getElementById('ads_d_middle1')
        const mTop = 450

        const playOff = playList.offsetTop
        if (window.innerWidth >= 1024) {
          window.addEventListener('scroll', () => {
            const scrollHeight = window.scrollY
            if (scrollHeight >= playOff && arcSite !== 'gestion') {
              sectionVideoWrapper.classList.add('fixed')
              // changeFixedSection(true)
              videoNavBar.classList.add('fixed')
              if (typeof adsMiddle !== 'undefined' && adsMiddle != null) {
                adsMiddle.style.marginTop = `${mTop}px`
              } else {
                videoList.style.marginTop = `${mTop}px`
              }
            }
            if (scrollHeight < playOff) {
              sectionVideoWrapper.classList.remove('fixed')
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
      })
    }
  }, [arcSite, isAdmin])

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

  const fecha = formatDayMonthYear(principalVideo.displayDate, true, false)

  const playListParams = {
    ...playListVideo,
    arcSite,
    contextPath,
    deployment,
  }

  let uuid
  let stream
  if (principalVideo.video && principalVideo.promoItemsType === VIDEO) {
    const arrayMatch = principalVideo.video.match(/"powa-([\w\d-]+)"/)
    uuid = arrayMatch.length > 0 ? arrayMatch[1] : ''
    stream = getResultVideo(
      principalVideo && principalVideo.videoStreams,
      arcSite
    )
  }

  return (
    <div className="section-video">
      <div className="section-video__box">
        <div className="section-video__wrapper">
          <div className="section-video__top">
            <div className="section-video__left">
              <div className="section-video__frame">
                {principalVideo && principalVideo.promoItemJwplayer.key ? (
                  <>
                    <VideoJwplayer
                      data={principalVideo.promoItemJwplayer}></VideoJwplayer>
                  </>
                ) : (
                  <>
                    {principalVideo.video &&
                    principalVideo.promoItemsType === VIDEO ? (
                      <PowaPlayer
                        uuid={uuid}
                        time={principalVideo.videoDuration}
                        stream={stream}
                        image={principalVideo.image}
                      />
                    ) : (
                      <LiteYoutube videoId={principalVideo.video} />
                    )}
                  </>
                )}
              </div>
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
