import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import withSizes from 'react-sizes'
// TODO:CARLOS: eliminar 'temporalmente' el uso de la lib withSizes
import PropTypes from 'prop-types'
import BlogRelatedPostsGridChildCard from './_children/card'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

const classes = {
  bmInterestYou: 'br-stories-grid non-mobile non-tablet',
  generalTitle:
    'br-stories-grid__title uppercase line-h-md pl-20 pr-20 pt-20 font-bold',
  container: `br-stories-grid__container grid grid--content lg:pt-0 lg:pb-20 lg:pr-20 lg:pl-20`,
}

const BLOG_URL = `/blog/`

@withSizes(({ width }) => ({ isDesktop: width >= 1024 }))
@Consumer
class BlogRelatedPostsGrid extends PureComponent {
  buildParams = (relatedPostItem, blog, contextPath, arcSite, deployment) => {
    const postLink = addSlashToEnd(
      `${BLOG_URL}${relatedPostItem.post_permalink}`
    )
    const sectionLink = addSlashToEnd(`${BLOG_URL}${blog.path}`)

    const defaultImageSrc = defaultImage({
      deployment,
      contextPath,
      arcSite,
      size: 'sm',
    })
    return {
      title: relatedPostItem.post_title || '',
      imageLink:
        (relatedPostItem.post_thumbnail &&
          relatedPostItem.post_thumbnail.guid) ||
        defaultImageSrc,
      sectionName: blog.blogname,
      postLink: relatedPostItem.post_permalink ? postLink : '',
      sectionLink: blog.path ? sectionLink : '',
    }
  }

  render() {
    const {
      isDesktop,
      contextPath,
      arcSite,
      deployment,
      editableField,
      customFields: { featureTitle } = {},
      globalContent: { related_posts: relatedPosts, blog } = {},
    } = this.props || {}
    return (
      /* isDesktop && */ <div role="region" className={classes.bmInterestYou}>
        <h4
          className={classes.generalTitle}
          {...editableField('featureTitle')}
          suppressContentEditableWarning>
          {featureTitle || 'Te puede interesar'}
        </h4>
        <div role="list" className={classes.container}>
          {relatedPosts &&
            relatedPosts.map(item => {
              const params = this.buildParams(
                item,
                blog,
                contextPath,
                arcSite,
                deployment
              )
              return (
                <BlogRelatedPostsGridChildCard
                  key={params.postLink}
                  {...params}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

BlogRelatedPostsGrid.label = 'Blog - Te puede interesar'
BlogRelatedPostsGrid.static = true

BlogRelatedPostsGrid.propTypes = {
  customFields: PropTypes.shape({
    featureTitle: PropTypes.string.tag({
      name: 'Título del componente',
    }),
  }),
}

export default BlogRelatedPostsGrid
