import * as React from 'react'

import Button from '../../../global-components/button'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'saltar-intro-search-calendario__container',
  formSearch: 'saltar-intro-search-calendario__form-search',
  inputSearch: 'saltar-intro-search-calendario__input-search',
  btnSearch: 'saltar-intro-search-calendario__btn-search',
  iconSearch: 'saltar-intro-search-calendario__icon-search',
  months: 'saltar-intro-search-calendario__months',
  boxItem: 'saltar-intro-search-calendario__box-item',
  item: 'saltar-intro-search-calendario__item',
  month: 'saltar-intro-search-calendario__month',
}

const SaltarIntroSearchCalendario = (props: any) => {
  const {
    customFields: { block = false, inlineBlock = false },
  } = props
  const now = new Date()
  const year = now.getFullYear()
  return (
    <div
      className={`flex ${classes.container} ${block ? 'block' : ''} ${
        inlineBlock ? 'inline-block' : ''
      }`}>
      <ul className={classes.boxItem}>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-01/`}>
            Enero
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-02/`}>
            Febrero
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-03/`}>
            Marzo
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-04/`}>
            Abril
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-05/`}>
            Mayo
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-06/`}>
            Junio
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-07/`}>
            Julio
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-08/`}>
            Agosto
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-09/`}>
            Septiembre
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-10/`}>
            Octubre
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-11/`}>
            Noviembre
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.month}
            href={`/saltar-intro/calendario/${year}-12/`}>
            Diciembre
          </a>
        </li>
      </ul>
      <form
        className={`${classes.formSearch} position-relative`}
        onSubmit={(e) => e.preventDefault()}>
        <input
          className={`${classes.inputSearch}`}
          type="search"
          name="search-calendar"
          id="search-calendar"
          placeholder="BUSCA TU SERIE O PELÍCULA"
        />
        <Button
          iconClass={`${classes.iconSearch} icon-search`}
          btnClass={`${classes.btnSearch}`}
        />
      </form>
    </div>
  )
}

SaltarIntroSearchCalendario.propTypes = {
  customFields,
}

SaltarIntroSearchCalendario.label = 'Search calendario - Saltar Intro'
SaltarIntroSearchCalendario.static = true

export default SaltarIntroSearchCalendario
