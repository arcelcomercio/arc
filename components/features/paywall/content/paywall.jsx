import Consumer from 'fusion:consumer'
import React, { Suspense } from 'react'
import Wizard from 'react-step-wizard'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import Loading from '../_children/loading'
import * as S from './styled'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div>Hola2</div>
}

@Consumer
class Content extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      profile: '',
    }
    this.fetch = this.fetch.bind(this)
    this.fetch()
  }

  // eslint-disable-next-line react/sort-comp
  fetch() {
    this.fetchContent({
      data: {
        source: 'paywall-campaing',
        query: { campaing: 'paywall-gestion-sandbox' },
      },
    })
  }

  componentDidMount() {
    AddIdentity(this.props).then(() => {
      userProfile(['documentNumber', 'mobilePhone', 'documentType']).then(
        profile => {
          this.setState({ profile })
        }
      )
    })
  }

  render() {
    const { spinning, data, profile } = this.state
    const { summary = {}, plans } = data
    console.log({ summary })
    const {
      contextPath,
      siteProperties: { assets },
    } = this.props

    return (
      <Loading spinning={false}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Content>
            <Wizard
              isLazyMount
              isHashEnabled
              nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
              <WizardPlan plans={plans} summary={summary} />
              <WizardUserProfile profile={profile} summary={summary} />
              <WizardConfirmation
                assets={assets.fullAssets.call(assets, contextPath)}
              />
            </Wizard>
          </S.Content>
        </div>
      </Loading>
    )
  }
}

export default Content
