import React from 'react'

const classes = {
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full position-relative',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  closeSticky:
    'stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold',
}

const handleCloseStickyClick = () => {
  const itemDest = document.querySelector('.stories-video__item-dest')
  itemDest.classList.remove('sticky')
}

const ItemVideoCenterDestacado = ({ isAdmin, title, video, autoPlayVideo }) => {
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    const {
      detail: { powa },
    } = event

    powa.on(window.PoWa.EVENTS.PLAY, () => {
      window.addEventListener('scroll', () => {
        const playOf = document.querySelector('.stories-video__wrapper')
        const itemDest = document.querySelector('.stories-video__item-dest')
        const scrollHeight = window.scrollY

        // si esta fuera de foco por abajo
        if (scrollHeight >= playOf.offsetTop + playOf.offsetHeight) {
          // + playOf.offsetHeight
          itemDest.classList.add('sticky')
          console.log('offset abajo')
        } else if (scrollHeight + window.innerHeight < playOf.offsetTop) {
          // si esta fuera de foco por arriba
          // console.log('scroll', scrollHeight, 'top cpn', playOf.offsetTop)
          itemDest.classList.add('sticky')
          console.log('offset arriba')
        } else {
          itemDest.classList.remove('sticky')
          console.log('en pantalla')
        }
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
        <span className={classes.closeSticky} onClick={handleCloseStickyClick}>
          X
        </span>
      </div>
    </>
  )
}

export default ItemVideoCenterDestacado
