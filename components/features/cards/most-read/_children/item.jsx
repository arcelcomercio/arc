import React from 'react'

const CardMostReadChildItem = props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    mostReadItem: 'flex most-read-item',
    figure: `most-read-item__figure position-relative overflow-hidden h-full w-full most-read-item__figure--icon most-read-item__figure--${type}`,
    img: 'w-full h-full object-cover',
    detail: 'most-read-item__detail overflow-hidden',
    link: 'most-read-item__link w-full',
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
