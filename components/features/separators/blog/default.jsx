import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import withSizes from 'react-sizes'

import SeparatorBlogChildItem from './_children/item'
import {  sizeDevice } from '../_dependencies/functions'
import { defaultImage } from '../../../utilities/helpers'

const BLOG_BASE = '/blog'

const classes = {
  header: 'blog-separator__header flex flex-row justify-center mb-30 pt-30 position-relative items-center  ',
  contentItem:'flex overflow-hidden',
  contentItemMovil:'flex flex-col overflow-hidden',
  titleSeparator:
    'blog-separator__blog uppercase title-sm text-gray-300 blog-separator__title-header flex flex-row justify-left items-center',
  seeMoreText: 'blog-separator__see-more-text pt-10 pb-10 pr-10 pl-10 position-absolute right-0',
}

@withSizes(({ width }) => sizeDevice(width))
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
    const { arcSite, contextPath, deployment, isMobile, isTablet,siteProperties:{siteUrl}={} } = this.props
    let listPost = Object.values(dataApi)
    listPost = listPost.slice(0, 5)
    
    const urlVerMas = `${siteUrl}/blog`

    return (
      <div>
        <div className={classes.header}>
          <a className={classes.titleSeparator} href={BLOG_BASE}>
            FIRMAS
          </a>
          
          {isMobile || isTablet ? null: (<a href={urlVerMas} className={classes.seeMoreText}>ver mas</a>)}
        </div>
        <div className={isMobile || isTablet? classes.contentItemMovil : classes.contentItem}>
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
        {isMobile || isTablet ? (<a href={urlVerMas} className={classes.seeMoreText}>ver mas</a>):null}

      </div>
    )
  }
}

SeparatorBlog.label = 'Separador de Blog'

export default SeparatorBlog
