import React from 'react'

function CustomIcon({ width, height, fill = '#444' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 344 344">
      <path
        fill={fill}
        d="M48.4 291.5C79.7 323.8 123.5 344 172 344c94.8 0 172-77.2 172-172S266.8 0 172 0 0 77.2 0 172c0 45.2 17.6 86.4 46.2 117.1.6 1 1.4 1.7 2.2 2.4zM172 324.2c-37.4 0-71.8-13.6-98.3-36.1 44.6-14.8 61.1-32.8 67.2-44.8 8.5 3.7 18 5.7 28.5 5.8h2.3c11.4-.2 21.7-2.5 30.6-6.8 5.7 12 21.9 30.6 67.8 45.8-26.4 22.5-60.7 36.1-98.1 36.1zm-55.6-184v-.6c2.4-52.1 40.8-56.2 52.6-56.2h3.2c11.7 0 50.2 4.1 52.6 56.2v.6c.1.5 5 48.7-17.5 74-8.9 10-20.8 15-36.3 15.1h-.6c-15.6-.2-27.4-5.1-36.3-15.1-22.6-25.1-17.8-73.5-17.7-74zM172 19.8c83.9 0 152.2 68.3 152.2 152.2 0 38.4-14.4 73.6-37.9 100.4-64.6-18.8-67.1-41.6-67.1-41.9v.5h-.7c1.2-1.2 2.4-2.4 3.6-3.7 27.5-30.9 22.9-83.8 22.4-89-2.7-55.2-40.6-74.8-72.3-74.8H169c-31.7 0-69.7 19.6-72.3 74.8-.5 5.1-5 58 22.4 89 1.6 1.8 3.3 3.5 5 5.1-2.1 5.8-12.7 24.2-66.4 39.9-23.6-26.8-37.9-61.9-37.9-100.3C19.8 88.1 88.1 19.8 172 19.8z"
      />
    </svg>
  )
}

export default CustomIcon
