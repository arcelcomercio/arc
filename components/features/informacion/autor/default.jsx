import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import TitleInfoAutor from './_children/TitleInfoAutor'
import Description from './_children/Description'

const classes = {
  infoAutor: 'infoAutor',
}

@Consumer
class InfoAutor extends Component {
  render() {
    const { autorName = '', description = '', title=' SOBRE EL AUTOR' } = this.props
    return (
      <div className={classes.infoAutor}>
        <TitleInfoAutor title ={title} />
        <Description autorName={autorName} description={description} />
      </div>
    )
  }
}

export default InfoAutor
