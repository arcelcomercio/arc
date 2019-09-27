import React from 'react'
import { withTheme } from 'styled-components'

function CustomIcon({
  theme,
  width = '42.427',
  height = '42.426',
  viewBox = '0 0 42.427 42.426',
}) {
  return (
    <svg width={width} height={height} viewBox={viewBox}>
      <g id="Grupo_606" data-name="Grupo 606" transform="translate(-603 -356)">
        <rect
          id="Rectángulo_824"
          data-name="Rectángulo 824"
          width="30"
          height="30"
          rx="4"
          transform="translate(624.213 356) rotate(45)"
          fill={theme.palette.primary.main}
        />
        <path
          id="Trazado_142"
          data-name="Trazado 142"
          d="M15.452,10.974h-5.6a2.46,2.46,0,0,1,.767.828c.125.222.2.354.214.394a1.848,1.848,0,0,1,.1.682v3.505l-.172.061H9.4a3.762,3.762,0,0,1-3.292-1.975A8.438,8.438,0,0,1,4.94,9.888a6.608,6.608,0,0,1,.824-3.5,4.623,4.623,0,0,1,3.8-2.076h.276a6.135,6.135,0,0,1,1.742.3,4.993,4.993,0,0,1,1.231.505l1,.586V2.225A13.672,13.672,0,0,0,9.724,1.71,10.2,10.2,0,0,0,2.9,4.185,7.8,7.8,0,0,0,0,10.342a7.907,7.907,0,0,0,2.994,6.475,10.424,10.424,0,0,0,6.792,2.238,21.975,21.975,0,0,0,3.276-.288,16.085,16.085,0,0,0,2.389-.475Z"
          transform="translate(616 366.665)"
          fill={theme.palette.primary.contrastText}
        />
      </g>
    </svg>
  )
}

export default withTheme(CustomIcon)
