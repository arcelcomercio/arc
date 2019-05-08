import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import BlogMayInterestYouChildCard from './_children/card'

@Consumer
class BlogMayInterestYou extends PureComponent {
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
      bmInterestYou: 'bm-interest-you clearfix',
      titleGeneral: 'bm-interest-you__title--general',
      containerList: 'bm-interest-you__container--list clearfix',
    }
    return (
      <div className={classes.bmInterestYou}>
        <h4 className={classes.titleGeneral}>Te puede interesar</h4>
        <div className={classes.containerList}>
          {relatedPosts.map(item => {
            const params = this.buildParams(item, blog, contextPath, arcSite)
            return <BlogMayInterestYouChildCard key={params.link} {...params} />
          })}
        </div>
      </div>
    )
  }
}

BlogMayInterestYou.label = 'Blog - Te puede interesar'
BlogMayInterestYou.static = true

export default BlogMayInterestYou
