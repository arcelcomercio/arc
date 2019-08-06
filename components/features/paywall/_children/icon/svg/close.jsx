import React from 'react'

function CustomIcon({ width, height, fill = '#444', ...props }) {
  return (
    <svg
      viewport="0 0 12 12"
      width="12px"
      height="12px"
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="11" x2="11" y2="1" stroke={fill} strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" stroke={fill} strokeWidth="2" />
    </svg>
  )
}

export default CustomIcon
