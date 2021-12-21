import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { NavbarDefaultChildrenSimple } from './_children/simple'
import { NavbarDefaultChildrenWithMenu } from './_children/with-menu'

interface Props {
  customFields:
    | {
        type: 'with-menu' | 'simple'
      }
    | any
}

const NavbarDefault: FC<Props> = ({ customFields }) => {
  if (customFields?.type === 'simple') {
    return <NavbarDefaultChildrenSimple />
  }

  return <NavbarDefaultChildrenWithMenu />
}

NavbarDefault.static = true

NavbarDefault.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf(['with-menu', 'simple']).tag({
      name: 'Tipo:',
      labels: {
        'with-menu': 'Navbar con menu',
        simple: 'Navbar simple',
      },
      defaultValue: 'with-menu',
    }),
  }),
}

export default NavbarDefault
