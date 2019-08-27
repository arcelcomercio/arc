import React, { useState, useEffect } from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import { formattedTime } from '../../../../utilities/helpers'
import Modal from '../../../../global-components/video-modal'

// TODO: Las clases deben extraerse a la parte superior

export default ({ date, multimedia, title, videoId, maxStories, isAdmin }) => {
  const formatDateLocalTimeZone = rawDate => {
    const auxDate = new Date(rawDate)
    const today = new Date()
    if (
      auxDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ===
      today.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
    ) {
      return formattedTime(auxDate)
    }
    return `${auxDate.getUTCDate()}/${auxDate.getUTCMonth() +
      1}/${auxDate.getUTCFullYear()}`
  }

  const validateNewStory = (rawDate, hours = 24) => {
    const initDate = new Date(rawDate)
    const timeStamp = Math.round(new Date().getTime() / 1000)
    const timeStampYesterday = timeStamp - hours * 3600
    return initDate >= new Date(timeStampYesterday * 1000).getTime()
  }

  const [clientDate, setClientDate] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (date) {
      setClientDate(formatDateLocalTimeZone(date))
    }
  })

  return (
    <div
      className={`tv-separator__item m-10 w-full ${
        maxStories > 6 ? '' : 'limit'
      }`}>
      <button
        type="button"
        className="tv-separator__img-button p-0 overflow-hidden rounded-sm mb-10  position-relative"
        onClick={() => setIsModalOpen(!isModalOpen)}>
        <picture className="block w-full">
          <img className="w-full" src={multimedia.image} alt="" />
          {/* <img
            className={`tv-separator__img block ${
              isAdmin ? '' : 'lazy'
            } w-full`}
            src={isAdmin ? multimedia.image : multimedia.lazyImage}
            data-src={multimedia.image}
            alt=""
          /> */}
        </picture>
        {validateNewStory(date) && (
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
        {clientDate}
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
