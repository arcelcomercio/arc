import React, { Component } from 'react'

export default class ItemNew extends Component {
  constructor(props) {
    super(props)
    const { item } = props
  }

  render() {
    const { item } = this.props
    const { websiteUrl, imageUrl, title, captionImg, typeNote } = item
    const { viewImage } = this.props

    const classes = {
      new: 'flex new',
      figure: `new__figure new__img--icon new__img--${typeNote}`,
      img: 'new__img',
      detail: 'new__detail',
    }

    return (
      <a className={classes.new} href={websiteUrl}>
        {viewImage && (
          <figure className={classes.figure}>
            <img className={classes.img} src={imageUrl} alt={captionImg} />
          </figure>
        )}
        <p className={classes.detail}>{title}</p>
      </a>
    )
  }
}
