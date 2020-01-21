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

const YoutubeVideoNoDestacado = ({ image, title, liveStory }) => {
  const imageclass =
    image.default === false ? classes.listItemImg : classes.listItemImgDefault
  return (
    <>
      <img src={image.payload} alt={title} className={imageclass} />
      <div className={classes.listItemInfo}>
        <h2 className={classes.listItemTitle}>{title}</h2>
        {liveStory && <p className={classes.live}>EN VIVO</p>}
      </div>
    </>
  )
}

export default YoutubeVideoNoDestacado
