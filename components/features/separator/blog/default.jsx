import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import SeparatorBlogChildrenItem from './_children/item'
import { setDevice } from '../../../../resources/utilsJs/resizer'

@Consumer
class SeparatorBlog extends Component {
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
    return (
      <div>
        <div className="blog-separator__box-blog">
          <a className="blog-separator__blog" href="/">
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
              return <SeparatorBlogChildrenItem key={blogUrl} {...data} />
            })}
        </div>
      </div>
    )
  }
}

SeparatorBlog.label = 'Separador de Blog'
export default SeparatorBlog
