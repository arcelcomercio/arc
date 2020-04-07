import React, { useState } from 'react'

// import TvHeader from './header'

import Icon from '../../../../global-components/multimedia-icon'
import Modal from '../../../../global-components/video-modal'

const tvFeaturedBody = ({
  title,
  multimedia,
  isNewStory,
  date,
  clientDate,
  videoId,
  // section,
  // menuSections,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { desktop, tablet, mobile } = multimedia || {}

  return (
    <>
      <div className="tv-featured position-relative mb-40">
        {/* <TvHeader {...{ section, menuSections }} /> */}

        <div className="tv-featured__body mx-auto">
          <button
            type="button"
            className="block p-0 w-full"
            onClick={() => setIsModalOpen(!isModalOpen)}>
            <picture className="tv-featured__picture block position-relative">
              <source
                media="(max-width: 639px)"
                type="image/jpeg"
                srcSet={mobile}
              />
              <source
                media="(max-width: 1023px)"
                type="image/jpeg"
                srcSet={tablet}
              />
              <img
                className="tv-featured__img object-cover w-full h-full"
                src={desktop}
                alt={title}
              />
              <Icon type="basic_video" iconClass="" />
            </picture>
          </button>

          <div className="tv-featured__content p-15 lg:ml-35">
            {isNewStory && (
              <div className="tv-featured__new-episode bg-primary text-white inline-block p-5 rounded-sm mb-10">
                NUEVO EPISODIO
              </div>
            )}
            <h2 className="mb-15">
              <button
                type="button"
                className="tv-featured__text-button text-white font-bold title-xs p-0 text-left"
                onClick={() => setIsModalOpen(!isModalOpen)}>
                {title}
              </button>
            </h2>
            <time className="block text-white mb-15" dateTime={date || ''}>
              {clientDate}
            </time>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          close={() => {
            setIsModalOpen(!isModalOpen)
          }}
          {...videoId}
          // youtubeId="_oQINN93ET4"
          // multimediaSource="4dc92932-7143-4776-94b7-798421d06108"
        />
      )}
    </>
  )
}

const compare = (prevProps, nextProps) => {
  const {
    multimedia: { desktop, tablet, mobile } = {},
    videoId: { multimediaSource, youtubeId, multimediaEmbed } = {},
    title,
    isNewStory,
    date,
    clientDate,
  } = prevProps

  const {
    multimedia: {
      desktop: nextDesktop,
      tablet: nextTablet,
      mobile: nextMobile,
    } = {},
    videoId: {
      multimediaSource: nextMultimediaSource,
      youtubeId: nextYoutubeId,
      multimediaEmbed: nextMultimediaEmbed,
    } = {},
    title: nextTitle,
    isNewStory: nextIsNewStory,
    date: nextDate,
    clientDate: nextClientDate,
  } = nextProps

  if (
    title === nextTitle &&
    isNewStory === nextIsNewStory &&
    date === nextDate &&
    clientDate === nextClientDate
  )
    if (
      desktop === nextDesktop &&
      tablet === nextTablet &&
      mobile === nextMobile
    )
      if (
        multimediaSource === nextMultimediaSource &&
        youtubeId === nextYoutubeId &&
        multimediaEmbed === nextMultimediaEmbed
      )
        return true
  return false
}

export default React.memo(tvFeaturedBody, compare)
