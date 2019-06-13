import React from 'react'
import CardMostReadItem from './item'

const classes = {
  mostRead: 'flex flex-col pt-0 pb-0 pr-15 pl-15 most-read',
  title:
    'most-read__title uppercase font-bold text-center pt-15 pb-15 pr-10 pl-10',
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
