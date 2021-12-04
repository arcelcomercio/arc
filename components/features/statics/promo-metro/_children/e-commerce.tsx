import * as React from 'react'

const classes = {
  coupon: 'coupon',
  couponBgImage: 'coupon-bgimage',
  couponHead: 'coupon-head',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  couponText: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponReason: 'coupon-reason',
  couponLimit: 'coupon-limit',
  couponLocal: 'coupon-local',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  couponLegal: 'coupon-legal',
  couponRestrictions: 'coupon-restrictions',
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
  <div className={`${classes.coupon} flip-card`}>
    <div className="flip-card-front">
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 'auto', width: '47%', textAlign: 'start' }}>
          <h3 className={classes.couponTitle}>{discount}</h3>
          <h3 className={classes.couponReason}>{reason}</h3>
          <h3 className={classes.couponLimit}>{limit}</h3>
          <h3 className={classes.couponLocal}>{local}</h3>
        </div>
        <div
          style={{
            width: '2%',
            borderLeft: '1px #E46E23 solid',
            marginTop: 'auto',
            height: '135px',
            marginBottom: 'auto',
          }}>
          &nbsp;
        </div>
        <div
          style={{
            width: '47%',
            paddingTop: '15px',
            textAlign: 'start',
          }}>
          <strong className={classes.couponHead}>
            {restrictions ? (
              <ul>
                <h3>**Restricciones</h3>
                <li className={classes.couponRestrictions}>
                  {restrictions.coupon}
                </li>
                <li className={classes.couponRestrictions}>
                  {restrictions.ususNumber}
                </li>
                <li className={classes.couponRestrictions}>
                  {restrictions.rules}
                </li>
              </ul>
            ) : null}
          </strong>
          <p className={classes.couponCode}>{code}</p>
          <p className={classes.couponDiscountTitle}>Código de promoción</p>
        </div>
      </div>
    </div>
  </div>
)

export default ECommerceCard
