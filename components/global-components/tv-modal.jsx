import React from 'react'

export default () => {
  return (
    <>
      <div className="tv-modal__gradient"></div>
      <div className="tv-modal__embed">
        <iframe
          title="This is a unique title"
          width="516"
          height="338"
          src="https://www.youtube.com/embed/BtBHh6gfzEo?&autoplay=1"
          frameBorder="0"
          allowFullScreen></iframe>
      </div>
    </>
  )
}
