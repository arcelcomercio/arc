import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import withSizes from 'react-sizes'

import SeparatorBlogChildItem from './_children/item'
import { getStoriesQty, sizeDevice } from '../_dependencies/functions'
import { defaultImage } from '../../../utilities/helpers'

const BLOG_BASE = '/blog'

const classes = {
  header: 'flex flex-row justify-center mb-30 pt-30 position-relative items-center  ',
  
  titleSeparator:
    'blog-separator__blog uppercase title-sm text-gray-300 blog-separator__title-header flex flex-row justify-left items-center',
  seeMoreText: 'blog-separator__see-more-text pt-10 pb-10 pr-10 pl-10 position-absolute right-0',
}

@withSizes(({ width }) => sizeDevice(width))
@Consumer
class SeparatorBlog extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite, isMobile, isTablet } = this.props
    this.fetchDataApi(arcSite, getStoriesQty(isMobile, isTablet))
  }

  fetchDataApi = (arcSite, storiesQty) => {
    this.fetchContent({
      dataApi: {
        source: 'get-user-blog-and-posts',
        query: {
          website: arcSite,
          blog_limit: storiesQty,
        },
      },
    })
  }

  render() {
    const { dataApi = {} } = this.state
    const { arcSite, contextPath, deployment, isMobile, isTablet } = this.props
    let listPost = Object.values(dataApi)
    listPost = listPost.slice(0, getStoriesQty(isMobile, isTablet))
    return (
      <div>
        <div className={classes.header}>
          <a className={classes.titleSeparator} href={BLOG_BASE}>
            FIRMAS
          </a>
          <a href="www.google.com.pe" className={classes.seeMoreText}>ver mas</a>
        </div>
        <div className="flex overflow-hidden">
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
                blogUrl: `${BLOG_BASE}/${blogUrl}`,
                blogName,
                postLink: `${BLOG_BASE}/${postLink}`,
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
