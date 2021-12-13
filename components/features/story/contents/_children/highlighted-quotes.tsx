import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  blockquote: 'pquote',
  title: 'pquote__title',
  img: 'pquote__img',
  author: 'pquote__author',
  authorText: 'pquote__author-text',
}

const StoryContentChildHighlightedQuotes: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { embed: { config: { data: { title = '', author = '', text: authorText = '', img = '' } = {}, } = {}, } = {}, } = {},
  } = props

  return (
    <blockquote className={classes.blockquote}>
      <p className={classes.title}>
        {title}
      </p>
      {(author || authorText) && (<p>
        <span className={classes.author}>{author} </span><span className={classes.authorText}>{authorText}</span>
      </p>)}
      {author}
      {img && 
      <Image
        src={img}
        data-src={img}
        width={70}
        height={73}
        alt={author}
        className={classes.img}
        loading="lazy"
      />}
    </blockquote>
  )
}

export default StoryContentChildHighlightedQuotes
