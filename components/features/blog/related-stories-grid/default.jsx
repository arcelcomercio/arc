import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import BlogRelatedStoriesGridChildCard from './_children/card'

@Consumer
class BlogRelatedStoriesGrid extends PureComponent {
  buildParams = (itemRelatedPost, blog, rootPath, website) => {
    const urlBlog = `${rootPath}/blog/`
    const link = urlBlog + itemRelatedPost.post_permalink
    const linkSection = urlBlog + blog.path
    const imageDefault = `${rootPath}/resources/dist/${website}/images/default-blog.jpg`
    return {
      title: itemRelatedPost.post_title || '',
      image: itemRelatedPost.post_thumbnail || imageDefault,
      sectionName: blog.blogname,
      link: itemRelatedPost.post_permalink ? link : '',
      linkSection: blog.path ? linkSection : '',
    }
  }

  render() {
    const {
      globalContent: { related_posts: relatedPosts, blog },
      contextPath,
      arcSite,
    } = this.props || {}
    const classes = {
      bmInterestYou: 'br-stories-grid clearfix',
      titleGeneral: 'br-stories-grid__title--general',
      containerList: 'br-stories-grid__container--list clearfix',
    }
    return (
      <div className={classes.bmInterestYou}>
        <h4 className={classes.titleGeneral}>Te puede interesar</h4>
        <div className={classes.containerList}>
          {relatedPosts &&
            relatedPosts.map(item => {
              const params = this.buildParams(item, blog, contextPath, arcSite)
              return (
                <BlogRelatedStoriesGridChildCard
                  key={params.link}
                  {...params}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

BlogRelatedStoriesGrid.label = 'Blog - Te puede interesar'
BlogRelatedStoriesGrid.static = true

export default BlogRelatedStoriesGrid
