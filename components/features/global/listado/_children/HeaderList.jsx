import React from 'react'

const classes ={
  header: 'List__Header',
  moreNews: 'List__morenews',
  title: 'List__title',
}
const HeaderList = ({
  titleList,
  urlTitle,
  background,
  seeMore,
  seeMoreurl,
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      <div className={classes.title}>
        {urlTitle ? (
          <a href={urlTitle}>
            <h4>{titleList} </h4>
          </a>
        ) : (
          <h4>{titleList}</h4>
        )}
      </div>
      {seeMore && (
        <div className={classes.moreNews}>
          <a href={seeMoreurl}>
            <h4>ver mas</h4>
          </a>
        </div>
      )}
    </div>
  )
}

export default HeaderList;