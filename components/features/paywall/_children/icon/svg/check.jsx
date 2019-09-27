import React from 'react'

function Check({ width, height, fill = '#444' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <path
        d="M4.72 6.48L3.6 7.6l3.6 3.6 8-8-1.12-1.12L7.2 8.96zM14.4 8A6.4 6.4 0 1 1 8 1.6a6.239 6.239 0 0 1 1.76.24L11.04.56A9.737 9.737 0 0 0 8 0a8 8 0 1 0 8 8z"
        data-name="Trazado 694"
        fill={fill}
      />
    </svg>
  )
}

export default Check
