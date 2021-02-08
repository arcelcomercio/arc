import * as React from 'react'

import LinkListItem from './link-list-item'

function LinkList({
  items,
  isAmp = false,
}) {
  const classAmp = isAmp ? 'amp-' : ''
  const classes = {
    container: `${classAmp}story-content__link-list position-relative p-20 mb-20 mt-20 mr-20`,
    title: `${classAmp}story-content__link-list-title uppercase mb-20`,
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.title}>Mira también:</div>
      {items &&
        items.map(data => {
          const { url = '', content = '', image: { url: urlImg = '' } = {} } =
            data || {}
          return (
            <LinkListItem
              key={`link-list-${url}`}
              url={url}
              title={content}
              image={urlImg}
              isAmp={isAmp}
            />
          )
        })}
    </div>
  )
}

export default LinkList
