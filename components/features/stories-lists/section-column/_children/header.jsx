import React from 'react'

const classes = {
  header: `stories-l-header flex justify-between items-center w-auto pr-20 pl-20`,
  seeMore: `stories-l-header__see-more flex items-center bg-white pt-5 pb-5 pr-10 pl-10 text-gray-200 text-sm`,
  urlTitle: 'stories-l-header__title flex items-center full-height',
  title: 'text-gray-300 uppercase font-bold',
}
const StoriesListsCardChildHeader = ({
  titleList,
  background,
  urlTitle = '/',
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      {urlTitle ? (
        <a href={urlTitle} className={classes.urlTitle}>
          <h4 className={classes.title}>{titleList}</h4>
        </a>
      ) : (
        <h4 className={classes.title}>{titleList}</h4>
      )}
    </div>
  )
}

export default StoriesListsCardChildHeader
