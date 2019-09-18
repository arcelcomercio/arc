import React, { Component } from 'react'
import { Wrapper, Button } from './styles'
import Checkbox from './Checkbox'
import Loading from '../../common/loading'
import Services from '../../utils/services'

const services = new Services()

class NewsLetter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsletters: [],
      checksNews: {},
      loading: true,
      disabled: true,
      showsuccess: false,
      textSave: 'GUARDAR',
    }
  }

  componentDidMount() {
    // const UUID = 'f058d956-b390-43f2-88fa-e1694212c697' // JORGE
    const UUID = window.Identity.userIdentity.uuid
    const SITE = 'gestion'

    const localNews = JSON.parse(
      window.sessionStorage.getItem('preferencesNews')
    )

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
  clickSendNewsLetters(e) {
    e.preventDefault()
    const { checksNews } = this.state
    this.setState({ disabled: true, textSave: 'GUARDANDO...' })

    const SITE = 'gestion'
    const EMAIL = window.Identity.userProfile.email
    const UUID = window.Identity.userIdentity.uuid
    const TOKEN_USER = `Bearer ${window.Identity.userIdentity.accessToken} ${SITE}`

    const filteredOBJ = Object.keys(checksNews).reduce((p, c) => {
      if (checksNews[c]) p[c] = checksNews[c]
      return p
    }, {})

    const updateNews = Object.keys(filteredOBJ)

    services
      .sendNewsLettersUser(UUID, EMAIL, SITE, TOKEN_USER, updateNews)
      .then(res => {
        this.setState({ showsuccess: true, textSave: 'GUARDAR' })
        window.sessionStorage.setItem(
          'preferencesNews',
          JSON.stringify(res.data.preferences)
        )
      })
      .catch(() => {
        this.setState({ disabled: false, textSave: 'GUARDAR' })
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ showsuccess: false })
        }, 3000)
      })
  }

  handleCheckbox(e, name) {
    const newState = { ...this.state }
    newState.checksNews[name] = e.target.checked
    this.setState(newState)
    this.setState({ disabled: false, showsuccess: false })
  }

  render() {
    const {
      newsletters,
      loading,
      checksNews,
      disabled,
      showsuccess,
      textSave,
    } = this.state
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Wrapper>
        <h4>Personaliza los correos que deseas recibir:</h4>
        {showsuccess && (
          <div className="msg-success">OPCIONES ACTUALIZADAS</div>
        )}
        <div className="news-list">
          {!loading ? (
            newsletters.map(item => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label className="item" key={item.code}>
                <Checkbox
                  image={item.image}
                  name={item.name}
                  checked={checksNews[item.code]}
                  onChange={e => this.handleCheckbox(e, item.code)}
                />
              </label>
            ))
          ) : (
            <Loading site="gestion" />
          )}
          <div className="content-butom">
            <Button
              disabled={disabled}
              type="button"
              onClick={e => this.clickSendNewsLetters(e)}>
              {textSave}
            </Button>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export { NewsLetter }
