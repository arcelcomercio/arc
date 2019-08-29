import React, { useEffect } from 'react'
import PlayList from './play-list'
import VideoBar from './video-navbar'

export default () => {
  useEffect(() => {
    const playList = document.querySelector('.play-list')
    const sectionVideo = document.querySelector('.section-video__wrapper')
    const videoNavBar = document.querySelector('.video-navbar')
    const offTop = playList.offsetTop
    window.addEventListener('scroll', () => {
      const scrollHeight = window.scrollY
      if (scrollHeight >= offTop) {
        sectionVideo.classList.add('fixed')
        videoNavBar.classList.add('fixed')
      }
      if (scrollHeight < offTop) {
        sectionVideo.classList.remove('fixed')
        videoNavBar.classList.remove('fixed')
      }
    })
  })
  return (
    <div className="section-video">
      <div className="section-video__box">
        <div className="section-video__wrapper">
          <div className="section-video__top">
            <div className="section-video__left">
              <iframe
                title="video"
                width="560"
                height="315"
                className="section-video__frame"
                src="https://www.youtube.com/embed/-sRBWb1_6ys"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
            <div className="section-video__right">
              <div>
                <div className="section-video__breadcrumbs">
                  <span className="section-video__sub">
                    <a href="/">Video</a>
                  </span>
                  <span className="section-video__sub">
                    <a href="/">Mundo</a>
                  </span>
                </div>
                <h1 className="section-video__title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h1>
                <p className="section-video__subtitle">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  voluptas nesciunt. Maxime rerum doloribus enim earum
                  dignissimos ad dolore assumenda.
                </p>
              </div>
              <p className="section-video__author">Foto y video (AFP)</p>
            </div>
          </div>
          <div className="section-video__fixed">
            <div className="section-video__min">
              <div className="section-video__desc">
                <span>0:30</span>
                <span>Deportes</span>
              </div>
              <h2 className="section-video__des-title">
                Lorem ipsum dolor, sit amet consectetur adipisicing.
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
            <div className="section-video__detail">
              <span className="section-video__text">15 de Agosto de 2019</span>
              <span className="section-video__text">13:25</span>
              <span className="section-video__text">Duracion: 00:40</span>
            </div>
          </div>
        </div>
        <PlayList />
      </div>
      <VideoBar />
    </div>
  )
}
