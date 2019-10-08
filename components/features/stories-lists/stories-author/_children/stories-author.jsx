import React from 'react'

const classes = {
  container: 'stories-author__container flex flex-col',
  itemMain: 'stories-author__item-main ',
  item: 'stories-author__item',
}
const StoriesAuthor = props => {
  const data = [1, 2, 3, 4]
  return (
    <div className={classes.container}>
      <div className={classes.itemMain}>
        <div>image</div>
        <div>author</div>
        <div>rol</div>
        <div>title</div>
      </div>
      {data.map((el, index) => {
        return (
          <div className={classes.item}>
            <div>image</div>
            <div>author</div>
            <div>title</div>
          </div>
        )
      })}
    </div>
  )
}

export default StoriesAuthor
