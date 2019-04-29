import React, { Fragment } from 'react'

const classes = {
  title: 'infoAutor__title',
}
const TitleInfoAutor = ({title}) => {
  return (
    <Fragment>
      <h4 className={classes.title}>{title}</h4>
    </Fragment>
  )
}

export default TitleInfoAutor
