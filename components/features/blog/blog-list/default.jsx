import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import BlogItem from './_children/item'
import Pagination from '../../../global-components/pagination'
import { customFields } from '../_dependencies/custom-fields'
import Ads from '../../../global-components/ads'

import {
  formatDateLocalTimeZone,
  defaultImage,
  addSlashToEnd,
} from '../../../utilities/helpers'

const classes = {
  list: 'bg-white w-full p-15 blog-list',
  title: 'uppercase mb-20 title-xs blog-list__title',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const CONTENT_SOURCE = 'get-count-all-blogs'

const BlogList = props => {
  const { customFields: customFieldsProps = {} } = props

  const {
    arcSite,
    isAdmin,
    deployment,
    contextPath,
    requestUri,
    globalContent = {},
    globalContentConfig = {},
  } = useFusionContext()

  const totalPosts =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
      },
    }) || {}

  const {
    query: { blog_limit: blogLimit = '', blog_offset: blogOffset = '' } = {},
  } = globalContentConfig || {}

  const { total: totalItems = null } = totalPosts

  const blogs = Object.values(globalContent).filter(
    item => typeof item === 'object'
  )

  const activeAds = Object.keys(customFieldsProps)
    .filter(prop => prop.match(/adsMobile(\d)/))
    .filter(key => customFieldsProps[key] === true)

  const activeAdsArray = activeAds.map(el => {
    return {
      name: `movil${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }
  })

  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  const transformDate = postDate => {
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

  const buildParams = blog => {
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
        first_name: firstName = '',
        last_name: lastName = '',
      } = {},
    } = blog

    return {
      lazyImage,
      authorImg,
      date: transformDate(postDate),
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `/blog/${postLink}`,
      urlBlog: addSlashToEnd(`/blog/${path}`),
      isAdmin,
      // TODO:CARLOS: Verificar si estas urls general / al final. Sino, agregar
    }
  }

  return (
    <>
      <div className={classes.list}>
        <h1 className={classes.title}>blogs</h1>
        <div>
          {blogs.map((blog, i) => {
            const params = buildParams(blog)
            const key = `blog-${i}-${params.urlPost}`
            const ads = hasAds(i + 1, activeAdsArray)
            return (
              <>
                <BlogItem key={key} {...params} />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads adElement={ads[0].name} isDesktop={false} isMobile />
                  </div>
                )}
              </>
            )
          })}
        </div>
      </div>
      {totalItems && (
        <Pagination
          totalElements={totalItems}
          storiesQty={blogLimit}
          currentPage={blogOffset || 1}
          requestUri={requestUri}
        />
      )}
    </>
  )
}

BlogList.propTypes = {
  customFields,
}

BlogList.label = 'Blog - Listado blogs'
BlogList.static = true

export default BlogList
