import React, { Component } from 'react'
import UpdateProfile from './section/update-profile'
import UpdatePass from './section/update-pass'
// import UpdateEmail from './updateEmail';
// import DesactiveAcount from './desactiveAccount';

class PanelProfile extends Component {
  constructor(props) {
    super(props)
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    const profileLS = JSON.parse(localProfile)
    this.state = {
      disabledSocial:
        profileLS &&
        profileLS.identities &&
        profileLS.identities[0].type !== 'Password',
      // currentEmail: profileLS.email ? profileLS.email : '',
    }
  }

  componentWillUpdate = () => {
    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
    ModalProfile.style.overflow = 'auto'
  }

  render() {
    const { disabledSocial } = this.state
    return (
      <>
        <UpdateProfile />
        <hr hidden={disabledSocial} />
        {/* <UpdateEmail currentEmail={this.state.currentEmail} /> */}
        <div hidden={disabledSocial}>
          <UpdatePass />
        </div>
        {/* <DesactiveAcount /> */}
      </>
    )
  }
}

export default PanelProfile
