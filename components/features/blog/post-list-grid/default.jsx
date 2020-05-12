import React from 'react'
import { useFusionContext } from 'fusion:context'

import { customFields } from './_dependencies/custom-fields'
import BlogPostListGridChildGrid from './_children/grid'
import { addSlashToEnd } from '../../../utilities/parse/strings'
import { getAssetsPath, defaultImage } from '../../../utilities/assets'

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
            resized_urls: {
              thumbnail_lg: postImageLg,
              thumbnail_md: postImageMd,
            } = {},
          } = {},
        } = {},
      ] = [],
      user: { first_name: firstName = '', last_name: lastName = '' } = {},
    } = blog

    return {
      lazyImage: defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      }),
      imagePost,
      postImageLg,
      postImageMd,
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

  const dataBlogs = blogs
    .slice(initialPositionItem, initialPositionItem + numShowItems)
    .map(blog => buildParams(blog))

  const urlLogoBrand = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/author.png?d=1`

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
BlogPostListGrid.static = true

BlogPostListGrid.propTypes = {
  customFields,
}

export default BlogPostListGrid
