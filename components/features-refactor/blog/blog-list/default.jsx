import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import BlogItem from './_children/Item'
import { formatDate } from '../../../utilities/helpers'

const classes = {
  list: 'bg--white blog-list',
  listTitle: 'text-uppercase blog-list__title',
}

@Consumer
class BlogList extends PureComponent {
  transformDate = postDate => {
    const arrayDate = formatDate(postDate).split(' ')
    if (arrayDate.length > 1)
      return parseInt(arrayDate[1].split(':')[0], 10) > 12
        ? `${arrayDate[1]} pm`
        : `${arrayDate[1]} am`
    return arrayDate[0]
      .split('-')
      .reverse()
      .join('/')
  }

  buildParams = blog => {
    const {
      blog: { blogname = '', path = '#' } = {},
      posts: [
        {
          post_title: postTitle = '',
          post_permalink: postLink = '',
          post_date: postDate = '',
        } = {},
      ] = [],
      user: {
        user_avatarb: { guid = '' } = {},
        first_name: firstName = '',
        last_name: lastName = '',
      } = {},
    } = blog

    const { contextPath = '', arcSite = 'elcomercio' } = this.props

    return {
      urlImage: guid,
      date: this.transformDate(postDate),
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `${contextPath}/blog/${postLink}?_website=${arcSite}`,
      urlBlog: `${contextPath}/blog/${path}?_website=${arcSite}`,
    }
  }

  render() {
    const { globalContent = {} } = this.props
    const blogs = Object.values(globalContent).filter(
      item => typeof item === 'object'
    )

    return (
      <div className={classes.list}>
        <h1 className={classes.listTitle}>blogs</h1>
        <div>
          {blogs.map(blog => {
            const params = this.buildParams(blog)
            return <BlogItem key={params.urlPost} {...params} />
          })}
        </div>
      </div>
    )
  }
}

BlogList.label = 'Blog - Listado blogs'
BlogList.static = true

export default BlogList
