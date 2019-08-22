import Consumer from 'fusion:consumer'
import React from 'react'
import Wizard from 'react-step-wizard'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import Icon from '../_children/icon'
import WizardPlan from './_children/wizard-plan'
import * as S from './styled'
import { AddIdentity, userProfile, isLogged } from '../_dependencies/Identity'
import WizardConfirmation from './_children/wizard-confirmation'
import WizardPayment from './_children/wizard-payment'
import Loading from '../_children/loading'
import PWA from './_dependencies/seed-pwa'
import '../_dependencies/sentry'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = ({ href }) => {
  return (
    <S.Button as="a" href={href} target="_blank" rel="noopener noreferrer">
      <span>
        ¿Necesitas ayuda?
        <Icon type="support" />
      </span>
    </S.Button>
  )
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
    const f = () => {
      userProfile(['documentNumber', 'phone', 'documentType']).then(profile => {
        this.setState({ profile })
      })
    }

    AddIdentity().then(() => {
      if (isLogged()) {
        f()
      }
    })
    document.querySelector('html').classList.add('ios')
    PWA.mount(() => window.location.reload())
  }

  onBeforeNextStepHandler = (response, { nextStep, currentStep }) => {
    Object.assign(this.memo, response)
    this.dispatchEvent('currentStep', currentStep)
    nextStep()
    window.scrollTo(0, 0)
  }

  setLoading = loading => {
    this.setState({
      loading,
    })
  }

  render() {
    const { profile, loading } = this.state
    const { globalContent } = this.props
    const { summary = [], plans = [], printed, error: message } = globalContent
    
    const {
      contextPath,
      deployment,
      siteProperties: {
        assets,
        paywall: { clickToCall },
      },
    } = this.props
    const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

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
            nav={
              <Nav
                stepsNames={_stepsNames}
                right={<Right href={clickToCall} />}
              />
            }>
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
