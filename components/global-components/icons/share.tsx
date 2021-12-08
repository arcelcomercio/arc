import * as React from 'react';

interface ShareIconProps {
  fill?: string
  width?: string | number
  height?: string | number
}

const ShareIcon: React.FC<ShareIconProps> =({
  fill = "#333",
  width = "48",
  height = "48"
}) => <svg width={width} height={height} viewBox="0 0 48 48" fill="none"><path d="M1 24c0 4.411 3.589 8 8 8 2.117 0 4.032-.84 5.464-2.187l15.976 9.131c-.048.347-.107.693-.107 1.056 0 4.411 3.589 8 8 8s8-3.589 8-8-3.589-8-8-8c-2.117 0-4.032.84-5.464 2.187l-15.976-9.128c.048-.349.107-.696.107-1.059s-.059-.709-.107-1.059l15.976-9.128C34.301 15.16 36.216 16 38.333 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8c0 .363.059.709.107 1.059l-15.976 9.128A7.95 7.95 0 0 0 9 16c-4.411 0-8 3.589-8 8z" fill={fill}/></svg>



export default ShareIcon