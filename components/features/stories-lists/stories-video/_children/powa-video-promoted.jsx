import React from 'react'

const classes = {
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
}
const showClose = false
const ItemVideoCenterDestacado = ({ isAdmin, title, video, autoPlayVideo }) => {
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    const {
      detail: { powa },
    } = event

    powa.on(window.PoWa.EVENTS.PLAY, playEvent => {
      window.addEventListener('scroll', () => {
        const playOf = document.querySelector('.stories-video__wrapper')
        const itemDest = document.querySelector('.stories-video__item-dest')
        const scrollHeight = window.scrollY

        // si esta fuera de foco
        if (scrollHeight >= playOf.offsetTop) {
          // + playOf.offsetHeight
          itemDest.classList.add('sticky')
          // showClose = true
        }

        if (scrollHeight < playOf.offsetTop) {
          itemDest.classList.remove('sticky')
        }

        // if (scrollHeight < playOf.offsetTop) {
        //   console.log('top', playOf.offsetTop, 'scroll height', scrollHeight)
        // }
        // else {
        //   itemDest.classList.remove('sticky')
        // }
      })
    })

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
