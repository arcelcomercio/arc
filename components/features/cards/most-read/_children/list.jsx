import React from 'react'
import CardMostReadItem from './item'

const classes = {
  mostRead: 'flex flex--column more-read',
  title: 'more-read__title',
}

const CardMostReadChildList = props => {
  const { viewImage, stories } = props

  return (
    <div className={classes.mostRead}>
      <h4 className={classes.title}>Lo más visto</h4>
      {stories.map((item, i) => {
        const key = `most-read-${i}-${item.id}`
        const params = { item, viewImage }
        return <CardMostReadItem key={key} {...params} />
      })}
    </div>
  )
}

export default CardMostReadChildList
