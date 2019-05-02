import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import BlogItem from './_children/BlogItem'
import { formatDate } from '../../../../resources/utilsJs/helpers'

@Consumer
class BlogList extends Component {
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

  buildParams = item => {
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
    } = item

    //const { contextPath = '', arcSite = 'elcomercio' } = this.props

    return {
      urlImage: guid,
      date: this.transformDate(postDate),
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `${this.props.contextPath}/blog/${postLink}?_website=${
        this.props.arcsite
      }`,
      urlBlog: `${this.props.contextPath}/blog/${path}?_website=${
        this.props.arcSite
      }`,
    }
  }

  render() {
    const { globalContent = {} } = this.props
    const blogs = Object.values(globalContent).filter(
      item => typeof item === 'object'
    )

    const classes = {
      list: 'blog-list',
      listTitle: 'blog-list__title',
      listContainer: 'blog-list__container',
    }

    return (
      <div className={classes.list}>
        <h1 className={classes.listTitle}>blogs</h1>
        <div className={classes.listContainer}>
          {blogs.map((item, index) => {
            const params = this.buildParams(item)
            return <BlogItem key={index} {...params} />
          })}
        </div>
      </div>
    )
  }
}

BlogList.label = 'Listado Blogs'

export default BlogList
