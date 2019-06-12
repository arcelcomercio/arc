import React from 'react'

const CardMostReadChildItem = props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    mostReadItem: 'flex most-read-item',
    figure: `most-read-item__figure most-read-item__figure--icon most-read-item__figure--${type}`,
    img: 'most-read-item__img',
    detail: 'most-read-item__detail pl-10 overflow-hidden',
  }

  return (
    <div className={classes.mostReadItem}>
      {viewImage && (
        <a className={classes.link} href={websiteUrl}>
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
