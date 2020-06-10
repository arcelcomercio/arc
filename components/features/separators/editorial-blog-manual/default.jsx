/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
// import { debug } from 'webpack'
import SeparatorBlogChildItem from '../../../global-components/separator-blog-item'

import { schemaEditorial } from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

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
const CONTENT_SOURCE_PHOTO = 'photo-resizer'
const CONTENT_SOURCE_EDITORIAL_GESTION = 'editorial-de-gestion'
// editorial-de-gestion

const postRegexp = /\/blog[s]?\/([\w\d-]+)\/([0-9]{4})\/([0-9]{2})\/([\w\d-]+)(?:\.html)?\/?/

const urlLogoGestion =
  'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/U4XN23KAQRDAHCTARRCGIKVJOE.png'

const getDataEditorial = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    customFields: { titleEditorial, imageEditorial },
  } = useFusionContext()

  const dataEditorial =
    useContent({
      source: CONTENT_SOURCE_SECTION,
      query: {
        name: CONTENT_SOURCE_EDITORIAL_GESTION,
      },
      filter: schemaEditorial(arcSite),
    }) || {}

  const fetchImage =
    useContent({
      source: CONTENT_SOURCE_PHOTO,
      query: {
        url: imageEditorial || urlLogoGestion,
        presets: 'square_s:150x150',
      },
    }) || {}

  const {
    headlines: { basic: postTitleEditorial = '' } = {},
    websites = {},
  } = dataEditorial

  const { website_url: postLinkEditorial = '' } = websites[arcSite] || {}

  const {
    resized_urls: { square_s: authorImgEditorial = '' } = {},
  } = fetchImage

  const defaultImg = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'sm',
  })

  const paramsEditorial = {
    authorName: titleEditorial || 'Editorial',
    lazyImage: defaultImg,
    authorImg: authorImgEditorial || urlLogoGestion || defaultImg,
    blogUrl: '/noticias/editorial-de-gestion/',
    postLink: postLinkEditorial,
    postTitle: postTitleEditorial,
    isAdmin,
  }
  return paramsEditorial
}

const getContentPost = ps => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  let data = {}

  if (ps && ps !== '') {
    const contentPost =
      useContent({
        source: 'get-post-data-by-blog-and-post-name',
        query: {
          blog_path: ps[0],
          year: ps[1],
          month: ps[2],
          post_name: ps[3],
          posts_limit: 6,
          posts_offset: 0,
        },
      }) || []

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
      post: { post_permalink: postLink = '', post_title: postTitle = '' } = {},
    } = contentPost

    data = {
      authorName,
      lazyImage,
      authorImg,
      blogUrl: addSlashToEnd(`${BLOG_BASE}${blogUrl}`),
      blogName,
      postLink: `${BLOG_BASE}${postLink}`,
      postTitle,
      isAdmin,
    }
  }

  return data
}

const getValueFromUrl = url => {
  let paramsSource = []
  if (postRegexp.test(url)) {
    const [, blogPath, year, month, postName] = url.match(postRegexp)
    paramsSource = [blogPath, year, month, postName]
  }
  return paramsSource
}

const SeparatorEditorialBlogManual = () => {
  const {
    customFields: { post01 = '', post02 = '', post03 = '', post04 = '' },
    siteProperties: { siteUrl } = {},
  } = useFusionContext()
  // guarda en un state los parametros de la editorial
  const [editorialData] = useState(getDataEditorial())

  // guarda en una lista los url obtenidos de los customfields
  const urlList = [post01, post02, post03, post04]

  // iteratua los url y obtiene los valores de los post
  const paramList = []
  urlList.forEach(post => {
    if (post !== '') {
      paramList.push(getContentPost(getValueFromUrl(post)))
    }
  })

  const seeMoreUrl = `${siteUrl}${BLOG_BASE}`

  return (
    <div className={classes.separator}>
      <div className={classes.header}>
        <a itemProp="url" className={classes.titleSeparator} href={BLOG_BASE}>
          FIRMAS
        </a>
        <a
          href={seeMoreUrl}
          className={`${classes.seeMoreText} non-mobile non-tablet`}>
          Ver más
        </a>
      </div>
      <div className={classes.itemsWrapper}>
        {editorialData && <SeparatorBlogChildItem {...editorialData} />}
        {paramList.length > 0 &&
          paramList.map(post => <SeparatorBlogChildItem {...post} />)}
      </div>
      <div className={`${classes.seeMoreWrapper} non-desktop`}>
        <a itemProp="url" href={seeMoreUrl} className={classes.seeMoreText}>
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
