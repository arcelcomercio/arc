/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import StoryItemController from './_children/story-item-controller'
import customFields from './_dependencies/custom-fields'
import { tvListScripts } from './_dependencies/scripts'

const classes = {
  listComponent: 'stories-video__wrapper w-full flex flex-col justify-between',
  listHeader:
    'stories-video__header flex items-center justify-between pt-10 pb-10 pl-20 pr-20',
  listTitle: 'stories-video__title text-white uppercase',
  listWrapper: 'stories-video__list-wrapper h-full flex flex-col justify-end',
  viewProgramsWrapper:
    'stories-video__programs-wrapper flex justify-center pt-10 pb-10',
  viewPrograms:
    'stories-video__programs text-white flex items-center flex-row-reverse',
  boxPlaylist: 'stories-video__box-playlist position-relative p-10',
  textPlaylist: 'stories-video__text-playlist',
  btnPlaylist: 'stories-video__btn-playlist position-absolute w-full',
}

const PERU21TV_URL = 'https://peru21.pe/peru21tv/'

const StoriesListVideo = (props) => {
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

  // const [textMore, setTextMore] = React.useState('Mostrar más')
  // const [classBtn, setClassBtn] = React.useState('stories-video__btn-playlist--show')
  // const [classWrapper, setClassWrapper] = React.useState(
  //   'stories-video__list-wrapper--one-item'
  // )

  // const sideScroll = () => {
  //   if (textMore === 'Mostrar más') {
  //     setTextMore('Mostrar menos')
  //     setClassBtn('stories-video__btn-playlist--hide')
  //     setClassWrapper('')
  //   } else {
  //     setTextMore('Mostrar más')
  //     setClassBtn('stories-video__btn-playlist--show')
  //     setClassWrapper('stories-video__list-wrapper--one-item')
  //   }
  // }

  return (
    <>
      <div className={classes.listComponent}>
        <div className={classes.listHeader}>
          <a itemProp="url" href={PERU21TV_URL} title="Videos de Perú21TV">
            <img src={logoImg} alt="Logo de Perú21TV" />
          </a>
          <div className={classes.viewProgramsWrapper}>
            <a
              itemProp="url"
              className={classes.viewPrograms}
              href={PERU21TV_URL}>
              Ver programas
            </a>
          </div>
        </div>
        <div className={`${classes.listWrapper} ${classWrapper}`}>
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
        <div className={classes.boxPlaylist}>
          <span className={classes.textPlaylist}>{textMore}</span>
          <a
            itemProp="url"
            className={`${classes.btnPlaylist} ${classBtn}`}
            href="javascript:;"
            onClick={() => {
              // sideScroll()
            }}>
            <svg width="8" fill="#fff" viewBox="0 0 8 14">
              <path
                d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                transform="translate(-0.293 -0.293)"
              />
            </svg>
          </a>
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: tvListScripts,
        }}
      />
    </>
  )
}

StoriesListVideo.propTypes = {
  customFields,
}

StoriesListVideo.label = 'Listado de Videos'
StoriesListVideo.static = true

export default StoriesListVideo
