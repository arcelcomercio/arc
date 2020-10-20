import React from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'

import { removeLastSlash } from '../../../utilities/parse/strings'
import { getAssetsPath } from '../../../utilities/assets'

const classes = {
  stickWrapper: 'stick w-full pl-20 pr-20 hidden',
  stick: `stick__content position-relative flex items-center justify-between p-10`,
  closeApp: `stick__close-app position-absolute icon-close text-white flex items-center justify-center`,
  logo: 'stick__logo',
  description: 'stick__description text-center pl-10 pr-10',
  logoLink: 'button-app',
  buttonApp: 'stick__button p-10 text-center',
}

const Stick = props => {
  const {
    customFields: {
      urlpwd = '',
      urlDev = '',
      apn = '',
      ibi = '',
      ipbi = '',
      isi = '',
      amv = '',
      imv = '',
    } = {},
  } = props

  const { contextPath, arcSite, globalContent } = useFusionContext()

  const { websites = {} } = globalContent || {}
  const { website_url: websiteLink = '/' } = websites[arcSite] || {}

  const {
    siteUrl = '',
    stick: { logo = 'default_logo.png' },
  } = getProperties(arcSite)

  const getUrlApp = ({ urlApp, currentLink, urlSource = '' }) => {
    const genUrl = new URL(currentLink)
    const appData = genUrl.pathname !== '/' ? `news${genUrl.pathname}` : '/'
    const link = `${currentLink}?appData=${appData}&apn=${apn}&amv=${amv}&ibi=${ibi}&ipfl=${currentLink}&ipbi=${ipbi}&isi=${isi}&imv=${imv}&efr=1${urlSource}`
    const url = `${removeLastSlash(urlApp)}/?link=${link}`
    return url
  }

  const activateStick = `
    (function(){window.addEventListener('load', function(){requestIdle(function(){
      var appStick = document.getElementById('appstick')
      var stickCookie = null
      var cookieValue = document.cookie.match('(^|;) ?idpoll_open_appstick_${arcSite}=([^;]*)(;|$)')
      if(!cookieValue || (cookieValue && cookieValue[2] !== '1'))
        appStick.classList.remove('hidden');
      var closeStick = document.getElementById('close-stick')
      closeStick.addEventListener('click', function(){
        var cookieDate = new Date()
        cookieDate.setTime(cookieDate.getTime() + 24 * 60 * 60 * 1000 * 7)
        document.cookie = 'idpoll_open_appstick_${arcSite}=1;path=/;expires='+cookieDate.toGMTString()+''
        appStick.classList.add('hidden');
      })
      var aOpenApp = document.getElementById('button-app')
      aOpenApp.addEventListener('click', function(e){
        e.preventDefault()    
        window.location.href = '${getUrlApp({
          urlApp: ENV.ENVIRONMENT === 'elcomercio' ? urlpwd : urlDev,
          currentLink: `${removeLastSlash(siteUrl)}${websiteLink}`,
          urlSource:
            ENV.ENVIRONMENT === 'elcomercio'
              ? '&utm_source=btn_openapp_note&mt=8&ct=btn_openapp_note'
              : '',
        })}'
      })
    })})})()`

  const imgLogo = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${logo}?d=1`

  return (
    <div id="appstick" className={classes.stickWrapper}>
      <div className={classes.stick}>
        <i
          id="close-stick"
          role="button"
          tabIndex={0}
          className={classes.closeApp}
        />
        <div className={classes.logo}>
          <img src={imgLogo} alt="Sigue actualizado en nuestra APP" />
        </div>
        <div className={classes.description}>
          Sigue actualizado en nuestra APP
        </div>
        <div
          className={classes.buttonApp}
          id="button-app"
          data-url-pwd={urlpwd}
          data-page-id={websiteLink}>
          Abrir en App
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: activateStick }}></script>
    </div>
  )
}

Stick.propTypes = {
  customFields,
}

Stick.label = 'Artículo - Abrir en App'
Stick.static = true

export default Stick
