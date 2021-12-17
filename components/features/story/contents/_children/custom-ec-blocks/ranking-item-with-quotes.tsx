import * as React from 'react'

const classes = {
  ranking: 'ranking',
  topText: 'ranking__top-text',
  title: 'ranking__title',
  number: 'ranking__number',
  img: 'ranking__img',
  body: 'ranking__body',
  blockquote: 'pquote',
  titleQuote: 'pquote__title',
  author: 'pquote__author',
  authorText: 'pquote__author-text',
}

const StoryContentChildRankingItemWithQuotes: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { 
      embed: { 
        config: { 
          data: { topText = '', title = '', item: { author = '', img = '', number = '', text: itemText = '', title: itemTitle = '' } = {}, } = {}, 
        } = {}, 
      } = {}, 
    } = {},
  } = props

  return (
    <div className={classes.ranking}>
      {topText && <div className={classes.topText}>{topText}</div>}
      <div className={`${classes.title} ${img ? '' : 'mrg'}`}>{title}</div>
      {(img || number) &&
      <div className={classes.img}>
        {number && <div className={`${classes.number} ${img ? '' : 'pst'}`}>{number}</div>}
        {img && <img src={img} alt={itemTitle} />}
      </div>}
      <blockquote className={classes.blockquote}>
        <p className={classes.titleQuote}>
          {title}
        </p>
        {(author || itemText) && (<p>
          <span className={classes.author}>{author} </span><span className={classes.authorText}>{itemText}</span>
        </p>)}
      </blockquote>
    </div>
  )
}

export default StoryContentChildRankingItemWithQuotes