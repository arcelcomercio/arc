import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  infoAutor: 'author-detail',
  title: 'author-detail__title',
  body: 'author-detail__blog',
  titleblog: 'author-detail__blog-title',
  description: 'author-detail__description',
}

@Consumer
class AuthorDetail extends Component {
  render() {
    const {
      data: {
        description = '',
        first_name: firstName = '',
        
      }={},
    } = this.props


    return (
      <div className={classes.infoAutor}>
        <h4 className={classes.title}>{'SOBRE EL AUTOR'}</h4>
        <div className={classes.body}>
          <h3 className={classes.titleblog}>{firstName} </h3>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
    )
  }
}

export default AuthorDetail
