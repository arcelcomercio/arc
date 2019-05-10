import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import BlogItem from './_children/item'
import Paginacion from '../../../global-components/pagination'
import { formatDate } from '../../../utilities/helpers'

const classes = {
  list: 'bg--white blog-list',
  listTitle: 'text-uppercase blog-list__title',
}
@Consumer
class BlogList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      totalPost: null,
    }
  }

  componentDidMount() {
    this.fetch()
  }

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

  fetch() {
    const { arcSite } = this.props
    const source = 'get-count-all-blogs'
    const params = {
      website: arcSite,
    }

    const { fetched } = this.getContent(source, params)
    fetched
      .then(response => {
        console.log(response.total, 'total post')
        this.setState({
          totalPost: response.total,
        })
      })
      .catch(e => console.log('Error: ', e))
  }

  render() {
    const { globalContent = {}, globalContentConfig = {} } = this.props
    const {
      query: { blog_limit: blogLimit = '', blog_offset: blogOffset = '' } = {},
    } = globalContentConfig
    const { totalPost } = this.state
    const blogs = Object.values(globalContent).filter(
      item => typeof item === 'object'
    )

    return (
      <Fragment>
        <div className={classes.list}>
          <h1 className={classes.listTitle}>blogs</h1>
          <div>
            {blogs.map(item => {
              const params = this.buildParams(item)
              return <BlogItem key={params.urlPost} {...params} />
            })}
          </div>
        </div>
        {totalPost && (
          <Paginacion
            totalElements={totalPost}
            storiesQty={blogLimit}
            currentPage={blogOffset || 1}
          />
        )}
      </Fragment>
    )
  }
}

BlogList.label = 'Blog - Listado blogs'

export default BlogList
