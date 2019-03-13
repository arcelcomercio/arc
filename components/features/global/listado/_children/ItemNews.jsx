import React from 'react'
import ImageNews from './ImageNews'

const classes = {
  itemNews: 'List__itemNews',
  time: 'List__time',
  pageLink: 'List__pageLink',
  bold: 'bold',
}

const ItemNews = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  promo_items: promoItems,
}) => {
  return (
    <article className={classes.itemNews}>
      {seeImageNews && <ImageNews urlNews={urlNews} promo_items={promoItems} />}
      {seeHour && <div className={classes.time}>{time}</div>}
      <div className={classes.pageLink}>
        <a href={urlNews}>
          <h3 className={classes.bold}>{title}</h3>
        </a>
      </div>
    </article>
  )
}

export default ItemNews
