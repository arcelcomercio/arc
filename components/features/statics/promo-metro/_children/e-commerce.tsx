import * as React from 'react'
import { ArcSite } from 'types/fusion'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  coupon: 'coupon flex',
  couponFirstColumn: 'coupon-first-column-ec justify-center flex flex-col',
  couponSecondColumn: 'coupon-second-column-ec flex flex-col justify-center',
  couponDiscountE: 'coupon-dsctoE',
  couponReason: 'coupon-reason',
  couponLimit: 'coupon-limit',
  couponLocal: 'coupon-local',
  couponDiscountTitle: 'coupon-discount-title',
  couponCodeEco: 'coupon-codeEco',
  titleRestriction: 'coupon-restriction-title',
  textRestriction: 'coupon-restriction-text',
  logoMetroPe: 'coupon-logo-metrope',
}
interface CouponProps {
  code: string
  discount: string
  reason: string
  limit: string
  local: string
  restrictions?: {
    ususNumber: string | null
    rules: string | null
  }
  contextPath: string
  arcSite: ArcSite
}
const ECommerceCard: React.FunctionComponent<CouponProps> = ({
  code = 'COUPONTROME129',
  discount,
  reason,
  limit,
  local,
  restrictions = null,
  contextPath,
  arcSite,
}) => (
  <li className={classes.coupon}>
    <div className={classes.couponFirstColumn}>
      <img
        src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/logo-metro-pe.png?d=1`}
        alt="metro.pe"
        className={classes.logoMetroPe}
        loading="lazy"
      />
      {restrictions ? (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className={classes.titleRestriction}>Restricciones</h3>
            <ul>
              <p className={classes.textRestriction}>
                &#8226; {restrictions.ususNumber} usos
              </p>
              <p className={classes.textRestriction}>
                &#8226; {restrictions.rules}
              </p>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
    <div className={classes.couponSecondColumn}>
      <h3 className={classes.couponDiscountE}>
        {discount}
        <span> soles</span>
      </h3>
      <h3 className={classes.couponReason}>{reason}</h3>
      <h3 className={classes.couponLimit}>
        {limit}
        <span> soles</span>
      </h3>
      <h3 className={classes.couponLocal}>{local}</h3>
      <div className="flex flex-col">
        <p className={classes.couponCodeEco}>{code}</p>
        <p className={classes.couponDiscountTitle}>Cupón</p>
      </div>
    </div>
  </li>
)

export default React.memo(ECommerceCard)
