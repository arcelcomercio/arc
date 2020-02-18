import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import Consumer from 'fusion:consumer'
import SubscriptionTitle from './_children/title'
import SubscriptionItem from './_children/item'
import Services from '../../signwall/_dependencies/services'
import Domains from '../../signwall/_dependencies/domains'
import { Generic } from '../../signwall/main/_main/generic'

const Newsletters = props => {
  const { dispatchEvent, addEventListener, removeEventListener } = props
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const [typeNewsletters, setTypeNewsletters] = useState([])
  const [categories, setCategories] = useState([])
  const [showSignwall, setShowSignwall] = useState(false)

  const UUID = window.Identity.userIdentity
    ? window.Identity.userIdentity.uuid
    : ''
  const EMAIL = window.Identity.userProfile
    ? window.Identity.userProfile.email
    : ''

  useEffect(() => {
    Services.getNewsLetters().then(res => {
      setTypeNewsletters(res[arcSite])
      console.log('res', res)
      console.log('dataTypeNewsletters', typeNewsletters)
    })

    Services.getNewsLettersUser(UUID, arcSite).then(res => {
      console.log('getNewsLettersUser', res)
      setCategories(res.data)
    })
  }, [])

  const afterLoggued = () => {
    console.log('TO DO: FLOW NEWSLETTER')
    window.scrollTo(0, 100)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 500)
  }

  useEffect(() => {
    addEventListener('logged', afterLoggued)
    return () => {
      removeEventListener('logged', afterLoggued)
    }
  }, [])

  const addOrRemoveNewslettersType = code => {
    console.log('state categories', categories)
    const data = categories
    if (!data.includes(code)) {
      data.push(code)
    } else {
      data.splice(data.indexOf(code), 1)
    }
    console.log('data categories', categories)
    return data || []
  }

  const checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage =
        window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  const subscribeOnclickHandle = code => {
    if (checkSession()) {
      console.log('subscribeOnclickHandle code', code)
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      window.Identity.extendSession().then(extSess => {
        Services.sendNewsLettersUser(
          UUID,
          EMAIL,
          arcSite,
          extSess.accessToken,
          addOrRemoveNewslettersType(code)
        ).then(res => {
          console.log('sendNewsLettersUser', res)
          setCategories(res.data.preferences || [])
        })
      })
    } else {
      console.log('no tiene session')
      setShowSignwall(!showSignwall)
    }
  }

  return (
    <>
      <div className="content--grid-base content-layout grid--box grid--col-1 grid--col-2 grid--col-3 col-3">
        <SubscriptionTitle />
        <div role="main" className="newsletters-subscription">
          <div role="list" className="opinion-grid grid w-full m-0 mx-auto">
            {typeNewsletters.map(item => {
              const data = {
                ...item,
                isSubscribed: categories.includes(item.code),
                callbackSubscription: subscribeOnclickHandle,
              }
              return <SubscriptionItem key={item.code} {...data} />
            })}
          </div>
        </div>
      </div>

      {showSignwall && (
        <Generic
          onClose={() => setShowSignwall(!showSignwall)}
          arcSite={arcSite}
          typeDialog="newsletter"
          onLogged={() => {
            dispatchEvent('logged')
          }}
        />
      )}
    </>
  )
}

@Consumer
class NewslettersSubscription extends React.Component {
  render() {
    return (
      <Newsletters
        {...this.props}
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

NewslettersSubscription.label = 'Newsletter Suscripción - Página'
// NewsletterSubscription.static = true

export default NewslettersSubscription
