import React from 'react'

const classes = {
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
}

const ItemVideoCenterDestacado = ({ isAdmin, title, video, autoPlayVideo }) => {
  
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    const {
      detail: { powa },
    } = event

    if (
      !isMobile &&
      !isAdmin &&
      autoPlayVideo &&
      powa &&
      powa.play &&
      !powa.isPlay
    ) {
      powa.play()
      powa.isPlay = true
    }
  })
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: video.payload }} />
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
      </div>
    </>
  )
}

export default ItemVideoCenterDestacado
