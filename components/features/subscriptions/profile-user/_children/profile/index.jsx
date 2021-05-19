import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Loading from '../../../../signwall/_children/loading'
import GetProfile from '../../../../signwall/_dependencies/get-profile'
import { Wrapper } from '../../styled'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile'

@Consumer
class MiPerfil extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    const { publicProfile } = new GetProfile()
    const { identities = [] } = publicProfile
    const [identitie = { type: 'Password' }] = identities || []

    this.state = {
      disabledSocial: identitie.type !== 'Password',
      loading: true,
    }
  }

  componentDidMount() {
    this._isMounted = true

    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          loading: false,
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { disabledSocial, loading } = this.state
    const { arcSite } = this.props

    return (
      <Wrapper>
        {!loading ? (
          <>
            <UpdateProfile />
            <div className="space-40" />
            <div hidden={disabledSocial}>
              <UpdatePass />
            </div>
          </>
        ) : (
          <Loading arcSite={arcSite} typeBg="wait" />
        )}
      </Wrapper>
    )
  }
}

export default MiPerfil
