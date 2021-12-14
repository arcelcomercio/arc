import * as React from 'react'
import { FC } from 'types/features'

import { NavbarDefaultChildrenWithMenu } from './_children/with-menu'

const NavbarDefault: FC = () => {
  console.log('NavbarDefault')

  return <NavbarDefaultChildrenWithMenu />
}

export default NavbarDefault
