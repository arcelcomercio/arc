import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  container: '',
}

const TriviasMainStart = ({
  title, 
  image,
  alt,
  start, 
}) => {
  return (
    <figure className=''>
      <Image 
        src={image}
        width={1170}
        height={373}
        sizes='(max-width: 360px) 360px, 1170px'
        alt={alt}
        className=''
        loading="eager"
      />
    </figure>
  )
}

export default TriviasMainStart
