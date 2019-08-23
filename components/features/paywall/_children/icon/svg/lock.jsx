import React from 'react'

function CustomIcon({ width, height, fill = '#444' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <g id="padlock_2_" data-name="padlock (2)" transform="translate(-52)">
        <g id="Grupo_495" data-name="Grupo 495" transform="translate(52)">
          <g id="Grupo_494" data-name="Grupo 494">
            <path
              id="Trazado_709"
              d="M69.059 9.18h-1.767V5.165a5.3 5.3 0 0 0-10.588 0V9.18h-1.763A2.939 2.939 0 0 0 52 12.109v9.961A2.939 2.939 0 0 0 54.941 25h14.118A2.939 2.939 0 0 0 72 22.07v-9.961a2.939 2.939 0 0 0-2.941-2.929zM58.665 5.165a3.336 3.336 0 0 1 6.667 0V9.18h-6.667zM70.039 22.07a.98.98 0 0 1-.98.977H54.941a.98.98 0 0 1-.98-.977v-9.961a.98.98 0 0 1 .98-.977h14.118a.98.98 0 0 1 .98.977z"
              fill={fill}
              data-name="Trazado 709"
              transform="translate(-52)"
            />
          </g>
        </g>
        <g
          id="Grupo_497"
          data-name="Grupo 497"
          transform="translate(60.186 13.946)">
          <g id="Grupo_496" data-name="Grupo 496">
            <path
              id="Trazado_710"
              d="M220.814 286a1.814 1.814 0 0 0-.982 3.338v2.152a.98.98 0 1 0 1.961 0v-2.15a1.813 1.813 0 0 0-.979-3.34z"
              fill={fill}
              data-name="Trazado 710"
              transform="translate(-219 -286)"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default CustomIcon
