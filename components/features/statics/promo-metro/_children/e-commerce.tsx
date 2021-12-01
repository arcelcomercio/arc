import * as React from 'react'

const classes = {
  coupon: 'coupon position-relative',
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

interface Coupon {
  code: string
  image?: string
  discount: number
  discountType: DiscountType
  title: string
  priceCencosud?: string
  bonus?: {
    price: string
    points: string
  }
  restrictions: []
}

const SaleFloorCard: React.FunctionComponent<Coupon> = ({
  code,
  image,
  discount,
  discountType,
  title,
  priceCencosud,
  bonus,
}) => (
  <li className={`${classes.coupon} flip-card`} key={code}>
    <div className="flip-card-front">
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 'auto', width: '47%' }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imagenes-4f708.appspot.com/o/Arroz-removebg-preview.png?alt=media&token=27b3ca10-eb09-4338-b155-94fb9e7960f4"
            alt="logo"
            loading="lazy"
            style={{
              width: '100%',
              margin: '0 auto auto',
              paddingTop: '10px',
            }}
          />
          <h3 className={classes.couponTitle}>{title}</h3>
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
            // margin: 'auto',
            width: '47%',
            paddingTop: '15px',
            textAlign: 'start',
          }}>
          <strong className={classes.couponHead}>
            <span className={classes.couponAmount}>{discount}</span>
            <span className={classes.couponType}>{discountType}</span>
          </strong>
          <strong>
            <p className={classes.couponText}>&nbsp;de descuento</p>
          </strong>
          <p className={classes.couponCode}>{code}</p>
          <p className={classes.couponDiscountTitle}>Código de promoción</p>
        </div>
      </div>
    </div>
  </li>
)

export default SaleFloorCard
