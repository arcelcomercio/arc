import React from 'react'
import Icon from '../../../../global-components/multimedia-icon'

const classes = {
  item: 'separator__item hidden w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15 pb-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  imgBox: 'p-0 m-0 w-full h-full overflow-hidden',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon`,
  article: `h-full`,
}

export default ({
  title,
  imageUrl,
  lazyImage,
  mediaIcon,
  link,
  numline,
  isAdmin,
}) => {
  return (
    <a href={link} className={classes.item}>
      <article role="listitem" className={classes.article}>
        <Icon type={mediaIcon} iconClass={classes.icon} />
        <div className={classes.detail}>
          <h3 className={`${classes.text} ${numline}`}>{title}</h3>
        </div>
        <figure className={classes.imgBox}>
          <img
            src={isAdmin ? imageUrl : lazyImage}
            data-src={imageUrl}
            alt={title}
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            
          />
        </figure>
      </article>
    </a>
  )
}
