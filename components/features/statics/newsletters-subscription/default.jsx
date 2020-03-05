/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Checkbox from './_children/item'
import Loading from '../../signwall/_children/loading'
import Services from '../../signwall/_dependencies/services'
import Domains from '../../signwall/_dependencies/domains'
import SubscriptionTitle from './_children/title'
import { Generic } from '../../signwall/main/_main/generic'

const classes = {
  container:
    'newsletters-subscription grid--col-1 grid--col-2 grid--col-3 col-3',
  list: 'newsletters-subscription__list grid w-full m-0 mx-auto',
}

@Consumer
class NewslettersSubscription extends Component {
  state = {
    newsletters: [],
    checksNews: {},
    loading: false,
    disabled: true,
    showsuccess: false,
    textSave: 'GUARDAR',
    categories: null,
    selectCategories: new Set(),
    isFetching: false,
    showSignwall: false,
    lastItemSelected: null,
  }

  newSetCategories

  timeout

  componentWillMount() {
    this.removeEventListener('logged', this.afterLoggued)
    this.removeEventListener('protect', this.protectRefresh)
    this.removeEventListener('unprotect', this.unProtectRefresh)
  }

  componentDidMount() {
    this.loadSetting()
    this.addEventListener('logged', this.afterLoggued)
    this.addEventListener('protect', this.protectRefresh)
    this.addEventListener('unprotect', this.unProtectRefresh)
  }

  handleLeavePage = e => {
    const confirmationMessage = '¿Deseas volver a argar el sitio?'
    e.returnValue = confirmationMessage
    return confirmationMessage
  }

  protectRefresh = () => {
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  unProtectRefresh = () => {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  afterLoggued = () => {
    this.loadSetting()
    // remover queryString signLanding temporal hasta lamar a la libreria QueryStrings de Singwall
    const url = window.location.href.split('signNewsletters=')
    window.history.pushState(null, null, url[0])
  }

  setPreference = () => {
    const { arcSite } = this.props
    const { selectCategories } = this.state
    const UUID = window.Identity.userIdentity.uuid
    const EMAIL = window.Identity.userProfile.email

    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.extendSession().then(extSess => {
      Services.sendNewsLettersUser(UUID, EMAIL, arcSite, extSess.accessToken, [
        ...selectCategories,
      ])
        .then(() => {
          if (this.newSetCategories) {
            this.newSetCategories = null
            this.setPreference()
          }
          // this.setState({ showsuccess: true })
          // setTimeout(() => {
          //   this.setState({ showsuccess: false })
          // }, 3000)
          this.dispatchEvent('unprotect')
        })
        .catch(e => {
          window.console.error(e)
        })
    })
  }

  debounce = () => {
    const { isFetching } = this.state
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (!isFetching) {
        this.setPreference()
      } else {
        this.newSetCategories = true
      }
    }, 1000)
  }

  checkSession = () => {
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

  loadSetting = () => {
    this.setState({
      loading: true,
    })

    const { selectCategories, lastItemSelected } = this.state
    const { arcSite } = this.props

    const UUID = window.Identity.userIdentity.uuid
    const SITE = arcSite

    const listAllNews = { ...[] }

    Services.getNewsLetters().then(resNews => {
      resNews[SITE].map(item => {
        listAllNews[item.code] = false
        return null
      })

      this.setState({
        newsletters: resNews[SITE] || [],
        checksNews: listAllNews,
      })

      Services.getNewsLettersUser(UUID, SITE)
        .then(res => {
          if (res.data.length >= 1) {
            res.data.map(item => {
              this.setState(prevState => ({
                checksNews: {
                  ...prevState.checksNews,
                  [item]: true,
                },
                loading: false,
              }))
              selectCategories.add(item)
              return null
            })
          }

          if (lastItemSelected && !selectCategories.has(lastItemSelected)) {
            selectCategories.add(lastItemSelected)
            this.setPreference()
            window.scrollTo(0, 100)
            setTimeout(() => {
              this.loadSetting()
              window.scrollTo(0, 0)
            }, 1000)
          }
        })
        .finally(() => {
          this.setState({
            loading: false,
          })
        })
    })
  }

  getUrlParam = name => {
    const vars = {}
    if (typeof window !== 'undefined')
      window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => {
          vars[key] = value
        }
      )
    return vars[name]
  }

  handleCheckbox(e, name) {
    this.dispatchEvent('protect')

    const newState = { ...this.state }
    newState.checksNews[name] = e.target.checked
    this.setState(newState)
    this.setState({ disabled: false, showsuccess: false })

    const { selectCategories } = this.state
    if (e.target.checked) {
      selectCategories.add(e.target.value)
    } else {
      selectCategories.delete(e.target.value)
    }
    this.debounce([...selectCategories])
  }

  render() {
    const {
      newsletters,
      loading,
      checksNews,
      showsuccess,
      showSignwall,
    } = this.state

    const { arcSite } = this.props

    return (
      <>
        <div className={classes.container}>
          <SubscriptionTitle />

          {showsuccess && (
            <div className="msg-success">
              <span>&#10003;</span>OPCIONES ACTUALIZADAS
            </div>
          )}

          {loading ? (
            <Loading arcSite={arcSite} typeBg="wait" />
          ) : (
            <div role="list" className={classes.list}>
              {newsletters.map(item => (
                <label className="item" key={item.code}>
                  <Checkbox
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    site={arcSite}
                    checked={checksNews[item.code]}
                    onChange={e => {
                      if (this.checkSession()) {
                        this.handleCheckbox(e, item.code)
                      } else {
                        this.setState({
                          showSignwall: !showSignwall,
                          lastItemSelected: item.code,
                        })
                      }
                    }}
                    value={item.code}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {(this.getUrlParam('signNewsletters') || showSignwall) && (
          <Generic
            onClose={() => this.setState({ showSignwall: false })}
            arcSite={arcSite}
            typeDialog="newsletter"
            onLogged={() => {
              this.dispatchEvent('logged')
            }}
          />
        )}
      </>
    )
  }
}

export default NewslettersSubscription
