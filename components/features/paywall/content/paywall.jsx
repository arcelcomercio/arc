import Consumer from 'fusion:consumer'
import React from 'react'
import Wizard from 'react-step-wizard'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'
import Loading from '../_children/loading'
import * as S from './styled'
import { AddIdentity } from '../_dependencies/Identity'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div>Hola2</div>
}

@Consumer
class Content extends React.PureComponent {
  state = {
    spinning: true,
  }

  componentDidMount() {
    AddIdentity(this.props).then(() => {
      this.setState({ spinning: false })
    })
  }

  render() {
    const { spinning } = this.state
    return (
      <Loading spinning={spinning}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Content>
            <Wizard
              isHashEnabled
              nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
              <WizardPlan />
              <WizardUserProfile />
            </Wizard>
          </S.Content>
        </div>
      </Loading>
    )
  }
}

export default Content
