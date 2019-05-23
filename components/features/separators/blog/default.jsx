import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SeparatorBlogChildItem from './_children/item'
import { setDevice } from '../../../utilities/resizer'
import { defaultImage } from '../../../utilities/helpers'

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
    const { arcSite } = this.props
    const source = 'get-user-blog-and-posts'
    const params = {
      website: arcSite,
      blog_limit: 5,
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
      .catch(e => {
        throw new Error(e)
      })
  }

  render() {
    const { listPost } = this.state
    const { arcSite, contextPath, deployment } = this.props
    return (
      <div>
        <div className="blog-separator__box-blog">
          <a className="blog-separator__blog" href={`${contextPath}/blog`}>
            Blogs
          </a>
        </div>
        <div className="blog-separator__content">
          {listPost &&
            listPost.map(post => {
              const {
                user: {
                  first_name: authorName = '',
                  user_avatarb: {
                    guid: authorImg = defaultImage({
                      deployment,
                      contextPath,
                      arcSite,
                      size: 'sm',
                    }),
                  } = {},
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
                blogUrl: `${contextPath}/blog/${blogUrl}`,
                blogName,
                postLink: `${contextPath}/blog/${postLink}`,
                postTitle,
              }
              return <SeparatorBlogChildItem key={blogUrl} {...data} />
            })}
        </div>
      </div>
    )
  }
}

SeparatorBlog.label = 'Separador de Blog'

export default SeparatorBlog
