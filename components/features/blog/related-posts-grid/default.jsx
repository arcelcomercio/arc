import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import BlogRelatedPostsGridChildCard from './_children/card'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  bmInterestYou: 'br-stories-grid clearfix',
  generalTitle: 'br-stories-grid__title text-uppercase',
  container: 'br-stories-grid__container grid grid--content',
}

@Consumer
class BlogRelatedPostsGrid extends PureComponent {
  buildParams = (relatedPostItem, blog, contextPath, arcSite, deployment) => {
    const blogUrl = `${contextPath}/blog/`
    const postLink = `${blogUrl}${relatedPostItem.post_permalink}`
    const sectionLink = `${blogUrl}${blog.path}`
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
      contextPath,
      arcSite,
      deployment,
      editableField,
      customFields: { featureTitle } = {},
      globalContent: { related_posts: relatedPosts, blog } = {},
    } = this.props || {}

    return (
      <div className={classes.bmInterestYou}>
        <h4
          className={classes.generalTitle}
          {...editableField('featureTitle')}
          suppressContentEditableWarning>
          {featureTitle || 'Te puede interesar'}
        </h4>
        <div className={classes.container}>
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
