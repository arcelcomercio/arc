import React from 'react'

export default () => {
  return (
    <div className="spinner flex justify-center pt-30 pb-30">
      <svg
        className="spinner__svg"
        width="40px"
        height="40px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          className="spinner__circle"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"></circle>
      </svg>
    </div>
  )
}
