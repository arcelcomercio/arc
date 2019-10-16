import React from 'react'

const classes = {
  videoList: 'video-list__item',
  link: 'video-list__link',
  picture: 'block mb-10',
  image: 'video-list__image object-cover w-full',
  duration: 'text-gray-200 text-md pr-5 ',
  title: 'line-h-xs text-xl font-bold video-list__new ',
}

export default ({ websiteLink, title, multimediaSquareMD, videoDuration }) => {
  return (
    <div className={classes.videoList}>
      <a className={classes.link} href={websiteLink}>
        <amp-img
          src={multimediaSquareMD}
          layout="responsive"
          width="304"
          height="200"
          alt={title}
        />
      </a>

      <div className="flex">
        <span className={classes.duration}>{videoDuration}</span>
      </div>
      <a href={websiteLink}>
        <h3 className={classes.title}>{title}</h3>
      </a>
    </div>
  )
}
