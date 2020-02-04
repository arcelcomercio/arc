import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Loading from '../../../_children/loading'
import Domains from '../../../_dependencies/domains'
import addScriptAsync from '../../../_dependencies/script-async'
import Subs from '../resume/_children/subs'
import { Wrapper, ResumeDates, Title } from '../../styled'
import { ModalConsumer } from '../../../_children/context'
import { FormIntro } from '../../../main/_main/_children/form_intro'

@Consumer
class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isSubs: false,
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && !window.Sales) {
      addScriptAsync({
        name: 'sdkSalesARC',
        url: Domains.getScriptSales(),
      }).then(() => {
        this.getListSubs()
      })
    } else {
      this.getListSubs()
    }
  }

  getListSubs() {
    const { arcSite } = this.props
    if (typeof window !== 'undefined' && window.Sales && window.Identity) {
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      window.Identity.extendSession().then(() => {
        window.Sales.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
        window.Sales.getAllActiveSubscriptions()
          .then(res => {
            if (res.length > 0) {
              this.setState({
                isSubs: true,
              })
            }
            this.setState({
              loading: false,
            })
          })
          .catch(err => window.console.error(err))
      })
    }
  }

  render() {
    const { loading, isSubs } = this.state
    const {
      arcSite,
      siteProperties: {
        signwall: { primaryFont },
      },
    } = this.props

    return (
      <ModalConsumer>
        {value => (
          <Wrapper>
            {!loading ? (
              <>
                {isSubs ? (
                  <Subs detail={id => value.changeTemplate('detail', id)} />
                ) : (
                  <ResumeDates>
                    <div className="cont-plan">
                      <div className="first-plan">
                        <p>
                          Accede ilimitadamente a nuestro contenido, adquiere
                          el:
                        </p>
                        <Title s="40" f={primaryFont}>
                          Plan Digital
                        </Title>
                      </div>

                      <div className="last-plan">
                        <FormIntro
                          getContent={this.getContent.bind(this)}
                          arcSite={arcSite}
                          typeDialog="organico"
                        />
                      </div>
                    </div>
                  </ResumeDates>
                )}
              </>
            ) : (
              <Loading arcSite={arcSite} typeBg="wait" />
            )}
          </Wrapper>
        )}
      </ModalConsumer>
    )
  }
}
export default Subscription
