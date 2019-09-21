import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { customFields } from './_dependencies/custom-fields'
import BlogPostListGridChildGrid from './_children/grid'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'
import BlogPostListGridChildList from './_children/list'

const CONTENT_SOURCE = 'get-count-all-blogs'

const BlogPostListGrid = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    globalContent = {},
    globalContentConfig = {},
  } = useFusionContext()

  const totalItemBlogData =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
      },
    }) || {}

  const buildParams = blog => {
    const {
      blog: { blogname = '', path = '' } = {},
      posts: [
        {
          post_title: postTitle = '',
          post_permalink: postLink = '',
          post_date: postDate = '',
          post_thumbnail: {
            guid: imagePost = defaultImage({
              deployment,
              contextPath,
              arcSite,
              size: 'sm',
            }),
          } = {},
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
      imagePost,
      authorImg,
      date: postDate, // this.transformDate(postDate),
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `/blog/${postLink}`,
      urlBlog: addSlashToEnd(`/blog/${path}`),
      isAdmin,
    }
  }

  const {
    requestUri,
    // globalContent = {},
    // globalContentConfig = {},
    customFields: { initialPositionItem = 0, numShowItems = 9 },
  } = props
  console.log('props', props)
  const {
    query: { blog_limit: blogLimit = '', blog_offset: blogOffset = '' } = {},
  } = globalContentConfig
  // const { totalPosts = {} } = this.state
  const { total: totalItems = null } = totalItemBlogData
  const blogs = Object.values(globalContent).filter(
    item => typeof item === 'object'
  )

  // TODO: Cambiar el foreach por map en el render.

  const dataBlogs = []
  blogs.forEach(ele => {
    dataBlogs.push(buildParams(ele))
  })
  console.log('============ blogs ======', blogs, totalItems)
  console.dir(dataBlogs)

  return (
    <>
      <BlogPostListGridChildGrid data={dataBlogs} />
      <BlogPostListGridChildList data={dataBlogs} />
    </>
  )
}

BlogPostListGrid.label = 'Blog - Listado en grilla'
// BlogPostListGrid.static = true

BlogPostListGrid.propTypes = {
  customFields,
}

export default BlogPostListGrid
