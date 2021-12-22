import * as React from 'react'
import { AppContext, ArcSite } from 'types/fusion'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  coupon: 'coupon flex',
  couponFirstColumn: 'coupon-first-column-sf flex flex-col justify-center',
  couponSecondColumn: 'coupon-second-column-sf flex flex-col justify-center',
  couponImage: 'coupon-image',
  couponAmountContainer: 'coupon-amount-container flex flex-wrap',
  couponAmountTitle: 'coupon-amount-title',
  couponAmountSubtitle: 'coupon-amount-subtitle',
  couponAmountPercent: 'coupon-amount-percent',
  percentage: 'coupon-percentage',
  cencosud: 'coupon-cencosud flex flex-col items-center',
  codeCencosud: 'coupon-cencosud-code',
  imageCencosud: 'coupon-cencosud-image',
  priceCencosud: 'coupon-cencosud-price',
  priceAmountCencosud: 'coupon-cencosud-price-amount',
  pricePercentageCencosud: 'coupon-cencosud-price-percentage',
  percentageCencosud: 'coupon-cencosud-percentage',
  couponDsctoCencosud: 'coupon-cencosud-discount',
  textCencosud: 'coupon-cencosud-text',
  discountTitleCencosud: 'coupon-cencosud-discount-title',
  bonus: 'coupon-bonus flex items-end',
  pointsBonus: 'coupon-bonus-points  flex items-end',
  textPointsBonus: 'coupon-bonus-text flex items-end',
  imageBonus: 'coupon-bonus-image',
  priceAmountBonus: 'coupon-bonus-price-amount m-0 mx-auto',
  pricePercentageBonus: 'coupon-bonus-price-percentage',
  percentageBonus: 'coupon-bonus-percentage',
  couponDsctoBonus: 'coupon-bonus-discount',
  couponDscto: 'coupon-discount',
  couponDescription: 'coupon-description',
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
  discountType: DiscountType
}
interface Bonus {
  price: string
  points: string
  discountType: DiscountType
}
interface CouponProps {
  code: string
  image?: string
  defaultImage: string
  discountTitle: string
  discountSubtitle?: string
  additional?: boolean
  discountType: DiscountType
  description: string
  cencosud?: Cencosud | null
  bonus?: Bonus | null
  restrictions?: string[]
  contextPath: string
  arcSite: ArcSite
  deployment: AppContext['deployment']
}
const SaleFloorCard: React.FunctionComponent<CouponProps> = ({
  code = '',
  image = '',
  defaultImage = '',
  discountTitle = '',
  discountSubtitle = '',
  additional = false,
  discountType = '',
  description = '',
  cencosud = null,
  bonus = null,
  restrictions = [],
  contextPath = '',
  arcSite,
  deployment,
}) => {
  const [unitsTitle, centsTitle] = discountTitle.split('.')
  const [unitsSubtitle, centsSubtitle] = discountSubtitle.split('.')
  return (
    <li className={classes.coupon}>
      <div className={`${classes.couponFirstColumn} ${image ? '' : 'fade'}`}>
        <img
          className={classes.couponImage}
          src={deployment(image) || defaultImage}
          alt="logo"
          loading="lazy"
        />
      </div>
      <div className={classes.couponSecondColumn}>
        {discountType === 'S/' ? (
          <div className={classes.couponAmountContainer}>
            <p className={classes.couponAmountTitle}>
              {unitsTitle}
              {centsTitle ? <span>{`.${centsTitle} `}</span> : null}
            </p>
            {unitsSubtitle && (
              <p className={classes.couponAmountSubtitle}>
                {unitsSubtitle}
                {centsSubtitle ? <span>{`.${centsSubtitle}`}</span> : null}
              </p>
            )}
          </div>
        ) : null}
        {discountType === '%' ? (
          <div className="flex items-center justify-start">
            <p className={classes.couponAmountPercent}>{discountTitle}</p>
            <div className="flex flex-col" style={{ paddingLeft: '3px' }}>
              <p className={classes.percentage}>%</p>
              <p className={classes.couponDscto}>DSCTO</p>
              {additional ? (
                <p className={classes.couponDscto}>ADICIONAL</p>
              ) : null}
            </div>
          </div>
        ) : null}
        <p className={classes.couponDescription}>{description}</p>

        {restrictions.length > 0
          ? restrictions.map((restriction) => (
              <p
                style={{
                  fontSize: '10px',
                  lineHeight: '1.2',
                  color: '#373736',
                }}
                key={restriction}>
                {restriction}
              </p>
            ))
          : null}

        {cencosud && (
          <div className={classes.cencosud}>
            <div className="flex flex-col">
              <div className="flex items-end">
                {cencosud.discountType === 'S/' ? (
                  <p className={classes.priceAmountCencosud}>
                    S/{cencosud.price}
                  </p>
                ) : null}
                {cencosud.discountType === '%' ? (
                  <>
                    <p className={classes.pricePercentageCencosud}>
                      {cencosud.price}
                    </p>
                    <div className="flex flex-col">
                      <p className={classes.percentageCencosud}>%</p>
                      <p className={classes.couponDsctoCencosud}>DSCTO</p>
                    </div>
                  </>
                ) : null}
                <img
                  className={classes.imageCencosud}
                  src={`${getAssetsPath(
                    arcSite,
                    contextPath
                  )}/resources/dist/${arcSite}/images/tarjeta-cencosud.png?d=1`}
                  alt="cencosud"
                  loading="lazy"
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
          </div>
        )}
        {bonus && (
          <div className={classes.bonus}>
            <div className="flex flex-col">
              <p className={classes.pointsBonus}>{bonus.points}</p>
              <p className={classes.textPointsBonus}>puntos</p>
            </div>
            <div className="flex flex-col" style={{ marginLeft: '10px' }}>
              {bonus.discountType === 'S/' && (
                <p className={classes.priceAmountBonus}>S/{bonus.price}</p>
              )}
              {bonus.discountType === '%' && (
                <div className="flex items-center m-0 mx-auto">
                  <p className={classes.pricePercentageBonus}>{bonus.price}</p>
                  <div className="flex flex-col" style={{ marginLeft: '1px' }}>
                    <p className={classes.percentageBonus}>%</p>
                    <p className={classes.couponDsctoBonus}>DSCTO</p>
                  </div>
                </div>
              )}

              <img
                className={`${classes.imageBonus}`}
                src={`${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/puntos-bonus-color.png?d=1`}
                alt="tarjeta bonus"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <p className={classes.couponCode}>{code}</p>
        <p className={classes.couponDiscountTitle}>Código de promoción</p>
      </div>
    </li>
  )
}

export default React.memo(SaleFloorCard)
