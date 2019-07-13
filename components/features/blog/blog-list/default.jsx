import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import BlogItem from './_children/item'
import Pagination from '../../../global-components/pagination'
import {
  formatDateLocalTimeZone,
  defaultImage,
} from '../../../utilities/helpers'

// TODO: mover fetch

const classes = {
  list: 'bg-white w-full p-15', // blog-list
  title: 'uppercase mb-20 title-xs', // blog-list__title
}

const CONTENT_SOURCE = 'get-count-all-blogs'

@Consumer
class BlogList extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite } = this.props

    this.fetchContent({
      totalPosts: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
        },
        // filter: '',
        /**
         * TODO:CARLOS: verificar si el fetch lo hace correcto sin filter
         * o es obligatorio agregarlo al menos vacio.
         */
        tramsform: ({ total } = {}) => total,
      },
    })
  }

  transformDate = postDate => {
    const arrayDate = formatDateLocalTimeZone(postDate).split(' ')
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
      blog: { blogname = '', path = '' } = {},
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

    const { deployment, contextPath = '', arcSite = '' } = this.props

    const imageUrl =
      guid ||
      defaultImage({ deployment, contextPath, arcSite, defaultImgSize: 'sm' })

    return {
      imageUrl,
      date: this.transformDate(postDate),
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `/blog/${postLink}`,
      urlBlog: `/blog/${path}`,
      // TODO:CARLOS: Verificar si estas urls general / al final. Sino, agregar
    }
  }

  render() {
    const {
      requestUri,
      globalContent = {},
      globalContentConfig = {},
    } = this.props
    const {
      query: { blog_limit: blogLimit = '', blog_offset: blogOffset = '' } = {},
    } = globalContentConfig
    const { totalPosts } = this.state
    // TODO:CARLOS: probar sin contenido console.log('---->', totalPosts)
    const blogs = Object.values(globalContent).filter(
      item => typeof item === 'object'
    )

    return (
      <>
        <div className={classes.list}>
          <h1 className={classes.title}>blogs</h1>
          <div>
            {blogs.map((blog, i) => {
              const params = this.buildParams(blog)
              const key = `blog-${i}-${params.urlPost}`
              return <BlogItem key={key} {...params} />
            })}
          </div>
        </div>
        {totalPosts && (
          <Pagination
            totalElements={totalPosts}
            storiesQty={blogLimit}
            currentPage={blogOffset || 1}
            requestUri={requestUri}
          />
        )}
      </>
    )
  }
}

BlogList.label = 'Blog - Listado blogs'
BlogList.static = true // TODO:CARLOS: verificar si funciona asi

export default BlogList
