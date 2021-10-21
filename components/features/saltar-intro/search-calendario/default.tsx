import { useFusionContext } from 'fusion:context'
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
  monthCurrent: 'saltar-intro-search-calendario__month--current',
}

const SaltarIntroSearchCalendario: React.FC = (props: any) => {
  const { globalContent, contextPath, globalContentConfig } = useFusionContext()
  const { query: { date: dateParam = '' } = {} } = globalContentConfig
  const currentClassMonth = (month: string): string =>
    dateParam === month ? classes.monthCurrent : ''
  const months = [
    {
      name: 'Enero',
      id: '01',
    },
    {
      name: 'Febrero',
      id: '02',
    },
    {
      name: 'Marzo',
      id: '03',
    },
    {
      name: 'Abril',
      id: '04',
    },
    {
      name: 'Mayo',
      id: '05',
    },
    {
      name: 'Junio',
      id: '06',
    },
    {
      name: 'Julio',
      id: '07',
    },
    {
      name: 'Agosto',
      id: '08',
    },
    {
      name: 'Septiembre',
      id: '09',
    },
    {
      name: 'Octubre',
      id: '10',
    },
    {
      name: 'Noviembre',
      id: '11',
    },
    {
      name: 'Diciembre',
      id: '12',
    },
  ]
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
        {months.map((el) => (
          <li key={el.id} className={classes.item}>
            <a
              className={`${classes.month} ${currentClassMonth(
                `${year}-${el.id}`
              )}`}
              href={`/saltar-intro/calendario/${year}-${el.id}/`}>
              {el.name}
            </a>
          </li>
        ))}
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
