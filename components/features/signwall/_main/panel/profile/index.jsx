import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import GetProfile from '../../utils/get-profile'
import UpdateProfile from './update-profile'
import UpdatePass from './update-pass'
import { Wrapper } from '../../../_styles/common'
import Loading from '../../common/loading'

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
          <Loading site={arcSite} />
        )}
      </Wrapper>
    )
  }
}
export default MiPerfil
