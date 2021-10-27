import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import FixedVideo from './_children/fixed-video'
import ProcessItem from './_children/process-item'
import customFieldsInput from './_dependencies/custom-fields'

const classes = {
  main: 'headband',
  container: 'headband__container flex p-10 flex-col',
  boxLogo: 'headband__box-logo p-5 flex flex-row',
  logo: 'headband__logo',
  title: 'headband__title bold uppercase ml-5 mr-5',
  boxItems: 'headband__box-items flex',
  swipe: 'headband__swipe',
  next: 'headband__next',
}

const HeadbandVideo = (props) => {
  const { contextPath, arcSite } = useFusionContext()

  const {
    customFields: {
      story1 = '',
      story2 = '',
      story3 = '',
      story4 = '',
      story5 = '',
      live1 = false,
      live2 = false,
      live3 = false,
      live4 = false,
      live5 = false,
    } = {},
  } = props

  const stories = [story1, story2, story3, story4, story5]
  const storiesLive = [live1, live2, live3, live4, live5]

  const logoImg = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/Logo_P21TV.png?d=1`

  const sideScroll = () => {
    if (window) {
      const container = document.getElementsByClassName(
        'headband__box-items'
      )[0]
      if (container.scrollLeft === 0 && container.scrollLeft < 800) {
        container.scrollLeft = 800
      } else {
        container.scrollLeft = 0
      }
    }
  }

  const [showFixed, setShowFixed] = React.useState(false)
  const [dataVideo, setDataVideo] = React.useState({})

  const sendEventAnalitycs = (number) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'peru21tv_player_cintillo',
      position: number,
    })
  }

  const loadFixedVideo = (data, number = 0) => {
    const jwpObj = document.querySelector('.stories-video__item-dest .jwplayer')
    if (jwpObj !== null) {
      if (typeof jwplayer !== 'undefined') {
        window.jwplayer(jwpObj.id).stop()
      }
    } else {
      const listVideoPlayer = document.querySelector(
        '.stories-video__item-dest'
      )
      const strHtml = listVideoPlayer.innerHTML
      listVideoPlayer.innerHTML = strHtml.replace('autoplay;', '')
    }
    sendEventAnalitycs(number)
    setShowFixed(true)
    setDataVideo(data)
  }

  return (
    <>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.boxLogo}>
            <div className={classes.title}>VIDEOS</div>
            <img
              className={classes.logo}
              src={logoImg}
              alt="Logo de Perú21TV"
            />
            <div className={classes.swipe}>
              Desliza{' '}
              <svg width="8" fill="#fff" viewBox="0 0 8 14">
                <path
                  d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                  transform="translate(-0.293 -0.293)"
                />
              </svg>
            </div>
          </div>
          <div className={classes.boxItems}>
            {stories.map((url, index) => (
              <ProcessItem
                storyUrl={url}
                storyLive={storiesLive[index]}
                position={index + 1}
                key={url}
                loadFixedVideo={loadFixedVideo}
              />
            ))}
          </div>
        </div>
        <button
          className={classes.next}
          type="button"
          onClick={() => {
            sideScroll()
          }}>
          <svg width="8" fill="#fff" viewBox="0 0 8 14">
            <path
              d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
              transform="translate(-0.293 -0.293)"
            />
          </svg>
        </button>
      </div>
      <FixedVideo
        active={showFixed}
        setActive={setShowFixed}
        dataVideo={dataVideo}
      />
    </>
  )
}

HeadbandVideo.propTypes = {
  customFields: customFieldsInput,
}

HeadbandVideo.label = 'Cintillo de Videos'
// HeadbandVideo.static = true

export default HeadbandVideo
