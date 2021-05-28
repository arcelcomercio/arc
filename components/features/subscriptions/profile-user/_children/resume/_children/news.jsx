import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Loading from '../../../../../signwall/_children/loading'
import {
  getNewsLetters,
  getNewsLettersUser,
} from '../../../../../signwall/_dependencies/services'
import { WrapperBlock } from '../styles'

@Consumer
class NewsResume extends Component {
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
      const UUID = window.Identity.userIdentity.uuid
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

  render() {
    const { newsletters, checksNews, loading } = this.state
    const { news, arcSite } = this.props

    return (
      <>
        {arcSite === 'gestion' && (
          <WrapperBlock nopadding nobackground nocolumn>
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
                            <img src={itemNews.image} alt="demo" />
                            <div className={`title title-${arcSite}`}>
                              {itemNews.name}
                            </div>
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
              <Loading arcSite={arcSite} typeBg="wait" />
            )}
          </WrapperBlock>
        )}
      </>
    )
  }
}

export default NewsResume
