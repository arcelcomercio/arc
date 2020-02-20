import React, { useState, useEffect, useCallback } from 'react'
import { useFusionContext } from 'fusion:context'
import Consumer from 'fusion:consumer'
import SubscriptionTitle from './_children/title'
import SubscriptionItem from './_children/item'
import Services from '../../signwall/_dependencies/services'
import Domains from '../../signwall/_dependencies/domains'
import { Generic } from '../../signwall/main/_main/generic'

const classes = {
  container:
    'newsletters-subscription grid--col-1 grid--col-2 grid--col-3 col-3',
  list: 'newsletters-subscription__list grid w-full m-0 mx-auto',
}

const Newsletters = props => {
  const { dispatchEvent, addEventListener, removeEventListener } = props
  const { arcSite } = useFusionContext()

  const [typeNewsletters, setTypeNewsletters] = useState([])
  const [categories, setCategories] = useState([])
  const [codeNewsletter, setCodeNewsletter] = useState('')
  const [showSignwall, setShowSignwall] = useState(false)

  let UUID = window.Identity.userIdentity
    ? window.Identity.userIdentity.uuid
    : ''
  let EMAIL = window.Identity.userProfile
    ? window.Identity.userProfile.email
    : ''

  const addOrRemoveNewslettersType = (
    code,
    categoriesNews,
    fromLoggued = false
  ) => {
    console.log('state categories', categories)
    console.log('categoriesNews', categoriesNews)
    const data = categoriesNews
    if (!data.includes(code)) {
      data.push(code)
    } else if (!fromLoggued) {
      data.splice(data.indexOf(code), 1)
    }
    console.log('data categories', data)
    return data || []
  }

  const subscribe = (code, categoriesNews, fromLoggued = false) => {
    console.log('subscribe code', code)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.extendSession().then(extSess => {
      Services.sendNewsLettersUser(
        UUID,
        EMAIL,
        arcSite,
        extSess.accessToken,
        addOrRemoveNewslettersType(code, categoriesNews, fromLoggued)
      ).then(res => {
        console.log('sendNewsLettersUser', res)
        setCategories(res.data.preferences || [])
        setCodeNewsletter('')
      })
    })
  }

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
    console.log('afterLoggued codeNewsletter', codeNewsletter)
    window.scrollTo(0, 100)
    setTimeout(() => {
      console.log('TO DO: FLOW NEWSLETTER 4', window.Identity.userProfile)
      window.scrollTo(0, 0)
      UUID =
        (window.Identity.userIdentity && window.Identity.userIdentity.uuid) ||
        ''
      EMAIL =
        (window.Identity.userProfile && window.Identity.userProfile.email) || ''

      console.log('data', UUID, EMAIL)
      Services.getNewsLettersUser(UUID, arcSite).then(res => {
        console.log('afterLoggued getNewsLettersUser', res)
        setCategories(res.data)
        subscribe(codeNewsletter, res.data, true)
      })
    }, 1000)
  }

  useEffect(() => {
    addEventListener('logged', afterLoggued)
    return () => {
      removeEventListener('logged', afterLoggued)
    }
  }, [afterLoggued])

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

  // const forceUpdate = useCallback(code => setCodeNewsletter(code), [])

  const subscribeOnclickHandle = code => {
    // setCodeNewsletter(prevCode => code)
    setCodeNewsletter(code)
    // forceUpdate(code)
    console.log('subscribeOnclickHandle code', code)
    console.log('subscribeOnclickHandle codeNewsletter', codeNewsletter)
    setTimeout(() => {
      console.log('subscribeOnclickHandle codeNewsletter 2', codeNewsletter)
    }, 500)
    if (checkSession()) {
      subscribe(code, categories)
    } else {
      console.log('no tiene session 2')
      setShowSignwall(!showSignwall)
    }
  }

  return (
    <>
      <div className={classes.container}>
        <SubscriptionTitle />
        <div role="list" className={classes.list}>
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
        dispatchEvent={this.dispatchEvent}
        addEventListener={this.addEventListener}
        removeEventListener={this.removeEventListener}
      />
    )
  }
}

NewslettersSubscription.label = 'Newsletter Suscripción - Página'
// NewsletterSubscription.static = true

export default NewslettersSubscription
