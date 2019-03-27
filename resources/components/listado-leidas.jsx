import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ItemNew from './item-new-read'

const classes = {
  masLeidas: 'flex flex--column mas-leidas',
  title: 'mas-leidas__title',
}

@Consumer
class ListReads extends Component {
  render() {
    const { viewImage, news } = this.props

    return (
      <div className={classes.masLeidas}>
        <h4 className={classes.title}>lo más visto</h4>
        {news.map(item => {
          const params = { item, viewImage }
          return <ItemNew key={item.id} {...params} />
        })}
      </div>
    )
  }
}
export default ListReads
