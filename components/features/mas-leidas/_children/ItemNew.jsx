import React, { Component } from 'react'

const classes = {
  new: 'flex new',
  figure: 'new__figure new__figure__img--icon new__figure__img--video',
  img: 'new__figure__img',
  detail: 'new__detail',
}

export default class ItemNew extends Component {
  constructor(props) {
    super(props)
    const { item } = props
  }

  render() {
    const { item } = this.props
    const { websiteUrl, imageUrl, title } = item
    const { viewImage } = this.props
    return (
      <a className={classes.new} href={websiteUrl}>
        {viewImage && (
          <figure className={classes.figure}>
            <img className={classes.img} src={imageUrl} alt="" />
          </figure>
        )}
        <p className={classes.detail}>{title}</p>
      </a>
    )
  }
}
