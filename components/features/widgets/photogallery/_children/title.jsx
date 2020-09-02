import React from 'react'

const classes = {
  showBox:
    'photogallery-title position-relative flex justify-center items-center',
  showTitle: 'title-md w-full text-black font-bold uppercase',
  showMore:
    'photogallery-title__btn position-absolute block text-black text-sm pt-10 pb-10 pr-15 pl-15 rounded-sm capitalize',
}

export default ({ titleCustom, textAlign, seeMoreShow, seeMoreLink }) => {
  return (
    <div className={classes.showBox}>
      <h2 itemProp="name" className={`${classes.showTitle} text-${textAlign}`}>
        {titleCustom || 'Fotogalerias'}
      </h2>
      {seeMoreShow && (
        <a itemProp="url" href={seeMoreLink} className={classes.showMore}>
          Ver más
        </a>
      )}
    </div>
  )
}
