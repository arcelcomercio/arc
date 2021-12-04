import * as React from 'react'

const classes = {
  coupon: 'coupon',
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
  discount: string
  reason: string
  limit: string
  local: string
  restrictions?: {
    coupon: string | null
    ususNumber: string | null
    rules: string | null
  }
}
const ECommerceCard: React.FunctionComponent<CouponProps> = ({
  discount,
  reason,
  limit,
  local,
  restrictions = null,
}) => (
  <div className={`${classes.coupon} flex`}>
    <div className="coupon-first-column-ec justify-center items-center flex flex-col">
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
    </div>
    <div className="coupon-second-column-ec flex flex-col">
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
            <img src="" alt="metro.pe" className={classes.logoMetroPe} />
          </div>
          <div className="flex flex-col">
            <p className={classes.couponCodeEco}>{restrictions.coupon}</p>
            <p className={classes.couponDiscountTitle}>Cupón</p>
          </div>
        </div>
      ) : null}
    </div>
  </div>
)

export default ECommerceCard
