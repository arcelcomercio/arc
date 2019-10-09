import React from 'react'

function CustomIcon({ theme }) {
  return (
    <svg width="36" height="46">
      <defs>
        <filter
          id="Trazado_683"
          x="0"
          y="0"
          width="36"
          height="46"
          filterUnits="userSpaceOnUse">
          <feOffset dx="-3" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodOpacity=".2" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#Trazado_683)">
        <path
          id="Trazado_683-2"
          data-name="Trazado 683"
          d="M62.055 0L58.65 3.267 69.839 14 58.65 24.733 62.055 28 76.65 14z"
          transform="translate(-46.65 9)"
          fill={theme.palette.primary.contrastText}
        />
      </g>
    </svg>
  )
}

export default CustomIcon
