import React from 'react'

const classes = {
  item: 'newsletters-subscription__item p-5',
  card:
    'newsletters-subscription__card flex flex-col items-center pl-10 pr-10 md:pt-20 xs:pt-20 pt-20 pb-20 md:pb-20',
  figure:
    'newsletters-subscription__figure w-full flex flex-col items-center position-relative',
  image: 'w-full h-full object-cover',
  icon:
    'newsletters-subscription__icono icon-marca position-absolute bottom-0 flex items-center justify-center rounded',
  detail:
    'newsletters-subscription__detail w-full flex flex-col items-center justify-between pt-10',
  titleText: 'newsletters-subscription__title-text text-center mb-10 mt-5',
  titleSpan:
    'newsletters-subscription__title-span  primary-font font-bold text-gray-300',
  description: 'newsletters-subscription__description',
  chkcont: 'newsletters-subscription__check-cont',
  chkBtn: 'newsletters-subscription__check-btn mt-15',
  chk: 'newsletters-subscription__input-check',
}

const Checkbox = ({
  checked,
  disabled,
  name,
  description,
  image,
  ...props
}) => (
  <article role="listitem" className={classes.item}>
    <div className={classes.card}>
      <div className={classes.chkcont}>
        <figure className={classes.figure}>
          <img className={classes.image} src={image} alt={name} />
          <i className={classes.icon} />
        </figure>

        <div className={classes.detail}>
          <h3 itemProp="name" className={classes.titleText}>
            <span className={classes.titleSpan}>{name}</span>
          </h3>
          <p itemProp="description" className={classes.description}>
            {description}
          </p>

          <div className={`${classes.chkBtn} ${checked ? 'subscribed' : ''}`}>
            {(checked && `Eliminar registro`) || `Suscríbete`}
          </div>
        </div>

        <input
          className={classes.chk}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
        />
      </div>
    </div>
  </article>
)

export default Checkbox
