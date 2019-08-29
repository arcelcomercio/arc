import React, { useEffect } from 'react'
import ENV from 'fusion:environment'
import { createMarkup } from '../utilities/helpers'

const VIDEO_CENTER_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const ORG_ID = 'elcomercio'

export default ({ close, youtubeId, multimediaSource, multimediaEmbed }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    if (window.powaBoot) {
      window.powaBoot()
    }
  })
  const closeModal = () => {
    close()
    document.body.classList.remove('overflow-hidden')
  }
  return (
    <>
      <div
        className="video-modal__gradient"
        role="button"
        tabIndex="0"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            closeModal()
          }
        }}
        onClick={() => closeModal()}
      />
      <div className="video-modal__embed-container bg-black">
        <button
          type="button"
          className="video-modal__close-button p-0"
          onClick={() => closeModal()}>
          <i className="video-modal__close-icon icon-close text-gray-200 text-lg" />
        </button>
        {youtubeId && (
          <div className="video-modal__embed">
            <iframe
              title={`Youtube - ${youtubeId}`}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        {multimediaSource && (
          <div
            id={`powa-${multimediaSource}`}
            data-env={VIDEO_CENTER_ENV}
            data-api={VIDEO_CENTER_ENV}
            data-org={ORG_ID}
            data-uuid={multimediaSource}
            data-autoplay="true"
            data-aspect-ratio="0.562"
            className="powa"
          />
        )}
        {multimediaEmbed && (
          <div
            dangerouslySetInnerHTML={createMarkup(
              multimediaEmbed.replace(/^<div/, '<div data-autoplay="true"')
            )}
          />
        )}
      </div>
    </>
  )
}
