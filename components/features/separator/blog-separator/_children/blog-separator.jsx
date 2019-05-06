import React from 'react'

const BlogSeparator = ({
  authorName,
  authorImg,
  blogUrl,
  blogName,
  postLink,
  postTitle,
  arcSite,
  contextPath,
}) => {
  const LAST_PATH = `?_website=${arcSite}`
  return (
    <div className="blog-separator">
      <div className="blog-separator__box-title">
        <h1 className="blog-separator__title">
          <a
            href={`${contextPath}/${postLink}${LAST_PATH}`}
            className="blog-separator__link">
            {postTitle}
          </a>
        </h1>
      </div>
      <div className="blog-separator__box-middle">
        <a
          href={`${contextPath}/${blogUrl}${LAST_PATH}`}
          className="blog-separator__section">
          {blogName}
        </a>
        <a
          href={`${contextPath}/${blogUrl}${LAST_PATH}`}
          className="blog-separator__author">
          {authorName}
        </a>
      </div>
      <div className="blog-separator__box-img">
        <a href={`${contextPath}/${postLink}${LAST_PATH}`}>
          <img src={authorImg} alt="" className="blog-separator__img" />
        </a>
      </div>
    </div>
  )
}
export default BlogSeparator
