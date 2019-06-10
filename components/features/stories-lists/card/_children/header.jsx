import React from 'react'

const classes = {
  header: 'stories-list-card__header flex justify-between',
  seeMore: 'stories-list-card__see-more',
  title: 'stories-list-card__title flex items-center',
}
const StoriesListsCardChildHeader = ({
  titleList,
  urlTitle,
  background,
  seeMore,
  seeMoreurl,
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      {urlTitle ? (
        <a href={urlTitle} className={classes.title}>
          <h4>{titleList} </h4>
        </a>
      ) : (
        <h4 className={classes.title}>{titleList}</h4>
      )}
      {seeMore && (
        <a href={seeMoreurl} className={classes.seeMore}>
          <h4>ver más</h4>
        </a>
      )}
    </div>
  )
}

export default StoriesListsCardChildHeader
