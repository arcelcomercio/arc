import React from 'react'

const classes = {
  container: 'presidential-election-paginator',
  prev: 'presidential-election-paginator__prev',
  next: 'presidential-election-paginator__next',
  title: 'presidential-election-paginator__title',
}
export default ({ urlPrev = '', urlNext = '', title = '' }) => {
  return (
    <div className={classes.container}>
      <a className={classes.prev} href={urlPrev}>
        {'<'}
      </a>
      <span className={classes.title}>{title}</span>
      <a className={classes.next} href={urlNext}>
        {'>'}
      </a>
    </div>
  )
}
