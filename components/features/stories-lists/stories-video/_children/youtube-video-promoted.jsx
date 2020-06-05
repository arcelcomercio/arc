import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  destYoutube: 'stories-video__youtube position-relative',
  liveYoutube:
    'stories-video__youtube-live flex items-center justify-center position-absolute',
}

const YoutubeVideoDestacado = ({
  isAdmin,
  title,
  liveStory,
  image,
  imageDefault,
  videoID,
  autoPlayVideo,
}) => {
  let isMobile

  if (typeof window !== 'undefined')
    isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

  const urlVideo =
    autoPlayVideo && !isAdmin && !isMobile
      ? `https://www.youtube.com/embed/${videoID}?autoplay=1`
      : `https://www.youtube.com/embed/${videoID}`

  return (
    <>
      <div className={classes.destYoutube}>
        <iframe
          src={urlVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
          loading="lazy"
          data-img={image}
          data-img-default={imageDefault}
        />
        {liveStory && <p className={classes.liveYoutube}>EN VIVO</p>}
      </div>
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 itemProp="name" className={classes.listItemTitleDest}>{title}</h2>
        </div>
      </div>
    </>
  )
}

YoutubeVideoDestacado.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  videoID: PropTypes.string.isRequired,
  autoPlayVideo: PropTypes.bool.isRequired,
}

export default YoutubeVideoDestacado
