import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import MoreReadItem from './more-read-item'

const classes = {
  moreRead: 'flex flex--column more-read',
  title: 'more-read__title',
}

@Consumer
class MoreReadComponent extends Component {
  render() {
    const { viewImage, stories } = this.props

    return (
      <div className={classes.moreRead}>
        <h4 className={classes.title}>Lo más visto</h4>
        {stories.map(item => {
          const params = { item, viewImage }
          return <MoreReadItem key={item.id} {...params} />
        })}
      </div>
    )
  }
}
export default MoreReadComponent
