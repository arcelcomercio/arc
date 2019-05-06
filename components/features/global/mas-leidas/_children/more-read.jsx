import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import MoreReadItem from './more-read-item'

const classes = {
  masLeidas: 'flex flex--column mas-leidas',
  title: 'mas-leidas__title',
}

@Consumer
class MoreReadComponent extends Component {
  render() {
    const { viewImage, stories } = this.props

    return (
      <div className={classes.masLeidas}>
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
