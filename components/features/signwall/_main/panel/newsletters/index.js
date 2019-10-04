import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { Wrapper, Button } from '../../../_styles/common'
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

    const UUID = window.Identity.userIdentity.uuid
    const SITE = 'gestion'
    const localNews = false

    // const localNews = JSON.parse(
    //   window.sessionStorage.getItem('preferencesNews')
    // )

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

  // eslint-disable-next-line class-methods-use-this
  // clickSendNewsLetters(e) {
  //   e.preventDefault()
  //   const { checksNews } = this.state
  //   this.setState({ disabled: true, textSave: 'GUARDANDO...' })

  //   const SITE = 'gestion'
  //   const EMAIL = window.Identity.userProfile.email
  //   const UUID = window.Identity.userIdentity.uuid
  //   const TOKEN_USER = `Bearer ${window.Identity.userIdentity.accessToken} ${SITE}`

  //   const filteredOBJ = Object.keys(checksNews).reduce((p, c) => {
  //     if (checksNews[c]) p[c] = checksNews[c]
  //     return p
  //   }, {})

  //   const updateNews = Object.keys(filteredOBJ)

  //   services
  //     .sendNewsLettersUser(UUID, EMAIL, SITE, TOKEN_USER, updateNews)
  //     .then(res => {
  //       this.setState({ showsuccess: true, textSave: 'GUARDAR' })
  //       window.sessionStorage.setItem(
  //         'preferencesNews',
  //         JSON.stringify(res.data.preferences)
  //       )
  //     })
  //     .catch(() => {
  //       this.setState({ disabled: false, textSave: 'GUARDAR' })
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         this.setState({ showsuccess: false })
  //       }, 3000)
  //     })
  // }

  setPreference = () => {
    const { arcSite } = this.props
    const { selectCategories } = this.state
    const UUID = window.Identity.userIdentity.uuid
    const EMAIL = window.Identity.userProfile.email
    const TOKEN_USER = window.Identity.userIdentity.accessToken

    services
      .sendNewsLettersUser(UUID, EMAIL, arcSite, TOKEN_USER, [
        ...selectCategories,
      ])
      .then(() => {
        if (this.newSetCategories) {
          this.newSetCategories = null
          this.setPreference()
        }
        setTimeout(() => {
          const modalConfirmPass = document.querySelector('#arc-popup-profile')
          modalConfirmPass.scrollIntoView()
        }, 500)
        this.setState({ showsuccess: true })
        // window.sessionStorage.setItem(
        //   'preferencesNews',
        //   JSON.stringify(response.data.preferences)
        // )
        setTimeout(() => {
          this.setState({ showsuccess: false })
        }, 3000)
      })
      .catch(err => {
        // if (
        //   err.status === false &&
        //   err.status_code === 401 &&
        //   err.message === 'Unauthorized'
        // ) {
        //   window.console.log('refresh')
        //   window.Identity.extendSession()
        //   this.setPreference()
        // }
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
    const {
      newsletters,
      loading,
      checksNews,
      // disabled,
      showsuccess,
      // textSave,
    } = this.state
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Wrapper>
        {!loading ? (
          <>
            <h4>Personaliza los correos que deseas recibir:</h4>

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
                    checked={checksNews[item.code]}
                    onChange={e => this.handleCheckbox(e, item.code)}
                    value={item.code}
                  />
                </label>
              ))}
              {/* <div className="content-butom">
                <Button
                  disabled={disabled}
                  type="button"
                  onClick={e => this.clickSendNewsLetters(e)}>
                  {textSave}
                </Button>
              </div> */}
            </div>
          </>
        ) : (
          <Loading site="gestion" />
        )}
      </Wrapper>
    )
  }
}

export { NewsLetter }
