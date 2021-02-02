import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../utilities/assets'
import getFooterProperties from '../../footer/_dependencies/properties'

import StoryFooter from './_lite/_children/story'

const LayoutFooter = () => {
  const { arcSite, contextPath } = useAppContext()

  const { assets: { footer: { logo } = {} } = {} } = getProperties(arcSite)

  const logoUrl =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` || ''

  const { footer: { story } = {} } = getFooterProperties(arcSite)

  return <StoryFooter story={story} logoUrl={logoUrl} arcSite={arcSite} />
}

LayoutFooter.label = 'Pie de Página'
LayoutFooter.static = true

export default LayoutFooter
