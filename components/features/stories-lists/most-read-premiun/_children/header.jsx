import React from 'react'

const classes = {
  header: `most-read-premium-header flex justify-between items-center w-auto pr-20 pl-20`,
  seeMore: `most-read-premium-header__see-more flex items-center bg-white pt-5 pb-5 pr-10 pl-10 text-gray-200 text-sm`,
  title:
    'most-read-premium-header__title flex items-center full-height text-gray-300 uppercase',
  icon: 'most-read-premium-header__icon icon-marca',
}
export default ({
  titleList,
  background,
  seeMore,
  urlTitle,
  seeMoreurl = '/',
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      {urlTitle ? (
        <a href={urlTitle} className={classes.title}>
          <h4>{titleList}</h4>
        </a>
      ) : (
        <h4 className={classes.title}>{titleList}</h4>
      )}
      {seeMore && (
        <a href={seeMoreurl} className={classes.seeMore}>
          Ver más
        </a>
      )}
      <i className={classes.icon} />{' '}
    </div>
  )
}
