import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  coupon: 'coupon',
  couponImage: 'coupon-image',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  quantity: 'coupon-quantity',
  percentage: 'coupon-percentage',
  imageCencosud: 'coupon-image-cencosud',
  priceCencosud: 'coupon-price-cencosud',
  textCencosud: 'coupon-text-cencosud',
  couponDscto: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  couponLegal: 'coupon-legal',
  separator: 'coupon-separator',
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
}) => {
  const { arcSite, contextPath } = useAppContext()

  const discountPartial = discount.split('x')

  return (
    <div className={`${classes.coupon} flex`}>
      <div className="coupon-first-column-sf flex flex-col justify-center">
        <img className="coupon-image" src={image} alt="logo" loading="lazy" />
        <p className={classes.couponTitle}>{title}</p>

        {restrictions.length > 0
          ? restrictions.map((restriction) => (
              <p
                style={{ fontSize: '10px', color: '#373736' }}
                key={restriction}>
                {restriction}
              </p>
            ))
          : null}
      </div>
      <div className="coupon-second-column-sf flex flex-col justify-center">
        {discountType === 'S/' ? (
          <>
            <p className={classes.couponAmount}>{discountPartial[0]}</p>
            {discountPartial[1] ? (
              <p className={classes.quantity}>x{discountPartial[1]}</p>
            ) : null}
          </>
        ) : null}
        {discountType === '%' ? (
          <div className="flex items-end justify-start">
            <p className={classes.couponAmount}>{discount}</p>
            <div className="flex items-center flex-col">
              <p className={classes.percentage}>%</p>
              <p className={classes.couponDscto}>DSCTO</p>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col">
          {priceCencosud && (
            <div className="justify-center flex items-end">
              <p className={classes.priceCencosud}>{priceCencosud}</p>
              <div className="flex flex-col">
                <p className={classes.percentage}>%</p>
                <p className={classes.couponDscto}>DSCTO</p>
              </div>
              <img
                className={classes.imageCencosud}
                src={`${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/tarjeta-cencosud.png?d=1`}
                alt="cencosud"
              />
              <p className={classes.textCencosud}>Tarjeta Cencosud</p>
            </div>
          )}
          {bonus && (
            <div
              style={{
                display: 'flex',
                paddingTop: '10px',
                justifyItems: 'center',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <div className="flex flex-col">
                <p
                  className="font-bold"
                  style={{
                    fontSize: '20px',
                    color: '#e06437',
                  }}>
                  {bonus.points}
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontSize: '10px',
                    color: '#e06437',
                  }}>
                  puntos
                </p>
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold"
                  style={{
                    fontSize: '13px',
                    color: '#e06437',
                  }}>
                  S/{bonus.price}
                </span>
                <img
                  width="40px"
                  src={`${getAssetsPath(
                    arcSite,
                    contextPath
                  )}/resources/dist/${arcSite}/images/puntos-bonus-color.png?d=1`}
                  alt="tarjeta bonus"
                />
              </div>
            </div>
          )}
          <p className={classes.couponCode}>{code}</p>
          <p className={classes.couponDiscountTitle}>Código de promoción</p>
        </div>
      </div>
    </div>
  )
}

export default SaleFloorCard
