import React, { useState } from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import { formatDateLocalTimeZone } from '../../../../utilities/helpers'
import Modal from '../../../../global-components/video-modal'

export default ({ date, multimedia, title, videoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isNew = true
  return (
    <div className="tv-separator__item m-10 w-full">
      <button
        type="button"
        className="tv-separator__img-button p-0 overflow-hidden rounded-sm mb-10  position-relative"
        onClick={() => setIsModalOpen(!isModalOpen)}>
        <picture className="block w-full">
          <img className="w-full" src={multimedia} alt="" />
        </picture>
        {isNew && (
          <div className="tv-separator__tag-new font-bold uppercase text-white bg-primary position-absolute text-xs p-5 rounded-sm">
            Nuevo episodio
          </div>
        )}
        <Icon type="basic_video" iconClass="tv-separator__icon" />
      </button>
      <h2 className="mb-15">
        <button
          type="button"
          className="p-0"
          onClick={() => setIsModalOpen(!isModalOpen)}>
          <span className="tv-separator__text-button text-white font-bold text-xl text-left line-h-xs overflow-hidden">
            {title}
          </span>
        </button>
      </h2>
      <time className="block text-white text-md" dateTime={date}>
        {formatDateLocalTimeZone(date)}
      </time>
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
    </div>
  )
}
