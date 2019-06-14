import React from 'react'

const CardMostReadChildItem = props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    mostReadItem: 'flex most-read-item',
    figure: `most-read-item__figure most-read-item__figure--icon most-read-item__figure--${type} w-full h-full position-relative overflow-hidden`,
    img: 'most-read-item__img w-full h-full object-cover',
    detail:
      'most-read-item__detail w-full overflow-hidden pl-10 text-sm line-h-sm',
  }

  return (
    <div className={classes.mostReadItem}>
      {viewImage && (
        <a href={websiteUrl} className={classes.detail}>
          <figure className={classes.figure}>
            <img className={classes.img} src={imageUrl} alt={title} />
          </figure>
        </a>
      )}
      <a className={classes.detail} href={websiteUrl}>
        {title}
      </a>
    </div>
  )
}

export default CardMostReadChildItem
