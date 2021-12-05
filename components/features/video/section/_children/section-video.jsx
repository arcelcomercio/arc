/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'

import LiteYoutube from '../../../../global-components/lite-youtube'
import PowaPlayer from '../../../../global-components/powa-player'
import VideoJwplayer from '../../../../global-components/video-jwplayer-list'
import { VIDEO } from '../../../../utilities/constants/multimedia-types'
import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import { getResultVideo } from '../../../../utilities/story/helpers'
import PlayList from './play-list'
import VideoBar from './video-navbar'

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
  hideSectionBar,
  hidePlaylist,
  hideShare,
  hideMeta,
  hideSticky,
  categoryTop,
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
        if (!hideSticky && window.innerWidth >= 1024) {
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

  const shareNew = (origin) => {
    popUpWindow(urlsShareList[origin], '', 600, 400)
  }

  const shareBtnHandler = () => {
    if (window.navigator && window.navigator.share)
      window.navigator
        .share({
          // title: 'WebShare API Demo',
          url: window.location.origin,
        })
        .then(() => {
          console.log('Shared btn')
        })
        .catch(console.error)
  }

  const getFecha = () => {
    if (!principalVideo.displayDate) {
      return ''
    }

    return arcSite === 'trome' ? formatDayMonthYear(principalVideo.displayDate, true, false, true, true, false)
      : formatDayMonthYear(principalVideo.displayDate, true, false)
  }

  const playListParams = {
    ...playListVideo,
    principalVideo,
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
              {arcSite === 'trome' && (
                <div
                  className={`section-video__box-section section-video__box-section-top ${categoryTop ? 'section-video__box-section-top-mobile' : ''
                    }`}>
                  <a
                    itemProp="url"
                    href={principalVideo.primarySectionLink}
                    className="section-video__section block text-white">
                    {principalVideo.primarySection}
                  </a>
                </div>
              )}
              <div className="section-video__frame">
                {principalVideo && principalVideo.promoItemJwplayer.key ? (
                  <>
                    <VideoJwplayer data={principalVideo.promoItemJwplayer} />
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
                {arcSite === 'trome' && !(
                  principalVideo.videoDuration === '00:00' ||
                  principalVideo.videoDuration === '00:00:00'
                ) && (
                    <div className="section-video__mobile-duration">
                      Duración: {principalVideo.videoDuration}
                    </div>
                  )}
                <div
                  className={`section-video__box-section section-video__box-section-bottom ${categoryTop
                    ? 'section-video__box-section-bottom-mobile'
                    : null
                    }`}>
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
                        <i className="section-video__icon section-video__icon--up icon-down" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setHidden(false)}
                        className="section-video__read">
                        Mostrar más{' '}
                        <i className="section-video__icon icon-down" />
                      </button>
                    )}
                  </div>
                )}
                {!hidden && (
                  <p itemProp="description" className="section-video__subtitle">
                    {principalVideo.contentElements &&
                      principalVideo.contentElements.length > 0
                      ? principalVideo.contentElements[0].type === 'list'
                        ? principalVideo.contentElements[0].items.map((el) => (
                          <div
                            dangerouslySetInnerHTML={{ __html: el.content }}
                            className="section-video__list-items"
                            key={el.content}
                          />
                        ))
                        : principalVideo.subTitle
                      : principalVideo.subTitle}
                  </p>
                )}
              </div>
              {principalVideo.captionVideo && !hidden && (
                <span className="section-video__caption text-sm text-gray-200">
                  {principalVideo.captionVideo}(asdf)
                </span>
              )}
              {arcSite === 'trome' && !hideShare ? (
                <>
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
                        onClick={() => shareNew('linkedin')}
                        type="button"
                        className="section-video__btn section-video__btn--linkedin">
                        <span className="icon-linkedin" />
                      </button>
                      <button
                        onClick={shareBtnHandler}
                        type="button"
                        className="section-video__btn">
                        <svg
                          viewBox="0 0 28 28"
                          width="16"
                          height="16"
                          fill="#ccc">
                          <path d="M28 10c0 0.266-0.109 0.516-0.297 0.703l-8 8c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-4h-3.5c-6.734 0-11.156 1.297-11.156 8.75 0 0.641 0.031 1.281 0.078 1.922 0.016 0.25 0.078 0.531 0.078 0.781 0 0.297-0.187 0.547-0.5 0.547-0.219 0-0.328-0.109-0.438-0.266-0.234-0.328-0.406-0.828-0.578-1.188-0.891-2-1.984-4.859-1.984-7.047 0-1.75 0.172-3.547 0.828-5.203 2.172-5.391 8.547-6.297 13.672-6.297h3.5v-4c0-0.547 0.453-1 1-1 0.266 0 0.516 0.109 0.703 0.297l8 8c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="section-video__detail">
                    <ul className="section-video__list-text">
                      {principalVideo.author !== '' && (
                        <li className="section-video__text">
                          {principalVideo.author}
                        </li>
                      )}
                      {principalVideo.displayDate !== '' && (
                        <li className="section-video__text">{getFecha()}</li>
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
                  </div>
                </>
              ) : null}
            </div>
          </div>
          {arcSite !== 'trome' && (
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
                    <li className="section-video__text">{getFecha()}</li>
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
          )}
          <div
            className={
              playListParams.arcSite === 'gestion'
                ? 'section-video__fixed--none'
                : 'section-video__fixed'
            }
          />
        </div>
        {!hidePlaylist && <PlayList {...playListParams} />}
      </div>
      {!hideSectionBar && <VideoBar sections={arrSections} />}
    </div>
  )
}
