import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  title: 'full-width text-left margin-top',
}
@Consumer
class ListTitle extends Component {
  render() {
    const {
      isAdmin,
      globalContent: { section_name: sectionName },
    } = this.props

    return (
      <h1 className={classes.title}>
        {isAdmin
          ? 'EL TÍTULO SÓLO SE MOSTRARÁ EN LA PÁGINA PUBLICADA'
          : sectionName.toUpperCase()}
      </h1>
    )
  }
}

export default ListTitle
