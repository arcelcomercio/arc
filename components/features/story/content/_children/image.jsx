import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image w-full h-full',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

<<<<<<< HEAD
const StoryContentChildImage = ({ data, imgTag }) => {
=======
const StoryContentChildImage = ({ data, imgTag, resizer = false }) => {
  const sizerImg = resizer ? 'original' : 'large'
>>>>>>> 3d809f6... Siguiente no Nota / footter
  return (
    <>
      <Image
        width="100%"
        layout="responsive"
        ImgTag={imgTag}
        imgClassName={classes.image}
        captionClassName={classes.caption}
        sizePreset={sizerImg}
        {...data}
      />
    </>
  )
}

export default StoryContentChildImage
