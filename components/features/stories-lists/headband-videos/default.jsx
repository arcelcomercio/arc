import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getAssetsPath } from '../../../utilities/assets'
import customFieldsInput from './_dependencies/custom-fields'
import ProcessItem from './_children/process-item'
import FixedVideo from './_children/fixed-video'

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

const HeadbandVideo = props => {
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                fill="#fff"
                viewBox="0 0 8 14">
                <path
                  d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                  transform="translate(-0.293 -0.293)"></path>
              </svg>
            </div>
          </div>
          <div className={classes.boxItems}>
            {stories.map((url, index) => {
              const randomKey = Math.floor(Math.random() * index)
              return (
                <ProcessItem
                  storyUrl={url}
                  storyLive={storiesLive[index]}
                  key={randomKey}
                />
              )
            })}
          </div>
        </div>
        <div className={classes.next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            fill="#fff"
            viewBox="0 0 8 14">
            <path
              d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
              transform="translate(-0.293 -0.293)"></path>
          </svg>
        </div>
      </div>
      <FixedVideo></FixedVideo>
    </>
  )
}

HeadbandVideo.propTypes = {
  customFields: customFieldsInput,
}

HeadbandVideo.label = 'Cintillo de Videos'
HeadbandVideo.static = true

export default HeadbandVideo
