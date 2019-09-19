import React from 'react'

const classes = {
  showBox:
    'photogallery-title position-relative flex justify-center items-center',
  showTitle: 'title-md w-full text-black uppercase',
  showMore:
    'photogallery-title__btn position-absolute block text-black text-sm pt-5 pb-5 pr-5 pl-5 rounded-sm',
}

export default ({ titleCustom, textAlign, seeMoreShow, seeMoreLink }) => {
  return (
    <div className={classes.showBox}>
      <h2 className={`${classes.showTitle} text-${textAlign}`}>
        {titleCustom || 'Fotogalerias'}
      </h2>
      {seeMoreShow && (
        <a href={seeMoreLink} className={classes.showMore}>
          Ver Mas
        </a>
      )}
    </div>
  )
}
