import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  titleblog: 'headerblog',
  sectiontitle: 'headerblog__sectiontitle',
  urldescription: 'headerblog__urldescription',
  imgdescription: 'headerblog__imgdescription',
}

@Consumer
class Title extends Component {
  render() {
    const {
      description = '',
      nameAutor = '',
      urlautor,
      urlImgAutor,
    } = this.props

    return (
      <div className={classes.titleblog}>
        <h1 className={classes.sectiontitle}>
          <a href={urlautor} className={classes.urldescription}>
            {description}
          </a>
          {nameAutor}
          <img
            src={urlImgAutor}
            alt={nameAutor}
            className={classes.imgdescription}
          />
        </h1>
      </div>
    )
  }
}

export default Title
