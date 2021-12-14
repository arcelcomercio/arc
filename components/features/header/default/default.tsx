import * as React from 'react'
import { FC } from 'types/features'

import { HeaderDefaultChildrenStandard } from './_children/standard'

const HeaderDefault: FC = () => {
  console.log('HeaderDefault')
  return <HeaderDefaultChildrenStandard />
}

export default HeaderDefault
