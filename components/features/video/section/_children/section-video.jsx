import React, { useEffect } from 'react'
import PlayList from './play-list'
import VideoBar from './video-navbar'

export default ({
  principalVideo,
  playListVideo,
  arcSite,
  contextPath,
  deployment,
}) => {
  useEffect(() => {
    const playList = document.querySelector('.play-list')
    const sectionVideo = document.querySelector('.section-video__wrapper')
    const videoNavBar = document.querySelector('.video-navbar')
    const videoList = document.querySelector('.video-list')
    const playOff = playList.offsetTop
    window.addEventListener('scroll', () => {
      const scrollHeight = window.scrollY
      if (scrollHeight >= playOff) {
        sectionVideo.classList.add('fixed')
        videoNavBar.classList.add('fixed')
        videoList.style.marginTop = '570px'
      }
      if (scrollHeight < playOff) {
        sectionVideo.classList.remove('fixed')
        videoNavBar.classList.remove('fixed')
        videoList.style.marginTop = '50px'
      }
    })
  })

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
              <iframe
                title="video"
                className="section-video__frame"
                src="https://www.youtube.com/embed/60ItHLz5WEA"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
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
                  <p className="section-video__section">
                    {principalVideo.primarySection}
                  </p>
                </div>
                <h1 className="section-video__title">{principalVideo.title}</h1>
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
                <span>{principalVideo.primarySection}</span>
              </div>
              <h2 className="section-video__des-title">
                {principalVideo.title}
              </h2>
              <div className="section-video__share">
                <button type="button" className="section-video__btn">
                  <span className="icon-facebook" />
                </button>
                <button type="button" className="section-video__btn">
                  <span className="icon-twitter" />
                </button>
                <button type="button" className="section-video__btn">
                  <span className="icon-linkedin" />
                </button>
                <button type="button" className="section-video__btn">
                  <span className="icon-share" />
                </button>
              </div>
            </div>
          </div>
          <div className="section-video__detail">
            <span className="section-video__text">{fecha}</span>
          </div>
          <div className="section-video__bottom">
            <div className="section-video__share">
              <button type="button" className="section-video__btn">
                <span className="icon-facebook" />
              </button>
              <button type="button" className="section-video__btn">
                <span className="icon-twitter" />
              </button>
              <button type="button" className="section-video__btn">
                <span className="icon-linkedin" />
              </button>
              <button type="button" className="section-video__btn">
                <span className="icon-share" />
              </button>
            </div>
          </div>
        </div>
        <PlayList {...playListParams} />
      </div>
      <VideoBar />
    </div>
  )
}
