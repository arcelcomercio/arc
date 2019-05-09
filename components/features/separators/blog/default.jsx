import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import SeparatorBlogChildItem from './_children/item'
import { setDevice } from '../../../utilities/resizer'

@Consumer
class SeparatorBlog extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      device: setDevice(),
      listPost: [],
      dataPost: [],
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleResize)
    this.fetch()
  }

  _reduceBlog = () => {
    const { dataPost } = this.state
    const { device } = this.state
    let limit = 5
    if (device === 'mobile') limit = 2
    if (device === 'tablet') limit = 3
    if (device === 'desktop') limit = 5
    const newList = dataPost && dataPost.slice(0, limit)
    this.setState({
      listPost: newList,
    })
  }

  _handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state
    const tablet = 768
    const desktop = 1024
    if (wsize >= desktop && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
    } else if (wsize < desktop && wsize >= tablet && device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
    } else if (wsize < tablet && device !== 'mobile') {
      this.setState({
        device: 'mobile',
      })
    }
    this._reduceBlog()
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { blog_limit: blogLimit } = customFields
    const source = 'get-user-blog-and-posts'
    const params = {
      website: arcSite,
      blogLimit,
    }

    const { fetched } = this.getContent(source, params)
    fetched
      .then(response => {
        const items = Object.values(response)
        this.setState({
          listPost: items,
          dataPost: items,
        })
        this._reduceBlog()
      })
      .catch(e => console.log(e))
  }

  render() {
    const { listPost } = this.state
    const { arcSite, contextPath } = this.props
    const WEBSITE = `?_website=${arcSite}`
    return (
      <div>
        <div className="blog-separator__box-blog">
          <a
            className="blog-separator__blog"
            href={`${contextPath}/blog${WEBSITE}`}>
            Blogs
          </a>
        </div>
        <div className="blog-separator__content">
          {listPost &&
            listPost.map(post => {
              const {
                user: {
                  first_name: authorName = '',
                  user_avatarb: { guid: authorImg = '' } = {},
                } = {},
                blog: { path: blogUrl = '', blogname: blogName = '' } = {},
                posts: [
                  {
                    post_permalink: postLink = '',
                    post_title: postTitle = '',
                  } = {},
                ] = [],
              } = post
              const data = {
                authorName,
                authorImg,
                blogUrl,
                blogName,
                postLink,
                postTitle,
                arcSite,
                contextPath,
              }
              return <SeparatorBlogChildItem key={blogUrl} {...data} />
            })}
        </div>
      </div>
    )
  }
}

SeparatorBlog.propTypes = {
  customFields: PropTypes.shape({
    blog_limit: PropTypes.string.tag({
      name: 'Posts a mostrar',
      description: 'Por defecto mostrará 5 posts',
    }),
  }),
}

SeparatorBlog.label = 'Separador de Blog'

export default SeparatorBlog
