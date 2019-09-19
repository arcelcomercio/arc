import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import SeparatorBlogChildItem from './_children/item'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

const classes = {
  separator: 'blog-separator mb-20',
  header:
    'blog-separator__header flex flex-row justify-center mb-10 pt-10 position-relative items-center md:mb-10 md:pt-10',
  itemsWrapper: 'flex flex-col overflow-hidden lg:flex-row',
  titleSeparator:
    'blog-separator__blog uppercase title-lg text-gray-300 blog-separator__title-header flex flex-row justify-left items-center',
  seeMoreText:
    'blog-separator__see-more rounded-sm bg-white text-md text-center text-gray-300 capitalize p-10 right-0',
  seeMoreWrapper:
    'blog-separator__btn-wrapper flex items-center justify-center pt-10',
}
const BLOG_BASE = '/blog/'
const CONTENT_SOURCE = 'get-user-blog-and-posts'

@Consumer
class SeparatorBlog extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite } = this.props
    this.fetchDataApi(arcSite, 5)
  }

  fetchDataApi = (arcSite, storiesQty) => {
    this.fetchContent({
      dataApi: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
          blog_limit: storiesQty,
        },
      },
    })
  }

  render() {
    const { dataApi = {} } = this.state
    const {
      arcSite,
      contextPath,
      deployment,
      isAdmin,
      siteProperties: { siteUrl } = {},
    } = this.props
    let listPost = Object.values(dataApi)
    listPost = listPost.slice(0, 5)
    const seeMoreUrl = `${siteUrl}${BLOG_BASE}`

    return (
      <div className={classes.separator}>
        <div className={classes.header}>
          <a className={classes.titleSeparator} href={BLOG_BASE}>
            FIRMAS
          </a>
          <a
            href={seeMoreUrl}
            className={`${classes.seeMoreText} non-mobile non-tablet`}>
            ver más
          </a>
        </div>
        <div className={classes.itemsWrapper}>
          {listPost &&
            listPost.map(post => {
              const {
                user: {
                  first_name: authorName = '',
                  user_avatarb: {
                    resized_urls: {
                      lazy_default: lazyImage,
                      author_sm: authorImg = defaultImage({
                        deployment,
                        contextPath,
                        arcSite,
                        size: 'sm',
                      }),
                    } = {},
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
                lazyImage,
                authorImg,
                blogUrl: addSlashToEnd(`${BLOG_BASE}${blogUrl}`),
                blogName,
                postLink: `${BLOG_BASE}${postLink}`,
                postTitle,
                isAdmin,
              }
              return <SeparatorBlogChildItem key={blogUrl} {...data} />
            })}
        </div>
        <div className={`${classes.seeMoreWrapper} non-desktop`}>
          <a href={seeMoreUrl} className={classes.seeMoreText}>
            ver más
          </a>
        </div>
      </div>
    )
  }
}

SeparatorBlog.label = 'Separador de Blog'
SeparatorBlog.static = true

export default SeparatorBlog
