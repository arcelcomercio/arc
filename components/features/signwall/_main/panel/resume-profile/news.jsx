import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { WrapperBlock } from './styles'
import Services from '../../utils/services'
import Loading from '../../common/loading'

const services = new Services()

@Consumer
class News extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      newsletters: [],
      checksNews: [],
      loading: true,
    }
  }

  componentDidMount() {
    this._isMounted = true
    const { arcSite } = this.props

    const UUID = window.Identity.userIdentity.uuid
    const SITE = arcSite
    const localNews = JSON.parse(
      window.sessionStorage.getItem('preferencesNews')
    )

    const listAllNews = { ...[] }

    services.getNewsLetters().then(resNews => {
      resNews[SITE].map(item => {
        listAllNews[item.code] = false
        return null
      })

      if (this._isMounted) {
        this.setState({
          newsletters: resNews[SITE] || [],
          checksNews: listAllNews,
        })
      }

      if (localNews && localNews.length >= 1) {
        localNews.map(item => {
          if (this._isMounted) {
            this.setState(prevState => ({
              checksNews: {
                ...prevState.checksNews,
                [item]: true,
              },
              loading: false,
            }))
          }

          return null
        })
      } else {
        services.getNewsLettersUser(UUID, SITE).then(res => {
          if (res.data.length >= 1) {
            res.data.map(item => {
              if (this._isMounted) {
                this.setState(prevState => ({
                  checksNews: {
                    ...prevState.checksNews,
                    [item]: true,
                  },
                  loading: false,
                }))
              }

              return null
            })
          }

          if (this._isMounted) {
            this.setState({
              loading: false,
            })
          }
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { newsletters, checksNews, loading } = this.state
    const { news, arcSite } = this.props
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <WrapperBlock nopadding nobackground nocolumn>
        {!loading ? (
          <>
            <div className="left">
              <h3>Newsletters</h3>
            </div>
            <div className="right">
              <div className="container-grid">
                {newsletters.map(
                  itemNews =>
                    checksNews[itemNews.code] && (
                      <div className="item item1" key={itemNews.code}>
                        <img src={itemNews.image} alt="demo" />
                        <div className="title">{itemNews.name}</div>
                      </div>
                    )
                )}
                <button
                  type="button"
                  className="add-item"
                  onClick={() => news()}>
                  <span className="icon-plus">&#43;</span>
                  Personaliza tus newsletters
                </button>
              </div>
            </div>
          </>
        ) : (
          <Loading site={arcSite} />
        )}
      </WrapperBlock>
    )
  }
}

export { News }
