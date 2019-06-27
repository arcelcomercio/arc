import React from 'react'

const classes = {
  item: 'separator__item w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-10 pl-10',
  separatorTitle: 'separator__title overflow-hidden text-white text-md',
  separatorLink: `separator__title-link text-md line-h-sm text-white`,
  mvideo: 'separator--video',
  figure: 'p-0 m-0 w-full h-full',
  figureImg: 'w-full h-full object-cover object-center',
  icon: `separator__icon position-absolute text-gray-100 rounded title-sm`,
}

export default ({ title, imageUrl, mediaIcon, link, numline }) => {
  return (
    <article role="listitem" className={classes.item}>
      <i className={`${mediaIcon} ${classes.icon}`} />
      <div className={classes.detail}>
        <h2 className={`${classes.separatorTitle} ${numline}`}>
          <a className={classes.separatorLink} href={link}>
            {title}
          </a>
        </h2>
      </div>
      <figure className={classes.figure}>
        {link && (
          <a href={link}>
            <img src={imageUrl} alt={title} className={classes.figureImg} />
          </a>
        )}
      </figure>
    </article>
  )
}
