import * as React from 'react'

const classes = {
  coupon: 'coupon',
  couponBgImage: 'coupon-bgimage',
  couponHead: 'coupon-head',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  couponText: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  couponLegal: 'coupon-legal',
}

enum DiscountType {
  Percentage = '%',
  Amount = 'S/',
}

interface Bonus {
  price: string
  points: string
}
interface CouponProps {
  code: string
  image?: string
  discount: string
  discountType: DiscountType
  title: string
  priceCencosud?: string
  bonus?: Bonus | null
  restrictions?: []
}

const SaleFloorCard: React.FunctionComponent<CouponProps> = ({
  code = '',
  image = '',
  discount = '',
  discountType = '',
  title = '',
  priceCencosud = '',
  bonus = null,
  restrictions = [],
}) => (
  <div className={`${classes.coupon} flip-card`}>
    <div className="flip-card-front">
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 'auto', width: '33%' }}>
          <img
            src={image}
            alt="logo"
            loading="lazy"
            style={{
              width: '100%',
              margin: '0 auto auto',
              paddingTop: '10px',
            }}
          />
        </div>
        <div style={{ margin: 'auto', width: '33%' }}>
          {discountType === 'S/' && (
            <p className={classes.couponAmount} style={{ color: 'black' }}>
              {discount}
            </p>
          )}
          {discountType === '%' && (
            <>
              <p className={classes.couponAmount} style={{ color: 'orange' }}>
                {discount}
              </p>
              <strong>
                <p className={classes.couponText}>DSCTO</p>
              </strong>
            </>
          )}
          {priceCencosud && (
            <>
              <p>{priceCencosud}</p>
              <img
                width="50px"
                src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/tarjeta-cencosud.png?v=1638398607"
                alt="cencosud"
              />
            </>
          )}
          {bonus && (
            <div style={{ display: 'flex' }}>
              <div>
                <p>{bonus.points}</p>
                <p>puntos</p>
              </div>
              <div>
                <span>S/{bonus.price}</span>
                <img
                  width="50px"
                  src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/puntos-bonus-black.png?v=1638398607"
                  alt="bonus"
                />
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            width: '1%',
            borderLeft: '1px #E46E23 solid',
            marginTop: 'auto',
            height: '135px',
            marginBottom: 'auto',
          }}>
          &nbsp;
        </div>
        <div
          style={{
            width: '33%',
            paddingTop: '15px',
            textAlign: 'start',
          }}>
          <strong className={classes.couponHead}>
            <h3 className={classes.couponTitle}>*{title}</h3>
          </strong>
          {restrictions.length > 0
            ? restrictions.map((restriction) => (
                <li key={restriction}>{restriction}</li>
              ))
            : null}
          <p className={classes.couponCode}>{code}</p>
          <p className={classes.couponDiscountTitle}>Código de promoción</p>
        </div>
      </div>
    </div>
  </div>
)

export default SaleFloorCard
