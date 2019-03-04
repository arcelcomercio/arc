import React from 'react'

const classes = {
  tripleteBoxIcon: 'triplete__box-icon',
  tripleteIcon: 'triplete__icon',
}
const Icon = props => {
  const html = (
    <span
      className={`${classes.tripleteBoxIcon}`}
    >
      <i className={`${classes.tripleteIcon} ${classes.tripleteIcon}--${props.iconClass}`} />
    </span>
  )
  return props.iconClass ? html : ''
}

export default Icon
