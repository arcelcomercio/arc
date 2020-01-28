import React from 'react'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItem:
    'stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer',
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemImgDefault:
    'stories-video__item-default w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
  live: 'stories-video__item-live flex items-center uppercase',
  destYoutube: 'stories-video__youtube position-relative',
  liveYoutube:
    'stories-video__youtube-live flex items-center justify-center position-absolute',
}

const YoutubeVideoDestacado = ({
  isAdmin,
  liveStory,
  title,
  video,
  autoPlayVideo,
}) => {
  const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )
  const urlVideo =
    autoPlayVideo && !isAdmin && !isMobile
      ? `https://www.youtube.com/embed/${video.payload}?autoplay=1`
      : `https://www.youtube.com/embed/${video.payload}`
  return (
    <>
      <div className={classes.destYoutube}>
        <iframe
          className=""
          src={urlVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
        />
        {liveStory && <p className={classes.liveYoutube}>EN VIVO</p>}
      </div>
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
      </div>
    </>
  )
}

export default YoutubeVideoDestacado
