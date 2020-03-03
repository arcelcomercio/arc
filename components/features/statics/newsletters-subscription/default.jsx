/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Checkbox from './_children/item'
import Loading from '../../signwall/_children/loading'
import Services from '../../signwall/_dependencies/services'
import Domains from '../../signwall/_dependencies/domains'
import SubscriptionTitle from './_children/title'

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
    loading: true,
    disabled: true,
    showsuccess: false,
    textSave: 'GUARDAR',
    categories: null,
    selectCategories: new Set(),
    isFetching: false,
  }

  newSetCategories

  timeout

  componentDidMount() {
    const { selectCategories } = this.state
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

      Services.getNewsLettersUser(UUID, SITE).then(res => {
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
        this.setState({
          loading: false,
        })
      })
    })
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
          const modalConfirmPass = document.getElementById('profile-signwall')
          setTimeout(() => {
            if (modalConfirmPass) {
              modalConfirmPass.parentNode.scrollTop = modalConfirmPass.offsetTop
            }
          }, 500)
          this.setState({ showsuccess: true })
          setTimeout(() => {
            this.setState({ showsuccess: false })
          }, 3000)
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

  handleCheckbox(e, name) {
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
    const { newsletters, loading, checksNews, showsuccess } = this.state

    const { arcSite } = this.props

    return (
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
                  onChange={e => this.handleCheckbox(e, item.code)}
                  value={item.code}
                />
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default NewslettersSubscription
