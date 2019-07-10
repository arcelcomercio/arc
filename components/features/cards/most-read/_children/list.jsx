import React from 'react'
import CardMostReadItem from './item'

const classes = {
  mostRead: 'flex flex-col most-read bg-white lg:p-0',
  title: `most-read__title flex flex-row items-center bg-base-200 uppercase font-bold justify-between text-left text-white pr-20 pl-20`,
  icon: 'most-read__icon icon-marca',
}

const CardMostReadChildList = props => {
  const { viewImage, stories } = props

  return (
    <div role="list" className={classes.mostRead}>
      <h4 className={classes.title}>
        Lo más visto <i className={classes.icon} />{' '}
      </h4>

      {stories &&
        stories.map((item, i) => {
          const key = `most-read-${i}-${item.id}`
          const params = { item, viewImage }
          return <CardMostReadItem key={key} {...params} />
        })}
    </div>
  )
}

export default CardMostReadChildList
