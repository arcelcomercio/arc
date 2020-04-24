import React from 'react'
import styled from 'styled-components'

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
  btn: 'newsletters-subscription__btn mt-15',
  btnSubscribed:
    'newsletters-subscription__btn newsletters-subscription__btn--subscribed mt-15',
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: auto;
  position: relative;
  cursor: pointer;
  user-select: none;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Cover = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
  display: ${props => (props.checked ? 'none' : 'block')};
`

const ButtonSub = styled.div`
  border: 1px solid #adadad;
  padding: 15px 40px;
  border-radius: 5px;
  background: ${props => (props.checked ? '#f7c600' : '#ffffff')};
`

const Checkbox = ({
  className,
  checked,
  disabled,
  name,
  description,
  site,
  image,
  ...props
}) => (
  <article role="listitem" className={classes.item}>
    <div className={classes.card}>
      <CheckboxContainer checked={checked} className={className}>
        <figure className={classes.figure}>
          <Cover checked={checked} />
          <img className={classes.image} src={image} alt={name} />
          <i className={classes.icon} />
        </figure>

        <div className={classes.detail}>
          <h3 className={classes.titleText}>
            <span className={classes.titleSpan}>{name}</span>
          </h3>
          <p className={classes.description}>{description}</p>

          <ButtonSub className={classes.btnSubscribed} checked={checked}>
            {(checked && `Eliminar registro`) || `Regístrate`}
          </ButtonSub>
        </div>

        <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
      </CheckboxContainer>
    </div>
  </article>
)

export default Checkbox
