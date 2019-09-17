import React, { Component } from 'react'

import GetProfile from '../../utils/get-profile'
import UpdateProfile from './update-profile'
import UpdatePass from './update-pass'

class MiPerfil extends Component {
  constructor(props) {
    super(props)
    const { publicProfile } = new GetProfile()
    const { identities = [] } = publicProfile
    const [identitie = { type: 'Password' }] = identities || []

    this.state = {
      disabledSocial: identitie.type !== 'Password',
    }
  }

  render() {
    const { disabledSocial } = this.state
    return (
      <>
        <UpdateProfile handlerUpdateName={this.handlerUpdateName} />
        <hr hidden={disabledSocial} />
        <div hidden={disabledSocial}>
          <UpdatePass />
        </div>
      </>
    )
  }
}
export default MiPerfil
