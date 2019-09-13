import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'

const classes = {
  stickWrapper: 'stick hidden w-full pl-20 pr-20',
  stick:
    'stick__content position-relative flex items-center justify-between p-10',
  closeApp:
    'stick__close-app position-absolute icon-close text-white flex items-center justify-center',
  logo: 'stick__logo',
  description: 'stick__description text-center pl-10 pr-10',
  logoLink: 'button-app',
  buttonApp: 'stick__button p-10 text-center',
}
@Consumer
class Stick extends PureComponent {
  componentDidMount() {
    const {
      customFields: { urlpwd = ''} = {},
      arcSite
    } = this.props

    const aOpenAppClose = document.getElementById('close-app')
    const aOpenApp = document.getElementById('button-app')
    const dataPageId = aOpenApp.getAttribute('data-page-id') || '/'

    aOpenApp.addEventListener('click', function(ev) {
      ev.preventDefault()

      const urlpwdbase = `${urlpwd}/?link=https://${arcSite}.pe/`
      const appData = `?appData=/&apn=com.eeec.${arcSite}&amv=30&ibi=com.eeec.${arcSite}&ipbi=com.eeec.${arcSite}&isi=991197788&imv=31&ofl=HREF`
      const href = `&efr=1&utm_source=btn_openapp_home&mt=8&ct=btn_openapp_home`

      window.location.href = `${urlpwdbase}/?link=https://${arcSite}.pe/${
        window.location.pathname
      }?appData=/${dataPageId !== '/' && 'news'}${dataPageId}${appData}${
        window.location.href
      }${href}`

    })

    aOpenAppClose.addEventListener('click', function(ev) {
      ev.preventDefault()
      const stick = document.querySelector('.stick')
      stick.setAttribute('style', 'display: none')
    })
  }

  render() {
    const {
      globalContent,
      contextPath,
      arcSite,
      deployment,
      customFields: { urlPwd = '' } = {},
      siteProperties:{ stick:{logo = 'default_logo.png'}}
    } = this.props

    const { link } = new StoryData({
      data: globalContent,
      contextPath,
    })
    const imgLogo = deployment(
      `${contextPath}/resources/dist/${arcSite}/images/${logo}`
    )

    return (
      <div className={classes.stickWrapper}>
        <div className={classes.stick}>
          <a href="#" id="close-app" className={classes.closeApp} />
          <div className={classes.logo}>
            <a className={classes.logoLink}>
              <img src={imgLogo} />
            </a>
          </div>
          <div className={classes.description}>
            Sigue actualizado en nuestra APP
          </div>
          <a
            href=""
            className={classes.buttonApp}
            id="button-app"
            data-url-pwd={urlPwd}
            data-page-id={link}>
            Abrir en App
          </a>
        </div>
      </div>
    )
  }
}

Stick.propTypes = {
  customFields,
}

Stick.label = 'Artículo - Abrir en App'
// Stick.static = true

export default Stick