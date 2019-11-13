// TODO
// Se comenzara a usar story-new a partir del comercio
// y esto se eliminará junto con su feature
import React, { PureComponent } from 'react'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'
// import ConfigParams from '../../../../utilities/config-params'
// import StoryData from '../../../../utilities/story-data'

import {
  reduceWord,
  formatDateLocalTimeZone,
} from '../../../../utilities/helpers'

const classes = {
  storyItem: `blog-post-item w-full pr-20 pl-20 pb-20 mb-20 border-b-1 border-solid border-gray md:pl-0 md:pr-0  lg:p-0`,
  top: 'blog-post-item__top flex items-center md:flex-col md:items-start',
  section: 'blog-post-item__section text-sm text-black md:mb-15',
  titlePost: 'blog-post-item__title-post text-sm text-black pl-10 block',
  date:
    'blog-post-item__date font-thin ml-5 text-xs text-gray-300 md:mt-5 md:ml-0',
  bottom: 'blog-post-item__bottom flex lg:pb-15',
  left: 'blog-post-item__left flex flex-col justify-between pr-20 ',
  contentTitle: 'blog-post-item__content-title overflow-hidden',
  title: `blog-post-item__title block overflow-hidden primary-font line-h-xs mt-10`,
  subtitle: `blog-post-item__subtitle overflow-hidden hidden mt-10 mb-10 text-md text-gray-200 line-h-xs`,
  contenetAuthor: 'hidden',
  author: `blog-post-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'blog-post-item__right position-relative overflow-hidden',
  rightLink: 'blog-post-item__link  h-full',
  iconGallery: `blog-post-item__icon icon-img position-absolute flex items-center justify-center text-white w-full h-full`,
  iconVideo: `blog-post-item__icon icon-video position-absolute flex items-center justify-center text-white w-full h-full`,
  authorImageBox: 'blog-post-item__author-image-box',
  authorImage: 'blog-post-item__author-image',
  img: 'blog-post-item__img object-cover object-center w-full h-full',
  /*   iconImg: `blog-post-item__icon icon-img position-absolute flex items-center justify-center rounded text-black text-sm`, */
  wrapperTitle: 'w-full',
  read: 'blog-post-item__read',
}

class StoriesList extends PureComponent {
  render() {
    const { data, isAdmin } = this.props

    return (
      <div className={`${classes.storyItem}`}>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <div className={classes.top}>
              <p className={classes.date}>
                {formatDateLocalTimeZone(data.date, '.')}
              </p>
            </div>
            <div className={classes.authorImageBox}>
              <a href={data.urlBlog} className={classes.author}>
                <img
                  src={data.authorImg}
                  className={classes.authorImage}                  
                  alt={data.author}
                />
              </a>
            </div>
            <div className={classes.wrapperTitle}>
              <h2 className={classes.contentTitle}>
                <a
                  className={classes.title}
                  href={data.urlBlog}
                  title={data.author}>
                  {reduceWord(data.author)}
                </a>
              </h2>
              <p className={classes.subtitle}>{reduceWord(data.blogTitle)}</p>
              <a href={data.urlPost} className={classes.titlePost}>
                {data.postTitle} <span className={classes.read}>Leer</span>
              </a>
            </div>
          </div>
          <figure className={classes.right}>
            <a href={data.urlPost} className={classes.rightLink}>
              <picture>
                <source
                  className={isAdmin ? '' : 'lazy'}
                  media="(max-width: 639px)"
                  srcSet={isAdmin ? data.imagePost : data.imagePost}
                  data-srcset={data.imagePost}
                />
                <img                  
                  alt={data.postTitle}
                  className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
                  src={isAdmin ? data.imagePost : data.imagePost}
                  data-src={data.imagePost}
                />
              </picture>
            </a>
          </figure>
        </div>
      </div>
    )
  }
}

export default StoriesList
