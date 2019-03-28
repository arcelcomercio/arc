import React from 'react'

const classes =
  'content--grid-base content-layout content--box content--1col content--2col content--3col col-3'

export default function ContentBox({ children }) {
  return <section className={classes}>{children}</section>
}
