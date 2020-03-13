import React, { useEffect, useState } from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'

import { setSurveyCookie, getCookie } from '../../../utilities/client/cookies'
import { removeLastSlash } from '../../../utilities/parse/strings'
import { getAssetsPath } from '../../../utilities/assets'

const classes = {
  stickWrapper: 'stick w-full pl-20 pr-20',
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

  const { deployment, contextPath, arcSite, globalContent } = useFusionContext()

  const { websites = {} } = globalContent || {}
  const { website_url: websiteLink = '/' } = websites[arcSite] || {}

  const {
    siteUrl = '',
    stick: { logo = 'default_logo.png' },
  } = getProperties(arcSite)

  const [active, setActive] = useState(false)

  const closeStick = () => {
    setSurveyCookie(`_open_appstick_${arcSite}`, 7)
    setActive(false)
  }

  /*   const openStick = () => {
    setActive(true)
  } */

  const getUrlApp = ({ urlApp, currentLink, urlSource = '' }) => {
    const genUrl = new URL(currentLink)
    const appData = genUrl.pathname !== '/' ? `news${genUrl.pathname}` : '/'
    const link = `${currentLink}?appData=${appData}&apn=${apn}&amv=${amv}&ibi=${ibi}&ipfl=${currentLink}&ipbi=${ipbi}&isi=${isi}&imv=${imv}&efr=1${urlSource}`
    const url = `${removeLastSlash(urlApp)}/?link=${link}`
    return url
  }

  useEffect(() => {
    setActive(getCookie(`idpoll_open_appstick_${arcSite}`) !== '1')

    const aOpenApp = document.getElementById('button-app')
    // const dataPageId = aOpenApp.getAttribute('data-page-id') || '/'

    aOpenApp.addEventListener('click', e => {
      e.preventDefault()
      /*
        const urlpwdbase = `${urlpwd}/?link=https://${arcSite}.pe/`
        const appData = `?appData=/&apn=com.eeec.${arcSite}&amv=30&ibi=com.eeec.${arcSite}&ipbi=com.eeec.${arcSite}&isi=991197788&imv=31&ofl=HREF`
        const href = `&efr=1&utm_source=btn_openapp_home&mt=8&ct=btn_openapp_home`
  
        window.location.href = `${urlpwdbase}/?link=https://${arcSite}.pe/${
          window.location.pathname
        }?appData=/${dataPageId !== '/' && 'news'}${dataPageId}${appData}${
          window.location.href
        }${href}`
        */

      const urlApp = ENV.ENVIRONMENT === 'elcomercio' ? urlpwd : urlDev
      const urlSource =
        ENV.ENVIRONMENT === 'elcomercio'
          ? '&utm_source=btn_openapp_note&mt=8&ct=btn_openapp_note'
          : ''
      window.location.href = getUrlApp({
        urlApp,
        currentLink: `${removeLastSlash(siteUrl)}${websiteLink}`,
        urlSource,
      })
    })
  }, [])

  const imgLogo = deployment(
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}`
  )

  return (
    <div className={`${classes.stickWrapper} ${active ? 'block' : 'hidden'}`}>
      <div className={classes.stick}>
        <i
          role="button"
          tabIndex={0}
          className={classes.closeApp}
          onClick={closeStick}
          onKeyUp={closeStick}
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
    </div>
  )
}

Stick.propTypes = {
  customFields,
}

Stick.label = 'Artículo - Abrir en App'
// Stick.static = true

export default Stick
