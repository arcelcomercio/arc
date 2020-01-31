import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { BLOG_TOKEN, resizerSecret } from 'fusion:environment'
import { createUrlResizer } from '@arc-core-components/content-source_content-api-v4'
import RedirectError from '../../../../components/utilities/redirect-error' 
// import { transform } from '../../../../content/sources/get-user-blog-and-posts'

import SeparatorBlogChildItem from './_children/item'
import {
  schemaBlog,
  schemaEditorial,
  schemaPhoto,
} from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import {
  defaultImage,
  addSlashToEnd,
  getPhotoId,
} from '../../../utilities/helpers'

const classes = {
  separator: 'blog-separator mb-20',
  header: `blog-separator__header flex flex-row justify-center mb-10 pt-10 position-relative items-center md:mb-10 md:pt-10`,
  itemsWrapper: 'flex flex-col overflow-hidden lg:flex-row',
  titleSeparator: `blog-separator__blog uppercase title-lg text-gray-300 blog-separator__title-header flex flex-row justify-left items-center`,
  seeMoreText: `blog-separator__see-more rounded-sm bg-white text-sm text-center text-gray-300 capitalize p-10 right-0`,
  seeMoreWrapper: `blog-separator__btn-wrapper flex items-center justify-center pt-10`,
}
const BLOG_BASE = '/blog/'
const CONTENT_SOURCE_SECTION = 'story-by-tag'
const CONTENT_SOURCE_BLOG = 'get-user-blog-and-posts'
const CONTENT_SOURCE_POST = 'get_post_data_by_blog_and_post_name'
const CONTENT_SOURCE_PHOTO = 'photo-by-id'

const urlLogoGestion =
  'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/U4XN23KAQRDAHCTARRCGIKVJOE.png'

const SeparatorEditorialBlogManual = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    customFields: { 
      titleEditorial, 
      imageEditorial, 
      post01 = '',  
      post02 = '', 
      post03 = '', 
      post04 = '' 
    },
    siteProperties: { siteUrl } = {},
  } = useFusionContext()

  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(arcSite)

  const urlList = [post01, post02, post03, post04]
  const paramsSource = urlList.map((url) => {
    if (url !== '') {
      const [, blogPath, year, month, postName] = url.match(/\/blog[s]?\/([\w\d-]+)\/([0-9]{4})\/([0-9]{2})\/([\w\d-]+)(?:\.html)?\/?/)
      return [blogPath, year, month, postName]
    }
  })

  let dataBlog = []
  dataBlog.status = "ok"
  
  if(paramsSource[0] !== undefined){
    dataBlog.push(
      useContent({
        source: 'get-post-data-by-blog-and-post-name',
        query: {
          'blog_path': paramsSource[0][0],
          'year': paramsSource[0][1],
          'month': paramsSource[0][2],
          'post_name': paramsSource[0][3],
          'posts_limit': 6, 
          'posts_offset': 0
        },
      }) || [])
  }

  if(paramsSource[1] !== undefined){
    dataBlog.push(
      useContent({
        source: 'get-post-data-by-blog-and-post-name',
        query: {
          'blog_path': paramsSource[1][0],
          'year': paramsSource[1][1],
          'month': paramsSource[1][2],
          'post_name': paramsSource[1][3],
          'posts_limit': 6, 
          'posts_offset': 0
        },
      }) || [])
  }
  
  if(paramsSource[2] !== undefined){
    dataBlog.push(
      useContent({
        source: 'get-post-data-by-blog-and-post-name',
        query: {
          'blog_path': paramsSource[2][0],
          'year': paramsSource[2][1],
          'month': paramsSource[2][2],
          'post_name': paramsSource[2][3],
          'posts_limit': 6, 
          'posts_offset': 0
        },
      }) || [])
  }

  if(paramsSource[3] !== undefined){
    dataBlog.push(
      useContent({
        source: 'get-post-data-by-blog-and-post-name',
        query: {
          'blog_path': paramsSource[3][0],
          'year': paramsSource[3][1],
          'month': paramsSource[3][2],
          'post_name': paramsSource[3][3],
          'posts_limit': 6, 
          'posts_offset': 0
        },
      }) || [])
  }

  const dataEditorial =
    useContent({
      source: CONTENT_SOURCE_SECTION,
      query: {
        name: 'editorial-de-gestion',
      },
      filter: schemaEditorial(arcSite),
    }) || {}

  const fetchImage =
    useContent({
      source: CONTENT_SOURCE_PHOTO,
      query: { _id: getPhotoId(imageEditorial || urlLogoGestion) },
      filter: schemaPhoto,
    }) || {}

  let listPost = Object.values(dataBlog)
  listPost = listPost.slice(0, 4)
  const seeMoreUrl = `${siteUrl}${BLOG_BASE}`

  const {
    headlines: { basic: postTitleEditorial = '' } = {},
    websites = {},
  } = dataEditorial
  const { website_url: postLinkEditorial = '' } = websites[arcSite] || {}

  const {
    resized_urls: {
      lazy_default: lazyImageEditorial = '',
      square_s: authorImgEditorial = defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      }),
    } = {},
  } = fetchImage

  const paramsEditorial = {
    authorName: titleEditorial || 'Editorial',
    lazyImage: lazyImageEditorial || urlLogoGestion,
    authorImg: authorImgEditorial || urlLogoGestion,
    blogUrl: '/noticias/editorial-de-gestion/',
    postLink: postLinkEditorial,
    postTitle: postTitleEditorial,
    isAdmin,
  }

  return (
    <div className={classes.separator}>
      <div className={classes.header}>
        <a className={classes.titleSeparator} href={BLOG_BASE}>
          FIRMAS
        </a>
        <a
          href={seeMoreUrl}
          className={`${classes.seeMoreText} non-mobile non-tablet`}>
          Ver más
        </a>
      </div>
      <div className={classes.itemsWrapper}>
        <SeparatorBlogChildItem {...paramsEditorial} />
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
              post: {
                  post_permalink: postLink = '',
                  post_title: postTitle = '',
                } = {},
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
          Ver más
        </a>
      </div>
    </div>
  )
}

SeparatorEditorialBlogManual.label = 'Separador Blog Manual con Editorial'
SeparatorEditorialBlogManual.propTypes = {
  customFields,
}
SeparatorEditorialBlogManual.static = true

export default SeparatorEditorialBlogManual
