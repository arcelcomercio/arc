import Identity from '@arc-publishing/sdk-identity'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import { SITE_GESTION } from '../../../../../../utilities/constants/sitenames'
import Loading from '../../../../../signwall/_children/loading'
import {
  getNewsLetters,
  getNewsLettersUser,
} from '../../../../../signwall/_dependencies/services'

@Consumer
class NewsResume extends React.Component {
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

    if (typeof window !== 'undefined') {
      const UUID = Identity.userIdentity.uuid
      const SITE = arcSite

      const listAllNews = { ...[] }

      getNewsLetters().then((resNews) => {
        resNews[SITE].map((item) => {
          listAllNews[item.code] = false
          return null
        })

        if (this._isMounted) {
          this.setState({
            newsletters: resNews[SITE] || [],
            checksNews: listAllNews,
          })
        }

        getNewsLettersUser(UUID, SITE).then((res) => {
          if (res.data.length >= 1) {
            res.data.map((item) => {
              if (this._isMounted) {
                this.setState((prevState) => ({
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
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  activeNewsLetter = () => {
    document.getElementById('btn-newsletter').click()
  }

  render() {
    const { newsletters, checksNews, loading } = this.state
    const { news, arcSite } = this.props

    return (
      <>
        {arcSite === SITE_GESTION && (
          <div
            className="sign-profile_resume"
            style={{ padding: '0px', background: 'none' }}>
            {!loading ? (
              <>
                <div className="left">
                  <h3>Newsletters</h3>
                </div>
                <div className="right">
                  <div className="container-grid">
                    {newsletters.map(
                      (itemNews) =>
                        checksNews[itemNews.code] && (
                          <div className="item item1" key={itemNews.code}>
                            <img
                              src={itemNews.image}
                              alt={`img-${itemNews.code}`}
                            />
                          </div>
                        )
                    )}
                    <button
                      type="button"
                      className="add-item"
                      onClick={() => {
                        news()
                        this.activeNewsLetter()
                      }}>
                      <span className="icon-plus">&#43;</span>
                      Personaliza tus newsletters
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Loading typeBg="block" />
            )}
          </div>
        )}
      </>
    )
  }
}

export default NewsResume
