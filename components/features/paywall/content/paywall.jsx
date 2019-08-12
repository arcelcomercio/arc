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
import Loading from '../_children/loading'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div></div>
}

@Consumer
class Content extends React.Component {
  constructor(props) {
    super(props)
    this.memo = {}
    this.state = {
      profile: '',
      loading: false,
    }
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
    AddIdentity().then(() => {
      userProfile(['documentNumber', 'phone', 'documentType']).then(profile => {
        this.setState({ profile })
      })
    })
    document.querySelector('html').classList.add('ios')
    window.addEventListener('message', console.log)
  }

  onBeforeNextStepHandler = (response, { nextStep }) => {
    Object.assign(this.memo, response)
    nextStep()
  }

  setLoading = loading => {
    this.setState({
      loading,
    })
  }

  render() {
    const { profile, loading } = this.state
    const { globalContent } = this.props
    const { summary = [], plans, printed, error: message } = globalContent

    const {
      contextPath,
      deployment,
      siteProperties: { assets },
    } = this.props
    const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)
    // return <div>test</div>
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <S.Content>
          <Loading fullscreen spinning={loading} />
          <Wizard
            transitions={{
              enterRight: 'enterRight',
              enterLeft: 'enterLeft',
              exitRight: 'exitRight',
              exitLeft: 'exitLeft',
            }}
            isLazyMount
            nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
            <WizardPlan
              message={message}
              printed={!!printed}
              memo={this.memo}
              plans={plans}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              assets={fullAssets}
              setLoading={this.setLoading}
            />
            <WizardUserProfile
              memo={this.memo}
              profile={profile}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              setLoading={this.setLoading}
            />
            <WizardPayment
              memo={this.memo}
              printed={printed}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              setLoading={this.setLoading}
            />
            <WizardConfirmation
              memo={this.memo}
              assets={fullAssets}
              onBeforeNextStep={this.onBeforeNextStepHandler}
            />
          </Wizard>
        </S.Content>
      </div>
    )
  }
}

export default Content
