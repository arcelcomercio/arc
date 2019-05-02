import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  titleblog: 'blog-title',
  sectiontitle: 'blog-title__section-title',
  urldescription: 'blog-title__url-description',
  imgdescription: 'blog-title__img-description',
}

@Consumer
class TitleBlogAutor extends Component {
  render() {
    const {
      data: { first_name: firstName = '', user_avatarb: { guid = '' } = {} },
      globalContent: { blog: { blogname = '' } = {} } = {},
    } = this.props
    
    return (
      <div className={classes.titleblog}>
        <h1 className={classes.sectiontitle}>
          <a href={firstName} className={classes.urldescription}>
            {blogname}
          </a>
          {firstName}
          <img src={guid} alt={firstName} className={classes.imgdescription} />
        </h1>
      </div>
    )
  }
}

export default TitleBlogAutor
