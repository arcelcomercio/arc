/* eslint-disable no-undef */
import React from 'react'
import { useFusionContext } from 'fusion:context'

import { getAssetsPath } from '../../../utilities/assets'
import customFields from './_dependencies/custom-fields'
import StoryItemController from './_children/story-item-controller'
import { tvListScripts } from './_dependencies/scripts'

const classes = {
  listComponent: 'stories-video__wrapper w-full flex flex-col justify-between',
  listHeader:
    'stories-video__header flex items-center justify-between pt-10 pb-10 pl-20 pr-20',
  listTitle: 'stories-video__title text-white uppercase',
  listWrapper: 'stories-video__list-wrapper h-full flex flex-col justify-end',
  viewProgramsWrapper:
    'stories-video__programs-wrapper flex justify-center pt-10 pb-10 pl-20 pr-20',
  viewPrograms:
    'stories-video__programs text-white flex items-center flex-row-reverse',
}

const PERU21TV_URL = 'https://peru21.pe/peru21tv/'

const StoriesListVideo = props => {
  const { contextPath, arcSite } = useFusionContext()

  const {
    customFields: {
      story01 = '',
      story02 = '',
      story03 = '',
      story04 = '',
      story05 = '',
      liveStory01 = false,
      liveStory02 = false,
      liveStory03 = false,
      liveStory04 = false,
      liveStory05 = false,
    } = {},
  } = props

  // Si el logo cambia revisar coherencia en texto alt de <img>
  const logoImg = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/Logo_P21TV.png?d=1`

  const stories = [story01, story02, story03, story04, story05]
  const liveStories = [
    liveStory01,
    liveStory02,
    liveStory03,
    liveStory04,
    liveStory05,
  ]

  return (
    <>
      <div className={classes.listComponent}>
        <div className={classes.listHeader}>
          <h3 itemProp="name" className={classes.listTitle}>video</h3>
          <a href={PERU21TV_URL} title="Videos de Perú21TV">
            <img src={logoImg} alt="Logo de Perú21TV" />
          </a>
        </div>
        <div className={classes.listWrapper}>
          {stories &&
            stories.map(
              (story, index) =>
                story && (
                  <StoryItemController
                    storyUrl={story}
                    isLive={liveStories[index]}
                    index={index}
                    key={`p21tv-${index + 0}`}
                  />
                )
            )}
        </div>
        <div className={classes.viewProgramsWrapper}>
          <a className={classes.viewPrograms} href={PERU21TV_URL}>
            Ver programas
          </a>
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: tvListScripts,
        }}></script>
    </>
  )
}

StoriesListVideo.propTypes = {
  customFields,
}

StoriesListVideo.label = 'Listado de Videos'
StoriesListVideo.static = true

export default StoriesListVideo
