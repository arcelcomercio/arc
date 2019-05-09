import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: 'stories-list-card__story flex flex--column',
  time: 'stories-list-card__time flex flex--justify-center flex--column',
  pageLink: 'stories-list-card__page-link flex flex--column',
  bold: 'bold',
}

const StoriesListsCardChildItem = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  promoItems,
}) => {
  return (
    <article className={classes.story}>
      {seeImageNews && <Multimedia urlNews={urlNews} promoItems={promoItems} />}
      {seeHour && <div className={classes.time}>{time}</div>}
      <div className={classes.pageLink}>
        <a href={urlNews}>
          <h3 className={classes.bold}>{title}</h3>
        </a>
      </div>
    </article>
  )
}

export default StoriesListsCardChildItem
