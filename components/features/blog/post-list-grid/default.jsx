import React from 'react'
import { useFusionContext } from 'fusion:context'

import { customFields } from './_dependencies/custom-fields'
import BlogPostListGridChildGrid from './_children/grid'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

const BlogPostListGrid = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    globalContent = {},
    siteProperties,
  } = useFusionContext()

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
      date: postDate,
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `/blog/${postLink}`,
      urlBlog: addSlashToEnd(`/blog/${path}`),
      isAdmin,
    }
  }

  const {
    customFields: { initialPositionItem = 0, numShowItems = 9 },
  } = props
  const blogs = Object.values(globalContent).filter(
    item => typeof item === 'object'
  )

  // TODO: Cambiar el foreach por map en el render.
  let dataBlogs = []
  blogs.forEach(ele => {
    dataBlogs.push(buildParams(ele))
  })
  dataBlogs = dataBlogs.slice(
    initialPositionItem,
    initialPositionItem + numShowItems
  )
  const urlLogoBrand = deployment(
    `${contextPath}/resources/dist/${arcSite}/images/author.png`
  )
  const { siteName = '' } = siteProperties

  return (
    <>
      <BlogPostListGridChildGrid
        data={dataBlogs}
        urlLogoBrand={urlLogoBrand}
        siteName={siteName}
      />
    </>
  )
}

BlogPostListGrid.label = 'Blog - Listado en grilla'
// BlogPostListGrid.static = true

BlogPostListGrid.propTypes = {
  customFields,
}

export default BlogPostListGrid
