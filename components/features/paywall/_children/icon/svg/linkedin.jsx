import React from 'react'

function CustomIcon({ width, height, fill = '#444' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <g id="linkedin-logo" transform="translate(-.002)">
        <path
          id="LinkedIn__x28_alt_x29_"
          d="M18.525 0H1.48A1.456 1.456 0 0 0 0 1.433v17.133A1.456 1.456 0 0 0 1.48 20h17.045A1.456 1.456 0 0 0 20 18.566V1.433A1.455 1.455 0 0 0 18.525 0zM6.065 16.741H3.044V7.712h3.021zM4.555 6.478h-.02a1.565 1.565 0 1 1 .039-3.12 1.566 1.566 0 1 1-.019 3.12zm12.4 10.263h-3.018V11.91c0-1.214-.438-2.042-1.53-2.042a1.65 1.65 0 0 0-1.55 1.1 2.018 2.018 0 0 0-.1.731v5.044h-3.02s.04-8.183 0-9.03h3.021v1.28A3 3 0 0 1 13.479 7.5c1.988 0 3.479 1.29 3.479 4.065v5.178zM10.738 9.02l.02-.029v.029z"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

export default CustomIcon
