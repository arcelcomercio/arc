import React from 'react'
import { FormatClassName } from '../../resources/utilsJs/utilities'

const classes = FormatClassName({
  layout: ['flex', 'flex--justify-center'],
  contentContainer: ['flex', 'flex--column', 'content-layout-container'],
  mainContent: [
    'content-grid-base',
    'content-layout',
    'content--1col',
    'content--2col',
    'content--3col',
    'margin-top',
  ],
  zocalo: ['zocalo__container'],
})

const Basic = props => {
  const { children } = props

  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Nav */}
        {children[2] /* Header */}
        <div className={classes.mainContent}>{children[3] /* Content */}</div>
        {children[4] /* Footer */}
      </div>
      <div className={classes.zocalo}>{children[5] /* Zocalo izquierda */}</div>
    </div>
  )
}

Basic.sections = [
  'Zocalo izquierda',
  'Nav',
  'Header',
  'Contenido',
  'Footer',
  'Zocalo derecha',
]

export default Basic
