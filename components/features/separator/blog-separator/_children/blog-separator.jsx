import React from 'react'

const BlogSeparator = ({
  authorName,
  authorImg,
  blogUrl,
  blogName,
  postLink,
  postTitle,
}) => {
  return (
    <div className="blog-separator">
      <div className="blog-separator__box-title">
        <h1 className="blog-separator__title">
          <a href={postLink} className="blog-separator__link">
            {postTitle}
          </a>
        </h1>
      </div>
      <div className="blog-separator__box-middle">
        <a href={blogUrl} className="blog-separator__section">
          {blogName}
        </a>
        <a href={blogUrl} className="blog-separator__author">
          {authorName}
        </a>
      </div>
      <div className="blog-separator__box-img">
        <img src={authorImg} alt="" className="blog-separator__img" />
      </div>
    </div>
  )
}
export default BlogSeparator
