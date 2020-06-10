import React from 'react'

const classes = {
  header: `sec-col__header flex items-center w-auto pr-20 pl-20 mb-5`,
  urlTitle: 'flex items-center full-height',
  title: 'sec-col__title uppercase font-bold',
}
const StoriesListsCardChildHeader = ({
  titleList,
  background,
  urlTitle = '/',
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      {urlTitle ? (
        <a itemProp="url" href={urlTitle} className={classes.urlTitle}>
          <h4 itemProp="name" className={classes.title}>
            {titleList}
          </h4>
        </a>
      ) : (
        <h4 itemProp="name" className={classes.title}>
          {titleList}
        </h4>
      )}
    </div>
  )
}

export default StoriesListsCardChildHeader
