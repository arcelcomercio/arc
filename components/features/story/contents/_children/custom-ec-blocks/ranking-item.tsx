import * as React from 'react'

const classes = {
  ranking: 'ranking',
  topText: 'ranking__top-text',
  title: 'ranking__title',
  number: 'ranking__number',
  img: 'ranking__img',
  body: 'ranking__body',
}

const StoryContentChildRankingItem: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { 
      embed: { 
        config: { 
          data: { html = '', topText = '', title = '', item: { img = '', number = '', title: itemTitle = '', topText: itemTopText = ''} = {}, } = {}, 
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
      {itemTopText && <div className={classes.topText}>{itemTopText}</div>}
      {itemTitle && <div className={classes.title}>{itemTitle}</div>}
      {html !== '<p><br></p>' &&
      <div className={classes.body}>
        <p 
          dangerouslySetInnerHTML={{
            __html: html.trim()
          }}
        />
      </div>}
    </div>
  )
}

export default StoryContentChildRankingItem