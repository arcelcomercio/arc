import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { LANDSCAPE_XXS } from '../../../../utilities/constants/image-sizes'
import schemaFilter from '../_dependencies/schema-filters'

const classes = {
  containerItem: 'headband__container-item',
  boxVideo: 'headband__box-video',
  titleStory: 'headband__title-story',
  image: 'headband__image',
  boxTimerLive: 'headband__box-timer-live',
  timer: 'headband__timer',
  live: 'headband__live',

}

function HeadBandProcessItem({ storyUrl = '', storyLive = false }) {
  const CONTENT_SOURCE = 'story-by-url'
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const processData = data => {
    return data
  }

  const story =
    useContent(
      storyUrl
        ? {
            source: CONTENT_SOURCE,
            query: {
              website: arcSite,
              website_url: storyUrl,
              presets: `${LANDSCAPE_XXS}:170x90`,
            },
            filter: schemaFilter,
            transform: data => processData(data),
          }
        : {}
    ) || {}

  return (
    <div className={classes.containerItem}>
      <div className={classes.boxVideo}>
        <img className={classes.image} src="" alt="" />
        <div className={classes.boxTimerLive}>
          <span className={classes.timer}>12:00</span>
          <div className={classes.live}>EN VIVO</div>
        </div>
        <i className="icon-play"></i>
      </div>
      <div className={classes.titleStory}>
        Ministro Incháustegui: Esta semana se aprobaría cambio regulatorio
      </div>
    </div>
  )
}

HeadBandProcessItem.propTypes = {
  storyUrl: PropTypes.string.isRequired,
  storyLive: PropTypes.bool.isRequired,
}

export default HeadBandProcessItem
