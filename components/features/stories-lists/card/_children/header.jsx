import React from 'react'

const classes = {
  header: 'stories-list-card__header flex flex--justify-between flex--align-center pd-top-10 pd-bottom-10 pd-left-20 pd-right-20',
  seeMore: 'stories-list-card__see-more btn btn--primary',
  title: 'stories-list-card__title flex-center-vertical text-uppercase',
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
