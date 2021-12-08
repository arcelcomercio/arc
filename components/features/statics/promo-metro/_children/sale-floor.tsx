import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  coupon: 'coupon',
  couponImage: 'coupon-image',
  couponAmountContainer: 'coupon-amount-container',
  couponAmount: 'coupon-amount',
  couponAmountPercent: 'coupon-amount-percent',
  quantity: 'coupon-quantity',
  percentage: 'coupon-percentage',
  cencosud: 'coupon-cencosud',
  codeCencosud: 'coupon-cencosud-code',
  imageCencosud: 'coupon-cencosud-image',
  priceCencosud: 'coupon-cencosud-price',
  percentageCencosud: 'coupon-cencosud-percentage',
  couponDsctoCencosud: 'coupon-cencosud-discount',
  textCencosud: 'coupon-cencosud-text',
  discountTitleCencosud: 'coupon-cencosud-discount-title',
  bonus: 'coupon-bonus',
  pointsBonus: 'coupon-bonus-points',
  textPointsBonus: 'coupon-bonus-text',
  imageBonus: 'coupon-bonus-image',
  priceBonus: 'coupon-bonus-price',
  couponDscto: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  separator: 'coupon-separator',
}

enum DiscountType {
  Percentage = '%',
  Amount = 'S/',
}

interface Cencosud {
  code: string
  price: string
}
interface Bonus {
  price: string
  points: string
}
interface CouponProps {
  code: string
  image?: string
  defaultImage?: string
  discount: string
  discountType: DiscountType
  title: string
  cencosud?: Cencosud | null
  bonus?: Bonus | null
  restrictions?: []
}
const SaleFloorCard: React.FunctionComponent<CouponProps> = ({
  code = '',
  image = '',
  defaultImage = '',
  discount = '',
  discountType = '',
  title = '',
  cencosud = null,
  bonus = null,
  restrictions = [],
}) => {
  const { arcSite, contextPath } = useAppContext()

  const discountSplitX = discount.split('x')
  const discountSplitDecimal = discountSplitX[0].split('.')
  return (
    <div className={`${classes.coupon} flex`}>
      <div
        className={`coupon-first-column-sf flex flex-col justify-center ${
          image ? '' : 'fade'
        }`}>
        <img
          className={classes.couponImage}
          src={image || defaultImage}
          alt="logo"
          loading="lazy"
        />
      </div>
      <div className="coupon-second-column-sf flex flex-col justify-center">
        {discountType === 'S/' ? (
          <div className={classes.couponAmountContainer}>
            <p className={classes.couponAmount}>
              {discountSplitDecimal[0]}
              <span>
                {discountSplitDecimal[1] && `.${discountSplitDecimal[1]}`}
              </span>
            </p>
            {discountSplitX[1] && (
              <p className={classes.quantity}>x{discountSplitX[1]}</p>
            )}
          </div>
        ) : null}
        {discountType === '%' ? (
          <div className="flex items-center justify-start">
            <p className={classes.couponAmountPercent}>{discount}</p>
            <div className="flex flex-col" style={{ paddingLeft: '3px' }}>
              <p className={classes.percentage}>%</p>
              <p className={classes.couponDscto}>DSCTO</p>
            </div>
          </div>
        ) : null}
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
        <div className={`${classes.cencosud} flex flex-col`}>
          {cencosud && (
            <div className="flex flex-col">
              <div className="flex items-end">
                <p className={classes.priceCencosud}>{cencosud.price}</p>
                <div className="flex flex-col">
                  <p className={classes.percentageCencosud}>%</p>
                  <p className={classes.couponDsctoCencosud}>DSCTO</p>
                </div>
                <img
                  className={classes.imageCencosud}
                  src={`${getAssetsPath(
                    arcSite,
                    contextPath
                  )}/resources/dist/${arcSite}/images/tarjeta-cencosud.png?d=1`}
                  alt="cencosud"
                />
                <div style={{ padding: '2px' }}>
                  <p className={classes.textCencosud}>Tarjeta</p>
                  <p className={classes.textCencosud}>Cencosud</p>
                </div>
              </div>
              <p className={classes.codeCencosud}>{cencosud.code}</p>
              <p className={classes.discountTitleCencosud}>
                Código con Tarjeta
              </p>
            </div>
          )}
          {bonus && (
            <div className={`${classes.bonus} flex items-end`}>
              <div className="flex flex-col">
                <p className={`${classes.pointsBonus} flex items-end`}>
                  {bonus.points}
                </p>
                <p
                  className={`${classes.textPointsBonus} flex items-end font-bold`}>
                  puntos
                </p>
              </div>
              <div className="flex flex-col" style={{ paddingLeft: '10px' }}>
                <p className={`${classes.priceBonus} font-bold`}>
                  S/{bonus.price}
                </p>
                <img
                  className={`${classes.imageBonus}`}
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
