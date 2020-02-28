import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import Consumer from 'fusion:consumer'
import SubscriptionTitle from './_children/title'
import SubscriptionItem from './_children/item'
import Services from '../../signwall/_dependencies/services'
import Domains from '../../signwall/_dependencies/domains'
import { Generic } from '../../signwall/main/_main/generic'
import Loading from '../../signwall/_children/loading'

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
  const [showLoading, setShowLoading] = useState(true)

  const isFetching = false
  let newSetCategories
  let timeout

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
    const data = categoriesNews
    if (!data.includes(code)) {
      data.push(code)
    } else if (!fromLoggued) {
      data.splice(data.indexOf(code), 1)
    }
    return data || []
  }

  const subscribe = (code, categoriesNews, fromLoggued = false) => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.extendSession().then(extSess => {
      Services.sendNewsLettersUser(
        UUID,
        EMAIL,
        arcSite,
        extSess.accessToken,
        addOrRemoveNewslettersType(code, categoriesNews, fromLoggued)
      ).then(res => {
        if (newSetCategories) {
          newSetCategories = null
          subscribe(code, categoriesNews)
        }
        setCategories(res.data.preferences || [])
        setCodeNewsletter('')
      })
    })
  }

  const debounce = (codex, categoriesx) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (!isFetching) {
        subscribe(codex, categoriesx)
      } else {
        newSetCategories = true
      }
    }, 1000)
  }

  useEffect(() => {
    Services.getNewsLetters().then(res => {
      setTypeNewsletters(res[arcSite])
    })

    Services.getNewsLettersUser(UUID, arcSite).then(res => {
      setCategories(res.data)
      setShowLoading(false)
    })
  }, [])

  const afterLoggued = () => {
    setShowLoading(true)
    window.scrollTo(0, 100)
    setTimeout(() => {
      window.scrollTo(0, 0)
      UUID =
        (window.Identity.userIdentity && window.Identity.userIdentity.uuid) ||
        ''
      EMAIL =
        (window.Identity.userProfile && window.Identity.userProfile.email) || ''

      Services.getNewsLettersUser(UUID, arcSite).then(res => {
        setCategories(res.data)
        subscribe(codeNewsletter, res.data, true)
        setShowLoading(false)
      })
    }, 2000)
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

  const subscribeOnclickHandle = code => {
    setCodeNewsletter(code)
    if (checkSession()) {
      // subscribe(code, categories)
      debounce(code, categories)
    } else {
      setShowSignwall(!showSignwall)
    }
  }

  return (
    <>
      <div className={classes.container}>
        <SubscriptionTitle />
        {showLoading ? (
          <Loading arcSite={arcSite} typeBg="wait" />
        ) : (
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
        )}
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
