import Consumer from 'fusion:consumer'
import React from 'react'
import Wizard from 'react-step-wizard'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div>Ayuda</div>
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
    const { siteProperties } = this.props
    AddIdentity(siteProperties).then(() => {
      userProfile(['documentNumber', 'mobilePhone', 'documentType']).then(
        profile => {
          this.setState({ profile })
        }
      )
    })
  }

  render() {
    const { data, profile } = this.state
    const { summary = {}, plans } = data

    const {
      contextPath,
      deployment,
      siteProperties: { assets },
    } = this.props
    const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <S.Content>
          <Wizard
            isLazyMount
            isHashEnabled
            nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
            <WizardPlan plans={plans} summary={summary} assets={fullAssets} />
            <WizardUserProfile profile={profile} summary={summary} />
            <WizardPayment summary={summary} />
            <WizardConfirmation assets={fullAssets} />
          </Wizard>
        </S.Content>
      </div>
    )
  }
}

export default Content
