import React from 'react'

export default props => {
  const { iconClass, btnClass, btnText, btnLink, onClick } = props

  return (
    <a className={btnClass} href={btnLink} onClick={onClick}>
      {iconClass && <i className={iconClass} />}
      <span>{btnText}</span>
    </a>
  )
}
