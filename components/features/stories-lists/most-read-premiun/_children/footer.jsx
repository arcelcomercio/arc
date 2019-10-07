import React from 'react'

const classes = {
  footer: 'stories-l-footer flex justify-center items-center pt-15',
  seeMore:
    'stories-l-footer__link flex items-center uppercase text-gray-200 text-xs',
}

export default ({ seeMore, seeMoreurl }) => {
  return (
    <>
      {seeMore && (
        <div className={classes.footer}>
          <a href={seeMoreurl} className={classes.seeMore}>
            Ver más
          </a>
        </div>
      )}
    </>
  )
}
