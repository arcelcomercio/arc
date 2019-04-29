import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import TitleInfoAutor from './_children/TitleInfoAutor'
import BlogAutor from './_children/BlogAutor'

const classes = {
  infoAutor: 'infoAutor',
}

@Consumer
class InfoAutor extends Component {
  render() {
    const { autorName = '', inforAutor = '', title='SOBRE EL AUTOR' } = this.props
    return (
      <div className={classes.infoAutor}>
        <TitleInfoAutor title ={title} />
        <BlogAutor autorName={autorName} inforAutor={inforAutor} />
      </div>
    )
  }
}

export default InfoAutor
