import React from 'react'
import Wizard from 'react-step-wizard'
import Consumer from 'fusion:consumer'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']
const PRODUCT_SKU = '02072019'
const CAMPAIGN = 'gestion-20190703'

const Right = () => {
  return <div>Hola2</div>
}

@Consumer
class Content extends React.PureComponent {
  state = {
    plans: [],
  }

  fetch = () => {
    this.fetchContent({
      plans: {
        source: 'retail-campaign',
        query: { campaign: CAMPAIGN },
        transform: campaign => {
          if (!campaign) throw new Error(`La campaña ${campaign} no existe`)
          const products = campaign.products || []
          const prod = products.find(p => p.sku === PRODUCT_SKU)
          if (!prod)
            throw new Error(
              `No existe el producto con SKU ${PRODUCT_SKU} en la campaña ${campaign}`
            )
          return (prod.pricingStrategies || []).map(strat => {
            try {
              strat = Object.assign({}, strat, {
                description: JSON.parse(strat.description),
              })
            } catch (e) {}
            if (!strat.rates || strat.rates.lenght === 0)
              throw new Error(`El plan ${strat.name}, no tiene precio inicial`)

            return {
              name: strat.name,
              priceCode: strat.priceCode,
              description: strat.description,
              summary: strat.summary,
              rates: strat.rates || [],
            }
          })
        },
      },
    })
  }
  componentDidMount() {
    this.fetch()
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 1120 }}>
          <Wizard nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
            <WizardPlan plans={this.state.plans} />
            <WizardUserProfile />
          </Wizard>
        </div>
      </div>
    )
  }
}
