import * as React from 'react'
import { PaywallCampaign } from 'types/subscriptions'

import { frequencies } from '../../../../../utilities/subscriptions/sales'
import { AuthContextValue, PlanBilling } from '../../../_context/auth'

const styles = {
  btnDetail: 'step__bottom-btn-detail',
  iconUp: 'icon-arrow-up',
}

/**
 * Esta function se hizo para manejar mas
 * casos de precios sin tener que anidar ternarios.
 *
 * Se espera que el caso por defecto sea '' en lugar de undefined
 *
 * @returns Monto del plan como texto
 */
const getPlanAmount = (amount: number): string => {
  let planAmount = ''
  if (amount) planAmount = `S/ ${amount}.00`
  else if (amount === 0) planAmount = 'Gratis'
  return planAmount
}

interface MobileSummaryProps extends Pick<AuthContextValue, 'userStep'> {
  planName: PaywallCampaign['name']
  billingFrequency: PlanBilling['billingFrequency']
  billingAmount?: PlanBilling['amount']
}

const MobileSummary: React.FC<MobileSummaryProps> = ({
  userStep,
  planName,
  billingFrequency,
  billingAmount,
}) =>
  userStep !== 4 ? (
    <>
      {userStep !== 5 && (
        <section className="step__bottom">
          <button className={styles.btnDetail} type="button" id="btn-detail">
            <div>
              <span className="title-item">Resumen de pedido:</span>
              <h5 className="name-item">
                {planName}
                <span className="period-item">
                  {' - '}{' '}
                  {billingFrequency ? frequencies[billingFrequency] : ''}
                </span>
              </h5>
            </div>
            <div>
              <span className="price-item">
                {typeof billingAmount === 'number'
                  ? getPlanAmount(billingAmount)
                  : ''}
              </span>
              <i className={styles.iconUp} />
            </div>
          </button>
        </section>
      )}
    </>
  ) : null

export default React.memo(MobileSummary)
