import React from 'react'

export default props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    new: 'flex new',
    figure: `new__figure new__figure--icon new__figure--${type}`,
    img: 'new__img',
    detail: 'new__detail',
  }

  return (
    <div className={classes.new}>
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
