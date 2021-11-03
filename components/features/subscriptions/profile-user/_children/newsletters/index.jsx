/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import Identity from '@arc-publishing/sdk-identity'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import { extendSession } from '../../../../../utilities/subscriptions/identity'
import Loading from '../../../../signwall/_children/loading'
import {
  getNewsLetters,
  getNewsLettersUser,
  sendNewsLettersUser,
} from '../../../../signwall/_dependencies/services'
import Checkbox from './_children/checkbox'

const headers = {
  default:
    'Selecciona los tipos de Newsletters que más te interesen para que los recibas en tu correo electrónico:',
  diariocorreo:
    'Desactiva, recibir el boletín de noticias Correo Hoy, sino requieres recibirlo en tu correo electrónico:',
  trome:
    'Activa, recibir el boletín Café de noticias, si requieres recibirlo en tu correo electrónico:',
}

@Consumer
class NewsLetter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsletters: [],
      checksNews: {},
      loading: true,
      disabled: true,
      showsuccess: false,
      textSave: 'GUARDAR',
      categories: null,
      selectCategories: new Set(),
      isFetching: false,
      newSetCategories: null,
      timeout: null,
    }
  }

  componentDidMount() {
    const { selectCategories } = this.state
    const { arcSite } = this.props

    const UUID = Identity.userIdentity.uuid
    const SITE = arcSite

    const listAllNews = { ...[] }

    getNewsLetters().then((resNews) => {
      resNews[SITE].map((item) => {
        listAllNews[item.code] = false
        return null
      })

      this.setState({
        newsletters: resNews[SITE] || [],
        checksNews: listAllNews,
      })

      getNewsLettersUser(UUID, SITE).then((res) => {
        if (res.data.length >= 1) {
          res.data.map((item) => {
            this.setState((prevState) => ({
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

  setPreference = () => {
    const { arcSite } = this.props
    const { selectCategories } = this.state
    const UUID = Identity.userIdentity.uuid
    const EMAIL = Identity.userProfile.email

    extendSession().then((extSess) => {
      sendNewsLettersUser(UUID, EMAIL, arcSite, extSess.accessToken, [
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
        .catch((e) => {
          window.console.error(e)
        })
    })
  }

  render() {
    const { newsletters, loading, checksNews, showsuccess } = this.state
    const { arcSite } = this.props

    return (
      <div className="sign-profile_general-wrapper">
        {!loading ? (
          <>
            <h4>{headers[arcSite] || headers.default}</h4>

            {showsuccess && (
              <div className="msg-success">
                <span>&#10003;</span>OPCIONES ACTUALIZADAS
              </div>
            )}

            <div className="news-list">
              {newsletters.map((item) => (
                <label className="item" key={item.code}>
                  <Checkbox
                    image={item.image}
                    name={item.name}
                    arcSite={arcSite}
                    checked={checksNews[item.code]}
                    onChange={(e) => this.handleCheckbox(e, item.code)}
                    value={item.code}
                  />
                </label>
              ))}
            </div>
          </>
        ) : (
          <Loading typeBg="block" />
        )}
      </div>
    )
  }
}

export default NewsLetter
