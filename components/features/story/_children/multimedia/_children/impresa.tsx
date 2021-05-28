import * as React from 'react'
import { FC } from 'types/features'

import Image from '../../../../../global-components/image'

const classes = {
  paperNav: 'paper-nav position-relative vv ',
  image: 'w-full ',
}
interface FeatureProps {
  url?: string
  subtitle?: string
}

const RenderRelatedContentImpresa: FC<FeatureProps> = (data) => {
  const url = data?.url || ''
  const subtitle = data?.subtitle || ''

  return (
    <figure className={classes.paperNav}>
      <Image
        src={url}
        width={617}
        height={637}
        sizes="(max-width: 360px) 320px, 617px"
        alt={subtitle}
        className={classes.image}
      />
    </figure>
  )
}
export default React.memo(RenderRelatedContentImpresa)
