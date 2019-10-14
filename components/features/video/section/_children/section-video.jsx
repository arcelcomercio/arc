import React, { useEffect, useState } from 'react'
import ConfigParams from '../../../../utilities/config-params'
import PlayList from './play-list'
import VideoBar from './video-navbar'
import {
  socialMediaUrlShareListBlog,
  addSlashToEnd,
  popUpWindow,
} from '../../../../utilities/helpers'

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
  const [hasFixedSection, changeFixedSection] = useState(false)
  useEffect(() => {
    if (window.powaBoot) {
      window.powaBoot()
    }

    if (window.PoWaSettings) {
      const { urlPreroll } = siteProperties
      window.PoWaSettings.advertising = {
        adBar: false,
        adTag: () => {
          return principalVideo.hasAdsVideo ? urlPreroll : ''
        },
      }
    }

    if (!isAdmin) {
      const playList = document.querySelector('.play-list')
      const sectionVideo = document.querySelector('.section-video__wrapper')
      const videoNavBar = document.querySelector('.video-navbar')
      const videoList = document.querySelector('.video-list')
      const videoFrame = document.querySelector('.section-video__frame')
      const leftFix = videoFrame.getBoundingClientRect().left
      const hasAdsMiddle = document.getElementById('ads_d_middle1') || {}
      const renderClassFix =
        hasAdsMiddle.childElementCount > 0 ? 'fixedAds' : 'fixedNoAds'
      const playOff = playList.offsetTop
      if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', () => {
          const scrollHeight = window.scrollY
          if (scrollHeight >= playOff) {
            sectionVideo.classList.add('fixed')
            changeFixedSection(true)
            videoNavBar.classList.add('fixed')
            videoList.classList.add(`${renderClassFix}`)
            videoFrame.style.left = `${leftFix + 50}px`

            // videoList.style.marginTop = '570px'
          }
          if (scrollHeight < playOff) {
            sectionVideo.classList.remove('fixed')
            changeFixedSection(false)
            videoNavBar.classList.remove('fixed')
            videoList.classList.remove(`${renderClassFix}`)
            videoFrame.removeAttribute('style')
            // videoList.style.marginTop = '50px'
          }
        })
      }
    }
  }, [isAdmin, principalVideo.hasAdsVideo, siteProperties])

  const formateDay = () => {
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
  }
  const { siteUrl = '' } = siteProperties

  const urlsShareList = socialMediaUrlShareListBlog(
    addSlashToEnd(siteUrl),
    principalVideo.websiteLink,
    principalVideo.title
  )

  const shareNew = origin => {
    popUpWindow(urlsShareList[origin], '', 600, 400)
  }

  const { fecha } = formateDay()

  const playListParams = {
    ...playListVideo,
    arcSite,
    contextPath,
    deployment,
  }

  return (
    <div className="section-video">
      <div className="section-video__box">
        <div className="section-video__wrapper">
          <div className="section-video__top">
            <div className="section-video__left">
              {principalVideo.video &&
              principalVideo.promoItemsType === ConfigParams.VIDEO ? (
                <div className="section-video__frame">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: principalVideo.video }}
                  />
                  {principalVideo.captionVideo && hasFixedSection && (
                    <span className="text-sm text-gray-200 ml-5 mt-5 mr-5 block">
                      {principalVideo.captionVideo}
                    </span>
                  )}
                </div>
              ) : (
                <div className="section-video__frame">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${
                      principalVideo.video
                    }`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen
                    title="Video"
                  />
                  {principalVideo.captionVideo && hasFixedSection && (
                    <span className="text-sm text-gray-200 ml-5 mt-5 mr-5 block">
                      {principalVideo.captionVideo}
                    </span>
                  )}
                </div>
              )}
              {principalVideo.captionVideo && (
                <span className="text-sm text-gray-200 ml-5 mt-5 block">
                  {principalVideo.captionVideo}
                </span>
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
              <div>
                {/* <div className="section-video__breadcrumbs">
                  <span className="section-video__sub">
                    <a href="/videos">Video</a>
                  </span>
                  <span className="section-video__sub">
                    <a href={principalVideo.primarySectionLink}>
                      {principalVideo.primarySection}
                    </a>
                  </span>
                </div> */}
                <div className="section-video__box-section">
                  <a
                    href={principalVideo.primarySectionLink}
                    className="section-video__section block text-white">
                    {principalVideo.primarySection}
                  </a>
                </div>
                <h1>
                  <a
                    href={principalVideo.websiteLink}
                    className="section-video__title block text-white">
                    {principalVideo.title}
                  </a>
                </h1>
                <p className="section-video__subtitle">
                  {principalVideo.subTitle}
                </p>
              </div>
            </div>
          </div>
          <div className="section-video__fixed">
            <div className="section-video__min">
              <div className="section-video__desc">
                {/* <span>0:30 </span> */}
                <a
                  className="text-white"
                  href={principalVideo.primarySectionLink}>
                  {principalVideo.primarySection}
                </a>
              </div>
              <h2>
                <a
                  href={principalVideo.websiteLink}
                  className="section-video__des-title text-white block">
                  {principalVideo.title}
                </a>
              </h2>
              <div className="section-video__share">
                <button
                  onClick={() => shareNew('facebook')}
                  type="button"
                  className="section-video__btn">
                  <span className="icon-facebook" />
                </button>
                <button
                  onClick={() => shareNew('twitter')}
                  type="button"
                  className="section-video__btn">
                  <span className="icon-twitter" />
                </button>
                <button
                  onClick={() => shareNew('linkedin')}
                  type="button"
                  className="section-video__btn">
                  <span className="icon-linkedin" />
                </button>
                {/* <button type="button" className="section-video__btn">
                  <span className="icon-share" />
                </button> */}
              </div>
            </div>
          </div>
          <div className="section-video__detail">
            <span className="section-video__text">{fecha}</span>
          </div>
          <div className="section-video__bottom">
            <div className="section-video__share">
              <button
                onClick={() => shareNew('facebook')}
                type="button"
                className="section-video__btn">
                <span className="icon-facebook" />
              </button>
              <button
                onClick={() => shareNew('twitter')}
                type="button"
                className="section-video__btn">
                <span className="icon-twitter" />
              </button>
              <button
                onClick={() => shareNew('linkedin')}
                type="button"
                className="section-video__btn">
                <span className="icon-linkedin" />
              </button>
              {/* <button type="button" className="section-video__btn">
                <span className="icon-share" />
              </button> */}
            </div>
          </div>
        </div>
        <PlayList {...playListParams} />
      </div>
      <VideoBar sections={arrSections} />
    </div>
  )
}
