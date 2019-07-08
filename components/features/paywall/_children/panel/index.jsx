import React from 'react'
import './panel.css'
import c from '../../_dependencies/tools'

const Panel = ({
  className = '',
  children,
  type = 'content',
  valing = null,
}) => {
  return (
    <div
      className={c([
        'panel',
        `panel--${type}`,
        valing,
        [className, className !== ''],
      ])}>
      {children}
    </div>
  )
}

export default Panel
