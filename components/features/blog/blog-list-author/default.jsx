import React, { Fragment } from 'react'
// El fragment se usa para poder agregar "key"
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { customFields } from './_dependencies/custom-fields'
import BlogItem from './_children/blog-item'
import Pagination from '../../../global-components/pagination'

import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

const CONTENT_SOURCE = 'get-count-all-blogs'

const classes = {
  container: 'blog-list-author__container',
  listadoSeeMore: 'flex justify-center mt-20 uppercase pb-25 position-relative',
  buttonLink:
    'blog-post-item__button-see-more position-absolute right-0 text-sm font-normal border-1 border-gray border-solid p-10 text-gray-200',
}

const BlogListAuthor = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    globalContent = {},
    globalContentConfig = {},
    requestUri,
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
            resized_urls: {
              thumbnail_md: postImageMd,
              thumbnail_sm: postImageSm,
            } = {},
          } = {},
        } = {},
      ] = [],
      user: {
        user_avatarb: {
          resized_urls: {
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
      isAdmin,
      lazyImage: defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      }),
      imagePost,
      postImageMd,
      postImageSm,
      authorImg,
      date: postDate,
      blogTitle: blogname,
      author: `${firstName} ${lastName}`,
      postTitle,
      urlPost: `/blog/${postLink}`,
      urlBlog: addSlashToEnd(`/blog/${path}`),
    }
  }

  const {
    customFields: { initialPositionItem = 0, isListByAuthor },
  } = props

  const { total: totalItems = null } = totalItemBlogData
  let blogs = {}
  let dataBlogs = []
  let pagLimit = 0
  let pagOffset = 0
  let totalRows = 0

  if (isListByAuthor) {
    const {
      query: {
        posts_limit: postLimit = '',
        posts_offset: postOffset = '',
      } = {},
    } = globalContentConfig || {}
    pagLimit = postLimit
    pagOffset = postOffset

    const {
      posts = [],
      user: {
        first_name: firstName = '',
        last_name: lastName = '',
        user_avatarb: {
          resized_urls: {
            author_sm: authorImg = defaultImage({
              deployment,
              contextPath,
              arcSite,
              size: 'sm',
            }),
          } = {},
        } = {},
      } = {},
      blog: { count_posts: countPosts = '', path = '', blogname = '' } = {},
    } = globalContent || {}
    totalRows = countPosts

    dataBlogs = posts.slice(initialPositionItem).map(post => {
      const {
        post_title: postTitle,
        post_permalink: postLink,
        post_date: postDate,
        post_thumbnail: {
          guid: imagePost = defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
          }),
          resized_urls: {
            thumbnail_md: postImageMd,
            thumbnail_sm: postImageSm,
          } = {},
        } = {},
      } = post

      return {
        isAdmin,
        lazyImage: defaultImage({
          deployment,
          contextPath,
          arcSite,
          size: 'sm',
        }),
        imagePost,
        postImageMd,
        postImageSm,
        authorImg,
        date: postDate,
        blogTitle: blogname,
        author: `${firstName} ${lastName}`,
        postTitle,
        urlPost: `/blog/${postLink}`,
        urlBlog: addSlashToEnd(`/blog/${path}`),
      }
    })
  } else {
    const {
      query: { blog_limit: blogLimit = '', blog_offset: blogOffset = '' } = {},
    } = globalContentConfig
    pagLimit = blogLimit
    pagOffset = blogOffset
    blogs = Object.values(globalContent).filter(
      item => typeof item === 'object'
    )
    dataBlogs = blogs.slice(initialPositionItem).map(ele => buildParams(ele))

    totalRows = totalItems
  }

  return (
    <>
      <div className={classes.container}>
        {dataBlogs.map(
          story =>
            story && (
              <Fragment key={story.urlPost}>
                <BlogItem data={story} {...{ isAdmin }} />
              </Fragment>
            )
        )}
        {
          <Pagination
            totalElements={totalRows}
            storiesQty={pagLimit}
            currentPage={pagOffset || 1}
            requestUri={requestUri}
          />
        }
      </div>
    </>
  )
}

BlogListAuthor.propTypes = {
  customFields,
}

BlogListAuthor.label = 'Listado de post de blog con autores'
BlogListAuthor.static = true

export default BlogListAuthor
