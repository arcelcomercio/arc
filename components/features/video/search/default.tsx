import { useFusionContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'

import Button from '../../../global-components/button'
import searchQuery from '../../../utilities/client/search'
import customFields from './_dependencies/custom-fields'

const classes = {
  wrapper: 'video-search',
  title: 'video-search__title',
  form: 'video-search__form',
  btnSearch: 'video-search__btn',
  search: 'video-search__input',
  iconSearch: 'video-search__btn-icon icon-search',
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
      <div className={classes.title}>{label}</div>
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

SearchForm.label = 'Busqueda desde formulario'

export default SearchForm
