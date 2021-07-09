import { useFusionContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'

import Button from '../../../global-components/button'
import searchQuery from '../../../utilities/client/search'
import customFields from './_dependencies/custom-fields'

const classes = {
  wrapper: 'header-inverted-featured__search-form-wrapper',
  form: 'header-inverted-featured__search-form',
  btnSearch: 'header-inverted-featured__btn-search active',
  iconSearch: 'header-inverted-featured__icon-search icon-search active',
  search: `header-inverted-featured__search active`,
}

interface Props {
  customFields?: {
    label?: string
    inputLabel?: string
  }
}

const SearchForm: FC<Props> = (props) => {
  const {
    customFields: { label, inputLabel },
  } = props

  const { globalContentConfig: { query = {} } = {} } = useFusionContext()

  const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')

  const inputSearch = React.useRef()

  const handleSearch = () => {
    const { value } = inputSearch.current
    searchQuery(value, 'descendiente', 'videos')
  }

  const handleKeyDown = (e) => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      handleSearch()
    }
  }

  return (
    <div className={classes.wrapper}>
      <div>{label}</div>
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <input
          id="header-search-input"
          ref={inputSearch}
          type="search"
          defaultValue={search}
          onKeyUp={handleKeyDown}
          placeholder={inputLabel}
          className={classes.search}
        />
        <Button
          iconClass={classes.iconSearch}
          btnClass={`${classes.btnSearch}`}
          onClick={handleSearch}
        />
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  customFields,
}

SearchForm.label = 'Búsqueda desde formulario'

export default SearchForm
