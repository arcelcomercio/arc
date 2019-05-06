import React from 'react'

export default props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    moreReadItem: 'flex more-read-item',
    figure: `more-read-item__figure more-read-item__figure--icon more-read-item__figure--${type}`,
    img: 'more-read-item__img',
    detail: 'more-read-item__detail',
  }

  return (
    <div className={classes.moreReadItem}>
      {viewImage && (
        <a href={websiteUrl}>
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
