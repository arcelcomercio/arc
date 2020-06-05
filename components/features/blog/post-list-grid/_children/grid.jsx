import React from 'react'

const classes = {
  containerGrid:
    'blog-list-grid grid grid--content grid--col-1 grid--col-2 grid--col-3 mt-20 mb-20',
  itemGrid: 'blog-list-grid__item',
  imageLink: 'blog-list-grid__image-link block',
  imageBox:
    'blog-list-grid__image-box block position-relative overflow-hidden w-full h-full',
  image: 'blog-list-grid__image  w-full object-cover',
  blogTitle: 'blog-list-grid__blog-title text-center text-sm pt-10',
  title: 'blog-list-grid__title text-center text-sm pt-10 pb-10',
  author: 'blog-list-grid__author text-center font-bold text-xl pt-10 pb-10',
  icon: 'blog-list-grid__icon text-center mb-10',
  line: 'blog-list-grid__line',
}

const BlogPostListGridChildGrid = ({
  data,
  urlLogoBrand = '',
  siteName = '',
}) => {
  return (
    <div className={classes.containerGrid}>
      {data &&
        data.map(row => {
          return (
            <div className={classes.itemGrid}>
              <a className={classes.imageLink} href={row.urlPost}>
                <picture className={classes.imageBox}>
                  <source
                    className={row.isAdmin ? '' : 'lazy'}
                    media="(max-width: 320px)"
                    type="image/jpeg"
                    srcSet={row.isAdmin ? row.postImageMd : row.lazyImage}
                    data-srcset={row.postImageMd}
                  />
                  <source
                    className={row.isAdmin ? '' : 'lazy'}
                    media="(max-width: 575px)"
                    type="image/jpeg"
                    srcSet={row.isAdmin ? row.postImageLg : row.lazyImage}
                    data-srcset={row.postImageLg}
                  />
                  <img
                    className={`${row.isAdmin ? '' : 'lazy'} ${classes.image}`}
                    src={row.isAdmin ? row.postImageMd : row.lazyImage}
                    data-src={row.postImageMd}
                    alt={row.blogTitle}
                  />
                </picture>
              </a>
              <h3 itemProp="name" className={classes.blogTitle}>
                <a href={row.urlBlog}>{row.blogTitle}</a>
              </h3>
              <div className={classes.author}>
                <a href={row.urlBlog}>{row.author}</a>
              </div>
              <div className={classes.line}></div>
              <h2 itemProp="name" className={classes.title}>
                <a href={row.urlPost}>{row.postTitle}</a>
              </h2>
              <div className={classes.icon}>
                <img src={urlLogoBrand} alt={siteName} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default BlogPostListGridChildGrid
