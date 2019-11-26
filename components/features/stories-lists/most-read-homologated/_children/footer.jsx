import React from 'react'

const classes = {
  footer: 'most-read-homologated-footer flex justify-center items-center pt-15',
  seeMore:
    'most-read-homologated-footer__link flex items-center uppercase text-gray-200 text-xs',
}

export default ({ seeMore, seeMoreurl, freeHTML}) => {
  return (
    <>
      {seeMore && (
        <div className={classes.footer}>
          <a href={seeMoreurl} className={classes.seeMore}>
            Ver más
          </a>
        </div>
      )}
      {freeHTML && (
        <div
          className={classes.mrHTML}
          dangerouslySetInnerHTML={{ __html: freeHTML }}
        />
      )}
    </>
  )
}


// agregado freeHTML && ( div ...)