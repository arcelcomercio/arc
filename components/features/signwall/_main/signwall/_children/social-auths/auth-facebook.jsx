import React from 'react'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import { Facebook } from '../../../common/iconos'
import GetProfile from '../../../utils/get-profile'
import Cookie from '../../../utils/cookie'
import getDevice from '../../../utils/get-device'
import Services from '../../../utils/services';

const Cookies = new Cookie()
const services = new Services()

@Consumer
class AuthFacebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedFB: true,
      sendingFbText: 'Facebook',
    }

    const { typePopUp = '', typeForm = '' } = props;
    this.tipCat = typePopUp;
    this.tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : '';
    this.tipForm = typeForm;
    // log(this.tipCat, this.tipAct, this.tipForm);

    window.removeEventListener('message', this.OAuthFacebook);
    window.removeEventListener('onmessage', this.OAuthFacebook);
  }

  componentDidMount = () => {
    const {
      siteProperties: {
        signwall: { ORIGIN_API } = {},
      } = {},
    } = this.props;
  
    if (window.Identity && window.Identity.apiOrigin === '') {
      window.Identity.apiOrigin = ORIGIN_API
    }

    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    const eventer = window[eventMethod];
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
    eventer(messageEvent, this.OAuthFacebook);
  }

  componentWillUnmount = () => {
    window.removeEventListener('message', this.OAuthFacebook);
    window.removeEventListener('onmessage', this.OAuthFacebook);
  };

  clickLoginFacebookEcoID = () => {
    const {
      siteProperties: {
        signwall: { ORIGIN_ECOID } = {},
      } = {},
    } = this.props;

    const width = 780;
    const height = 640;
    const left = window.screen.width / 2 - 800 / 2;
    const top = window.screen.height / 2 - 600 / 2;
    const url = `${ORIGIN_ECOID}/mpp/facebook/login/`;
    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
    );
  };

  OAuthFacebook = data => {

    const {
      siteProperties: {
        signwall: { ORIGIN_API, ORIGIN_ECOID } = {},
      } = {},
    } = this.props;


    if (data.origin !== ORIGIN_ECOID) {
      return;
    }
    this.setState({
      loadedFB: false,
      sendingFbText: 'Cargando...',
    });

    if (window.Identity && window.Identity.apiOrigin === '') {
      window.Identity.apiOrigin = ORIGIN_API
    }

    services
      .loginFBeco('', data.data.accessToken, 'facebook')
      .then(resLoginFb => {
        if (resLoginFb.accessToken) {
          this.setState({
            sendingFbText: 'Ingresando...',
          });

          window.localStorage.setItem(
            'ArcId.USER_INFO',
            JSON.stringify(resLoginFb),
          );

          window.Identity.userIdentity = resLoginFb;

          window.Identity.getUserProfile()
            .then(resFbProfile => {
              this.setState({
                sendingFbText: 'Cargando perfil...',
              });

              window.localStorage.setItem(
                'ArcId.USER_PROFILE',
                JSON.stringify(resFbProfile),
              );

              const EmailUserProfile = resFbProfile.email
                ? resFbProfile.email
                : `${resFbProfile.identities[0].userName}@facebook.com`;

              if (resFbProfile.displayName === null) {

                const originAction = document.querySelector('#arc-popup-signwallhard')
                ? 1
                : this.tipForm === 'relogin'
                ? 'relogin'
                : 0;

                const newProfileFB = {
                  firstName: resFbProfile.firstName.replace(/\./g, ''),
                  lastName: resFbProfile.lastName.replace(/\./g, ''),
                  displayName: EmailUserProfile,
                  email: EmailUserProfile,
                  attributes: [
                    {
                      name: 'originDomain',
                      value: window.location.hostname,
                      type: 'String',
                    },
                    {
                      name: 'originReferer',
                      value: window.location.href,
                      type: 'String',
                    },
                    {
                      name: 'originMethod',
                      value: '2',
                      type: 'String',
                    },
                    {
                      name: 'originDevice',
                      value: getDevice(window),
                      type: 'String',
                    },
                    {
                      name: 'originAction',
                      value: originAction,
                      type: 'String',
                    },
                  ],
                };

                window.Identity.userProfile = newProfileFB;
                window.Identity.updateUserProfile(newProfileFB); // update profile add attibutes

                if (EmailUserProfile) {
                  Cookies.setCookie('arc_e_id', sha256(EmailUserProfile), 365);
                }

                this.taggeoSuccess(); // -- test de tageo success REGISTRO
                this.enterProfilePanel();
                
              } else {

                if (EmailUserProfile) {
                  Cookies.setCookie('arc_e_id', sha256(EmailUserProfile), 365);
                }

                this.taggeoSuccess(); // -- test de tageo  success LOGIN
                this.enterProfilePanel();
               
              }
            })
            .catch(errFbProfile => {
              console.error(errFbProfile);
              this.taggeoError(); // -- test de tageo error
            });
        } else {
          console.error(resLoginFb);
          this.taggeoError(); // -- test de tageo error
          this.props.closePopup();
        }
      })
      .catch(errLoginFb => {
        console.error(errLoginFb);
        this.taggeoError(); // -- test de tageo error
      });
  };

  taggeoSuccess = () => {
    switch (this.tipCat) {
      case 'organico':
      case 'hard':
        window.dataLayer.push({
          event: `${this.tipForm}_fb_success`,
          eventCategory: `Web_Sign_Wall_${this.tipCat}`,
          eventAction: `${this.tipAct}_${this.tipForm}_success_facebook`,
        });
        break;
      case 'relogin':
        window.dataLayer.push({
          event: 'relogin_fb_success',
        });
        break;
      case 'relogemail':
        if (this.tipForm === 'login') {
          window.dataLayer.push({
            event: 'relogin_email_fb_success',
          });
        } else if (this.tipForm === 'register') {
          window.dataLayer.push({
            event: 'relogin_email_registro_fb_success',
          });
        }
        break;
      default:
        return null
    }
  };

  taggeoError = () => {
     switch (this.tipCat) {
      case 'organico':
      case 'hard':
        window.dataLayer.push({
          event: `${this.tipForm}_fb_error`,
          eventCategory: `Web_Sign_Wall_${this.tipCat}`,
          eventAction: `${this.tipAct}_${this.tipForm}_error_facebook`,
        });
        break;
      case 'relogin':
        window.dataLayer.push({
          event: 'relogin_fb_error',
        });
        break;
      case 'relogemail':
        if (this.tipForm === 'login') {
          window.dataLayer.push({
            event: 'relogin_email_fb_error',
          });
        } else if (this.tipForm === 'register') {
          window.dataLayer.push({
            event: 'relogin_email_registro_fb_error',
          });
        }
        break;
      default:
        return null;
    }
  };

  render = () => {
    const { id, align } = this.props
    const { sendingFb, loadedFB , sendingFbText} = this.state

    return (
      <>
        <button
          type="button"
          name="facebook"
          id={id}
          className={`btn btn-facebook ${align}`}
          onClick={this.clickLoginFacebookEcoID}
          disabled={sendingFb || !loadedFB}>
          <Facebook />
          <span>{sendingFbText}</span>
        </button>
      </>
    )
  }

  enterProfilePanel = () => {
    const { closePopup } = this.props;
    Cookies.deleteCookie('mpp_sess'); // borra session MPP
    // setTimeout(() => {
    //   window.sessUser.setState({ accessPanel: true });
    //   window.nameUser.setState({ nameUser: new GetProfile().username });
    //   window.initialUser.setState({ initialUser: new GetProfile().initname,});
    // }, 500);
   closePopup();
  };

}

export default AuthFacebook
