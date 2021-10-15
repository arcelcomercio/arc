import * as React from 'react'

import Button from '../../../global-components/button'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'saltar-intro-search-calendario__container',
  formSearch: 'saltar-intro-search-calendario__form-search',
  inputSearch: 'saltar-intro-search-calendario__input-search',
  btnSearch: 'saltar-intro-search-calendario__btn-search',
  iconSearch: 'saltar-intro-search-calendario__icon-search',
}

const SaltarIntroSearchCalendario = (props: any) => {
  const {
    customFields: { block = false, inlineBlock = false },
  } = props
  return (
    <div
      className={`flex ${classes.container} ${block ? 'block' : ''} ${
        inlineBlock ? 'inline-block' : ''
      }`}>
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
