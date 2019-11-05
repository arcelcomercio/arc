import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { Wrapper } from '../../../_styles/common'
import Checkbox from './Checkbox'
import Loading from '../../common/loading'
import Services from '../../utils/services'

const services = new Services()

@Consumer
class NewsLetter extends Component {
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
    const localNews = false

    const listAllNews = { ...[] }

    services.getNewsLetters().then(resNews => {
      resNews[SITE].map(item => {
        listAllNews[item.code] = false
        return null
      })

      this.setState({
        newsletters: resNews[SITE] || [],
        checksNews: listAllNews,
      })

      if (localNews && localNews.length >= 1) {
        localNews.map(item => {
          this.setState(prevState => ({
            checksNews: {
              ...prevState.checksNews,
              [item]: true,
            },
            loading: false,
          }))

          return null
        })
      } else {
        services.getNewsLettersUser(UUID, SITE).then(res => {
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
      }
    })
  }

  setPreference = () => {
    const { arcSite } = this.props
    const { selectCategories } = this.state
    const UUID = window.Identity.userIdentity.uuid
    const EMAIL = window.Identity.userProfile.email

    window.Identity.extendSession().then(extSess => {
      services
        .sendNewsLettersUser(UUID, EMAIL, arcSite, extSess.accessToken, [
          ...selectCategories,
        ])
        .then(() => {
          if (this.newSetCategories) {
            this.newSetCategories = null
            this.setPreference()
          }
          setTimeout(() => {
            const modalConfirmPass = document.getElementById(
              'arc-popup-profile'
            )
            modalConfirmPass.parentNode.scrollTop = modalConfirmPass.offsetTop
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
      // eslint-disable-next-line react/jsx-filename-extension
      <Wrapper>
        {!loading ? (
          <>
            <h4>
              Selecciona los tipos de Newsletters que más te interesen para que
              los recibas en tu correo electrónico:
            </h4>

            {showsuccess && (
              <div className="msg-success">
                <span>&#10003;</span>OPCIONES ACTUALIZADAS
              </div>
            )}

            <div className="news-list">
              {newsletters.map(item => (
                <label className="item" key={item.code}>
                  <Checkbox
                    image={item.image}
                    name={item.name}
                    site={arcSite}
                    checked={checksNews[item.code]}
                    onChange={e => this.handleCheckbox(e, item.code)}
                    value={item.code}
                  />
                </label>
              ))}
            </div>
          </>
        ) : (
          <Loading site={arcSite} />
        )}
      </Wrapper>
    )
  }
}

export { NewsLetter }
