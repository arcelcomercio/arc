import React from 'react'

const classes = {
  footerhtml: 'most-read-homologated-footer__html flex justify-center items-center pt-15'
}

export default ({freeHTML}={}) => {
  return (
    <div className={freeHTML && classes.footerhtml}>
      {freeHTML && (
          <div
            className={classes.mrHTML}
            dangerouslySetInnerHTML={{ __html: freeHTML }}
          />
          )}
    </div>
  )
}