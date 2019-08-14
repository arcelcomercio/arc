import React, { useEffect } from 'react'
import ENV from 'fusion:environment'

/** CR: Ya no se llamará GOLDFISH :V */
/** CR: ¿Revisaste si esto se puede homologar un un componente
 * que creo se llama embed-multimedia? Hay algo de código duplicado
 * entre ambos.
 */
const GOLDFISH_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const ORG_ID = 'elcomercio'

export default ({ close, youtubeId, multimediaSource }) => {
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
        className="tv-modal__gradient"
        role="button"
        tabIndex="0"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            closeModal()
          }
        }}
        onClick={() => closeModal()}></div>
      <div className="tv-modal__embed-container bg-black">
        {youtubeId ? (
          <div className="tv-modal__embed">
            <iframe
              title="This is a unique title" // CR: TODO: Recuerda modificar este title
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
              frameBorder="0"
              allowFullScreen></iframe>
          </div>
        ) : (
          <div
            id={`powa-${multimediaSource}`}
            data-env={GOLDFISH_ENV}
            data-api={GOLDFISH_ENV}
            data-org={ORG_ID}
            data-uuid={multimediaSource}
            data-autoplay="true"
            data-aspect-ratio="0.562"
            className="powa"
          />
        )}
      </div>
    </>
  )
}
