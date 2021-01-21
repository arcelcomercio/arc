import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getAssetsPath } from '../../../utilities/assets'
import customFieldsInput from './_dependencies/custom-fields'
import ProcessItem from './_children/process-item'
import FixedVideo from './_children/fixed-video'

const classes = {
  container: 'headband__container',
  boxLogo: 'headband__box-logo',
  logo: 'headband__logo',
  title: 'headband__title',
  boxItems: 'headband__box-items',
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
    <div className={classes.container}>
      <div className={classes.boxLogo}>
        <div className={classes.title} >VIDEOS</div>
        <img className={classes.logo} src={logoImg}  alt="Logo de Perú21TV"/>
        <div className={classes.swipe}>
          Desliza
        </div>
      </div>
      <div className={classes.boxItems}>
        {stories.map((url, index) => {
          const randomKey = Math.floor(Math.random() * index)
          return (
            <ProcessItem
              storyUrl={url}
              storyLive={storiesLive[0]}
              key={randomKey}
            />
          )
        })}
      </div>
      <div className={classes.next}>
        &gt;
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
