import * as React from 'react'

const classes = {
  coupon: 'coupon',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  couponText: 'coupon-discount',
  couponDiscountE: 'coupon-dsctoE',
  couponReason: 'coupon-reason',
  couponLimit: 'coupon-limit',
  couponLocal: 'coupon-local',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  couponLegal: 'coupon-legal',
  couponRestrictions: 'coupon-restrictions',
  separator: 'coupon-separator',
}
interface CouponProps {
  code: string
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
  code,
  discount,
  reason,
  limit,
  local,
  restrictions = null,
}) => (
  <div className={`${classes.coupon}`}>
    <div className="flex">
      <div className="coupon-first-column-ec justify-center items-center flex flex-col">
        <h3 className={classes.couponDiscountE}>
          {discount}
          <span>soles</span>
        </h3>
        <h3 className={classes.couponReason}>{reason}</h3>
        <h3 className={classes.couponLimit}>
          {limit}
          <span>soles</span>
        </h3>
        <h3 className={classes.couponLocal}>{local}</h3>
      </div>
      <div className="coupon-second-column-ec flex flex-col">
        {restrictions ? (
          <ul>
            <h3>Restricciones</h3>
            <li className={classes.couponRestrictions}>
              {restrictions.coupon}
            </li>
            <li className={classes.couponRestrictions}>
              {restrictions.ususNumber}
            </li>
            <li className={classes.couponRestrictions}>{restrictions.rules}</li>
          </ul>
        ) : null}

        <p className={classes.couponCode}>{code}</p>
        <p className={classes.couponDiscountTitle}>Código de promoción</p>
      </div>
    </div>
  </div>
)

export default ECommerceCard
